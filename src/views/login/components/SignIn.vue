<template>
  <div class="pa-5 login-card">
    <h4 class="text-center text-h5 mb-4">SIGN IN</h4>

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
        <router-link
          to="/login/password-recovery"
          class="text-caption text-surface"
          >Forgot password?</router-link
        >
        <router-link to="/login/sign-up" class="text-caption text-surface"
          >Register</router-link
        >
      </div>

      <div v-if="hasError" class="text-center mb-2">
        <span class="text-caption text-error"
          >Incorrect username or password</span
        >
      </div>

      <div class="d-flex justify-center mb-4">
        <v-btn
    
          text="Login"
          color="primary"
          type="submit"
          class="text-capitalize"
        />
      </div>

      <div class="d-flex justify-center align-center mb-2">
        <div class="line"></div>
        <span class="text-caption px-2">Or Sign in with</span>
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
import GoogleIcon from "../../../components/GoogleIcon.vue";
import { auth } from "@/configs/firebase.js";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { useRouter } from "vue-router";
const router = useRouter();

const showPassword = ref(false);
let isLoading = ref(false);
let hasError = ref(false);
const rules = ref({
  required: (value) => !!value || "Required!",
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
    if (userCredentials.user) router.push("/dashboard");
  } catch (error) {
    console.log(error);
    hasError.value = true;
  }
  isLoading.value = false;
};

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

<style scoped lang="scss">
.login-card {
  width: 400px;
  border: 1px solid #00ca9d;
  border-radius: 5px;

  .line {
    width: 60px;
    border: 0.5px solid #ccc;
    transition: border 0.3s;
  }

  a {
    text-decoration: underline;
    transition: 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
