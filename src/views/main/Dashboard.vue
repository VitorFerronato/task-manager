<template>
  <div>
    <Header />

    <Dashboard class="dashboard" />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Dashboard from "@/components/Dashboard/Dashboard.vue";
</script>

<style scoped>
.dashboard {
  margin-top: 100px;
}
</style>
