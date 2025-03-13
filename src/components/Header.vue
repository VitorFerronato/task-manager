<template>
  <v-app-bar color="#1E293B" height="60" dark>
    <v-toolbar-title>Task Manager</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { useRouter } from "vue-router";
import { auth } from "@/configs/firebase";
const router = useRouter();

const logout = async () => {
  await auth.signOut();
  router.push("/login/sign-in");
};
</script>
