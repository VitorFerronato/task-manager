<template>
  <div class="pa-5 login-card">
    <h4 class="text-center text-h5 mb-4">SIGN-IN</h4>

    <v-form @submit.prevent="validateForm" ref="formRef" :disabled="isLoading">
      <div class="mb-4">
        <label>Email</label>
        <v-text-field
          v-model="email"
          :rules="[rules.required]"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          placeholder="Type your email"
          color="primary"
          prepend-inner-icon="mdi-email-outline"
          class="mt-1"
        >
        </v-text-field>
      </div>

      <div class="mb-4">
        <label>Password</label>
        <v-text-field
          v-model="password"
          :rules="[rules.required]"
          :append-inner-icon="
            showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
          "
          :type="showPassword ? 'text' : 'password'"
          @click:append-inner="showPassword = !showPassword"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          placeholder="Type your password"
          color="primary"
          prepend-inner-icon="mdi-lock-outline"
          class="mt-1"
        >
        </v-text-field>
      </div>

      <div class="d-flex justify-space-between mt-2 mb-4">
        <router-link to="#" class="text-primary text-caption"
          >Esqueci minha senha</router-link
        >
        <router-link to="#" class="text-primary text-caption"
          >Registrar-se</router-link
        >
      </div>

      <div v-if="hasError" class="text-center mb-2">
        <span class="text-caption color-error">Usuário ou senha invalidos</span>
      </div>

      <div class="d-flex justify-center mb-4">
        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          text="Login"
          color="primary"
          type="submit"
        />
      </div>

      <div class="d-flex justify-center align-center mb-2">
        <div class="line"></div>
        <span class="text-caption px-2">Sign in with</span>
        <div class="line"></div>
      </div>

      <div
        class="text-center cursor-pointer google-icon"
        @click="loginWithGoogle"
      >
        <GoogleIcon />
      </div>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "@/configs/firebase.js";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "vue-router";
import GoogleIcon from "../../../components/GoogleIcon.vue";

const showPassword = ref(false);
let isLoading = ref(false);
let hasError = ref(false);
const rules = ref({
  required: (value) => !!value || "Este campo é obrigatório",
});

const formRef = ref();
const validateForm = async () => {
  const isValid = await formRef.value.validate();
  if (isValid.valid) signIn();
};

const email = ref(null);
const password = ref(null);
const signIn = async () => {
  isLoading.value = true;
  hasError.value = false;

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    console.log("usuário logado", userCredentials.user);
  } catch (error) {
    console.log(error);
    hasError.value = true;
  }
  isLoading.value = false;
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

<style scoped>
.login-card {
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.line {
  width: 60px;
  border: 0.5px solid #ccc;
}

a:hover {
  text-decoration: underline;
}
</style>
