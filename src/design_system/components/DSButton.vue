<template>
  <v-btn
    v-bind="$attrs"
    :color="color"
    @click="$emit('click', $event)"
    class="text-capitalize"
  >
    {{ title }}
  </v-btn>
</template>

<script setup>
defineProps({
  title: String,
  color: String,
});

defineEmits(["click"]);
</script>
