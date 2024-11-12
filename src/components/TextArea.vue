<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  modelValue: string
  label: string
  placeholder: string
  required: boolean
  error: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="mt-3">
    <label>{{ label }}</label>
    <textarea
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :required="required"
      class="w-full p-2 mt-1 border"
    ></textarea>
    <span v-if="error" class="text-red-500">{{ error }}</span>
  </div>
</template>
