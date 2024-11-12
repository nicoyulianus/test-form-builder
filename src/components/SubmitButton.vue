<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  label: string
  onClick: () => void
  disabled?: boolean
}>()
</script>

<template>
  <button
    @click="onClick"
    :disabled="disabled"
    class="p-2 px-4 mt-4 font-bold text-white bg-blue-500 rounded-md disabled:bg-gray-400"
  >
    {{ label }}
  </button>
</template>
