<template>
  <v-container>
    <v-card class="pa-5">
      <h4 class="text-center">SIGN-IN</h4>

      <v-form @submit.prevent="validateForm" ref="formRef">
        <div>
          <DSTextField
            v-model="email"
            :rules="['required']"
            title="Email"
            placeholder="Insira seu email"
          />
        </div>

        <div>
          <DSTextField
            v-model="password"
            :append-inner-icon="
              showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
            title="Senha"
            placeholder="Insira sua senha"
          />
        </div>

        <div>
          <span class="mr-4">Esqueci minha senha</span>
          <span>Registrar-se</span>
        </div>

        <DSButton title="Login" :color="'primary'" type="submit" class="mr-4" />
        <DSButton
          title="Login com Google"
          type="button"
          :color="'primary'"
          @click="loginWithGoogle"
        />
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "@/configs/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";
import DSTextField from "@/design_system/components/DSTextField.vue";
import DSButton from "@/design_system/components/DSButton.vue";

const showPassword = ref(false);

const formRef = ref();
const validateForm = async () => {
  const isValid = await formRef.value.validate();
  if (isValid.valid) signIn();
};

const email = ref();
const password = ref();
const signIn = () => {
  console.log("sign in", email.value, password.value);
};

const router = useRouter();

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
    router.push("/dashboard");
  } catch (error) {
    console.error(error);
  }
};
</script>
