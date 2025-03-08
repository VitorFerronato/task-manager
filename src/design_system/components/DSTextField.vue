<template>
  <div>
    <label class="label-comboBox">
      <slot name="title">{{ title }}</slot>
    </label>

    <v-text-field
      v-bind="$attrs"
      variant="outlined"
      density="comfortable"
      hide-details="auto"
      :rules="resolvedRules"
      @input="$emit('input', $event)"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      color="primary"
      class="mt-1"
    >
    </v-text-field>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { validationRules } from "@/utils/rules";

const props = defineProps({
  title: String,
});

const resolvedRules = computed(
  () => props.rules?.map((rule) => validationRules[rule]) || []
);

defineEmits(["input", "blur", "focus"]);
</script>
