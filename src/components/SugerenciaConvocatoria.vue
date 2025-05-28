<!-- src/components/SugerenciaConvocatoria.vue -->
<template>
    <div class="sugerencia-inline">
        <form @submit.prevent="enviarSugerencia">
            <label for="sugerencia-input">¿Tienes una convocatoria que no está?</label>
            <input id="sugerencia-input" v-model="link" type="url" placeholder="Pega el enlace aquí" required />
            <button type="submit">Enviar</button>
        </form>
        <span v-if="confirmacion" class="confirmacion">✔️ ¡Gracias!</span>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const link = ref('')
const confirmacion = ref(false)

const enviarSugerencia = () => {
    console.log('Sugerencia recibida:', link.value)
    confirmacion.value = true
    link.value = ''
    setTimeout(() => (confirmacion.value = false), 3000)
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
</style>
