<!-- src/components/SugerenciaConvocatoria.vue -->
<template>
  <div class="sugerencia-inline">
    <form @submit.prevent="enviarSugerencia">
      <label for="sugerencia-input">¿Tienes una convocatoria que no está?</label>
      <input
        id="sugerencia-input"
        v-model="link"
        type="url"
        placeholder="Pega el enlace aquí"
        required
      />
      <button type="submit">Enviar</button>
    </form>
    <span v-if="confirmacion" class="confirmacion">✔️ ¡Gracias!</span>
    <span v-if="error" class="error">❌ {{ error }}</span>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { postPostulacion } from './api.js'

const link = ref('')
const confirmacion = ref(false)
const error = ref('')

const enviarSugerencia = async () => {
  try {
    await postPostulacion(link.value)
    confirmacion.value = true
    error.value = ''
    link.value = ''
    setTimeout(() => (confirmacion.value = false), 3000)
  } catch (err) {
    console.error(err)
    error.value = err.message || 'Error al enviar la sugerencia.'
    setTimeout(() => (error.value = ''), 4000)
  }
}
</script>

<style scoped>
.sugerencia-inline {
  color: black;
  padding: 0.5rem;
  background: #f9f9f9;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

input[type="url"] {
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 1rem;
}

button {
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;
}

button:hover {
  background-color: #0056b3;
}

.confirmacion {
  color: green;
  font-weight: 500;
}

.error {
  color: red;
  font-weight: 500;
}
</style>
