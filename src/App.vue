<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import MainContainer from './components/MainContainer.vue'

type Personal = { label: string; value: string }

interface Fields {
  type: 'textfield' | 'radio' | 'textarea' | 'autocomplete'
  label: string
  placeholder?: string
  required: boolean
  options?: Personal[]
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

// Fungsi untuk mengambil data dari response.json
async function fetchData() {
  const response = await fetch('/response.json')
  const result = await response.json()
  data.value = result

  // Inisialisasi formData dan errors
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

// Fungsi untuk validasi input
function validateForm() {
  let isValid = true
  data.value.forEach((step) => {
    step.fields.forEach((field) => {
      if (field.required && !formData[field.label]) {
        errors[field.label] = `${field.label} is required`
        isValid = false
      } else {
        errors[field.label] = ''
      }
    })
  })
  return isValid
}

// Fungsi untuk menangani submit form
function handleSubmit() {
  if (validateForm()) {
    console.log('Data yang diisi oleh user:', formData)
    alert(`Data yang diisi oleh user: ${JSON.stringify(formData)}`)

    // Reset formData setelah submit berhasil
    Object.keys(formData).forEach((key) => {
      formData[key] = ''
    })
  } else {
    alert('Please fill out all required fields')
  }
}

console.log(data.value)
</script>

<template>
  <MainContainer>
    <div v-if="data.length > 0">
      <div v-for="step in data" :key="step.step">
        <h1 class="mb-2 text-xl font-bold">{{ step.title }}</h1>
        <p>{{ step.description }}</p>

        <div v-for="field in step.fields" :key="field.label">
          <label :for="field.label" class="block mt-2">{{ field.label }}</label>

          <!-- Input Textfield -->
          <div v-if="field.type === 'textfield'">
            <input
              v-model="formData[field.label]"
              type="text"
              :placeholder="field.placeholder"
              :required="field.required"
              class="w-full p-2 mt-1 border"
            />
            <span v-if="errors[field.label]" class="text-red-500">{{ errors[field.label] }}</span>
          </div>

          <!-- Radio Buttons -->
          <div v-if="field.type === 'radio'">
            <div v-for="option in field.options" :key="option.value">
              <input
                v-model="formData[field.label]"
                type="radio"
                :id="option.value"
                :name="field.label"
                :value="option.value"
                :required="field.required"
              />
              <label :for="option.value" class="ml-2">{{ option.label }}</label>
            </div>
            <span v-if="errors[field.label]" class="text-red-500">{{ errors[field.label] }}</span>
          </div>

          <!-- Textarea -->
          <div v-if="field.type === 'textarea'">
            <textarea
              v-model="formData[field.label]"
              :placeholder="field.placeholder"
              :required="field.required"
              class="w-full p-2 mt-1 border"
            ></textarea>
            <span v-if="errors[field.label]" class="text-red-500">{{ errors[field.label] }}</span>
          </div>

          <!-- Autocomplete (Select) -->
          <div v-if="field.type === 'autocomplete'">
            <select
              v-model="formData[field.label]"
              :required="field.required"
              class="w-full p-2 mt-1 border"
              placeholder="aa"
            >
              <option value="" disabled>{{ field.placeholder }}</option>
              <option
                v-for="option in field.options"
                :key="option"
                :value="option"
                placeholder="aa"
              >
                {{ option }}
              </option>
            </select>
            <span v-if="errors[field.label]" class="text-red-500">{{ errors[field.label] }}</span>
          </div>
        </div>
      </div>

      <!-- Tombol Submit -->
      <button
        @click="handleSubmit"
        class="p-2 px-4 mt-4 font-bold text-white bg-blue-500 rounded-md"
      >
        Submit
      </button>
    </div>
  </MainContainer>
</template>

<style>
/* Styling tambahan jika perlu */
</style>
