<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import TextField from './components/TextField.vue'
import TextArea from './components/TextArea.vue'
import RadioButton from './components/RadioButton.vue'
import Autocomplete from './components/Autocomplete.vue'
import MainContainer from './components/MainContainer.vue'
import SubmitButton from './components/SubmitButton.vue'

type Personal = { label: string; value: string }

interface Fields {
  type: 'textfield' | 'radio' | 'textarea' | 'autocomplete'
  label: string
  placeholder?: string
  required: boolean
  options?: Personal[] | string[]
}

interface Data {
  step: number
  title: string
  description: string
  fields: Fields[]
}

const data = ref<Data[]>([])
const formData = reactive<Record<string, string>>({})
const errors = reactive<Record<string, string>>({})
const isValid = ref(true) // State to track form validity

// Function to fetch data from response.json
async function fetchData() {
  const response = await fetch('/response.json')
  const result = await response.json()
  data.value = result

  result.forEach((step: Data) => {
    step.fields.forEach((field) => {
      formData[field.label] = ''
      errors[field.label] = ''
    })
  })
}

onMounted(() => {
  fetchData()
})

// Function to validate form input
function validateForm() {
  let valid = true
  data.value.forEach((step) => {
    step.fields.forEach((field) => {
      if (field.required && !formData[field.label]) {
        errors[field.label] = `${field.label} is required`
        valid = false
      } else {
        errors[field.label] = ''
      }
    })
  })
  isValid.value = valid // Update isValid state
  return valid
}

// Function to handle form submission
function handleSubmit() {
  if (validateForm()) {
    console.log('Data yang diisi oleh user:', formData)
    alert(`Data yang diisi oleh user: ${JSON.stringify(formData)}`)
    // Reset form data after submission
    Object.keys(formData).forEach((key) => {
      formData[key] = ''
    })
  } else {
    alert('Please fill out all required fields')
  }
}
</script>

<template>
  <MainContainer>
    <div v-if="data.length > 0">
      <div v-for="step in data" :key="step.step">
        <h1 class="mb-2 text-xl font-bold">{{ step.title }}</h1>
        <p>{{ step.description }}</p>

        <div v-for="field in step.fields" :key="field.label">
          <!-- Input Textfield -->
          <TextField
            v-if="field.type === 'textfield'"
            v-model="formData[field.label]"
            :label="field.label"
            :placeholder="field.placeholder || ''"
            :required="field.required"
            :error="errors[field.label]"
          />

          <!-- Radio Button -->
          <RadioButton
            v-if="field.type === 'radio'"
            v-model="formData[field.label]"
            :label="field.label"
            :options="field.options as Personal[]"
            :required="field.required"
            :error="errors[field.label]"
          />

          <!-- Textarea -->
          <TextArea
            v-if="field.type === 'textarea'"
            v-model="formData[field.label]"
            :label="field.label"
            :placeholder="field.placeholder || ''"
            :required="field.required"
            :error="errors[field.label]"
          />

          <!-- Autocomplete -->
          <Autocomplete
            v-if="field.type === 'autocomplete'"
            v-model="formData[field.label]"
            :label="field.label"
            :options="field.options as string[]"
            :placeholder="field.placeholder || ''"
            :required="field.required"
            :error="errors[field.label]"
          />
        </div>
      </div>

      <!-- Submit Button -->
      <SubmitButton label="Submit" :onClick="handleSubmit" :disabled="!isValid" />
    </div>
  </MainContainer>
</template>
