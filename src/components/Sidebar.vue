<template>
  <v-navigation-drawer v-model="localDrawer" color="#253342" dark app>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"
            >Olá, {{ user?.email }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item link to="/dashboard">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Dashboard</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/profile">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Perfil</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, onMounted, defineProps, toRef } from "vue";
import { auth } from "@/configs/firebase";

const props = defineProps({
  drawer: Boolean,
});

const localDrawer = toRef(props, "drawer");
const user = ref(null);

onMounted(() => {
  user.value = auth.currentUser;
});
</script>

<style lang="scss" scoped></style>
