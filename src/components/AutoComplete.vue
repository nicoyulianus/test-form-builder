<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  modelValue: string
  label: string
  options: string[]
  placeholder: string
  required: boolean
  error: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="mt-3">
    <label>{{ label }}</label>
    <select
      :value="modelValue"
      @change="handleChange"
      :required="required"
      class="w-full p-2 mt-1 border"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
    <span v-if="error" class="text-red-500">{{ error }}</span>
  </div>
</template>
