<template>
  <div class="logout-container">
    <p>Saindo...</p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

import { useRouter } from "vue-router";
const router = useRouter();

onMounted(async () => {
  try {
    await signOut(auth);
    router.push({ name: "sign-in" });
  } catch (error) {
    console.error("Erro ao sair:", error);
  }
});
</script>

<style scoped>
.logout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 18px;
}
</style>
