<template>
  <v-container>
    <v-card class="mx-auto pa-5" max-width="400">
      <v-btn block @click="loginWithGoogle">Login com Google</v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { auth } from "../configs/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "vue-router";

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
