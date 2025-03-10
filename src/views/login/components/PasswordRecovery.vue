<template>
  <div class="pa-5 login-card">
    <h4 class="text-center text-h5 mb-4">PASSWORD RECOVERY</h4>

    <v-form
      @submit.prevent="resetPassword"
      class="mx-auto pa-5"
      max-width="400"
    >
      <label for="">Email</label>
      <v-text-field
        v-model="email"
        :rules="[rules.required]"
        variant="outlined"
        density="comfortable"
        hide-details="auto"
        placeholder="Type your email"
        color="primary"
        prepend-inner-icon="mdi-email-outline"
        class="mt-1 mb-4"
      >
      </v-text-field>

      <div class="text-center">
        <v-btn color="primary" class="text-capitalize">Recuperar Senha</v-btn>
      </div>

      <div class="text-center mt-4">
        <router-link to="/login/sign-in" class="text-primary"
          >Go to Sign-in</router-link
        >
      </div>

      <div v-show="showMessage" class="text-center mt-4">
        an email has been sent to you!
      </div>
    </v-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "@/configs/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";

const showMessage = ref("");
const rules = ref({
  required: (value) => !!value || "Este campo é obrigatório",
});

const email = ref("");

const resetPassword = async () => {
  showMessage.value = true;
  try {
    await sendPasswordResetEmail(auth, email.value, {
      url: "http://localhost:5173/",
    });

    showMessage.value = true;
  } catch (error) {
    console.error("Erro ao enviar e-mail de recuperação:", error.message);
  }
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
