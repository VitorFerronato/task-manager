<template>
  <div class="pa-5 login-card">
    <h4 class="text-center text-h5 mb-4">SIGN UP</h4>

    <v-form @submit.prevent="validateForm" ref="formRef" :disabled="isLoading">
      <div class="mb-4">
        <label>Email</label>
        <v-text-field
          v-model="email"
          :rules="[rules.required]"
          variant="outlined"
          density="comfortable"
          hide-details="auto"
          placeholder="joe@gmail.com"
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
        <router-link to="/login/sign-in" class="text-primary text-caption"
          >Already have account?</router-link
        >
      </div>

      <div class="d-flex justify-center mb-4">
        <v-btn
          :loading="isLoading"
          :disabled="isLoading"
          text="Create account"
          color="primary"
          type="submit"
          class="text-capitalize"
        />
      </div>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "@/configs/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useRouter } from "vue-router";
const router = useRouter();

const showPassword = ref(false);
let isLoading = ref(false);
const rules = ref({
  required: (value) => !!value || "Field required",
});

const formRef = ref();
const validateForm = async () => {
  const isValid = await formRef.value.validate();
  if (isValid.valid) signUp();
};

const email = ref(null);
const password = ref(null);
const signUp = async () => {
  isLoading.value = true;

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );
    if (userCredentials.user) router.push("/login/sign-in");
  } catch (error) {
    console.log(error);
  }
  isLoading.value = false;
};
</script>

<style scoped>
.login-card {
  width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

a:hover {
  text-decoration: underline;
}
</style>
