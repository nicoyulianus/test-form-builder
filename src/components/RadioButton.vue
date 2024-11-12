<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

type Personal = { label: string; value: string }

defineProps<{
  modelValue: string
  label: string
  options: Personal[]
  required: boolean
  error: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="mt-3">
    <label>{{ label }}</label>
    <div v-for="option in options" :key="option.value" class="mb-1">
      <input
        type="radio"
        :id="option.value"
        :value="option.value"
        :name="label"
        @change="handleChange"
        :checked="modelValue === option.value"
        :required="required"
        class=""
      />
      <label :for="option.value">{{ option.label }}</label>
    </div>
    <span v-if="error" class="text-red-500">{{ error }}</span>
  </div>
</template>
