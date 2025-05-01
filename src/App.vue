<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import './assets/lineatiempo.css' // Asegúrate de que la ruta sea correcta

const fondos = ref([])
const loading = ref(true)
const error = ref(null)
const hoveredFondo = ref(null)
const tooltipPosition = ref({ x: 0, y: 0 })

// Configuración del año actual
const currentYear = dayjs().year()
const months = [
  'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
]

const fetchFondos = async () => {
  try {
    const response = await axios.get('https://backendrw-production.up.railway.app/fondos')
    fondos.value = response.data.map(fondo => ({
      ...fondo,
      startMonth: dayjs(fondo.fechainicio).month(),
      endMonth: dayjs(fondo.fechacierre).month(),
      startDay: dayjs(fondo.fechainicio).date(),
      endDay: dayjs(fondo.fechacierre).date()
    }))
  } catch (err) {
    error.value = err.message || 'Error al cargar los fondos'
  } finally {
    loading.value = false
  }
}

// Posición de la línea "hoy"
const todayPosition = computed(() => {
  const today = dayjs()
  if (today.year() !== currentYear) return null
  return (today.month() + today.date() / 30) * (100 / 12)
})

// Mes actual
const currentMonth = computed(() => dayjs().month())

const showTooltip = (fondo, event) => {
  hoveredFondo.value = fondo
  tooltipPosition.value = {
    x: event.clientX + 10,
    y: event.clientY + 10
  }
}

const hideTooltip = () => {
  hoveredFondo.value = null
}

// Función para abrir la URL en una nueva pestaña
const openUrl = (url) => {
  window.open(url, '_blank')
}

onMounted(() => {
  fetchFondos()
})
</script>

<template>
  <main class="main-container">
    <!-- Estado de carga -->
    <div v-if="loading" class="loading">
      Cargando fondos...
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- Tabla con línea temporal -->
    <div v-else class="table-container relative">
      <!-- Línea de hoy que cruza toda la tabla -->
      <div v-if="todayPosition" class="today-line" :style="{ left: `${todayPosition}%` }"></div>

      <table class="fondos-table">
        <thead>
          <tr>
            <th class="text-left">Nombre del Fondo</th>
            <th class="text-left">Plataforma</th>
            <th class="timeline-cell relative">
              <!-- Meses encima de la línea de tiempo -->
              <div class="timeline-months absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex">
                <div v-for="(month, index) in months" :key="index"
                  class="timeline-month text-center text-sm border-r border-gray-200"
                  :class="{ 'bg-green-300': index === currentMonth }"
                  :style="{ width: `${100 / 12}%` }">
                  {{ month }}
                  <div v-if="index === currentMonth" class="current-date">
                    {{ dayjs().format('DD/MM/YYYY') }}
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="fondo in fondos" :key="fondo.id" class="fondo-row" 
              @mousemove="showTooltip(fondo, $event)" @mouseleave="hideTooltip">
            <td class="fondo-name">
              <!-- Nombre del fondo convertido en un botón -->
              <button  class="fondo-button" @click="openUrl(fondo.url)">
                {{ fondo.nombre }}
              </button>
            </td>
            <td style="justify-content: center;">{{ fondo.plataforma }}</td>
            <td class="timeline-cell">
              <div class="timeline-bar-container">
                <div class="timeline-bar" :style="{
                  left: `${(fondo.startMonth + (fondo.startDay / 30)) * (100 / 12)}%`,
                  width: `${Math.max(2, ((fondo.endMonth - fondo.startMonth) + (fondo.endDay - fondo.startDay) / 30) * (100 / 12))}%`
                }"></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Tooltip -->
    <div v-if="hoveredFondo" class="tooltip" :style="{
      left: `${tooltipPosition.x}px`,
      top: `${tooltipPosition.y}px`
    }">
      <h3>{{ hoveredFondo.nombre }}</h3>
      <p><strong>Plataforma:</strong> {{ hoveredFondo.plataforma }}</p>
      <p><strong>Inicio:</strong> {{ dayjs(hoveredFondo.fechainicio).format('DD/MM/YYYY') }}</p>
      <p><strong>Cierre:</strong> {{ dayjs(hoveredFondo.fechacierre).format('DD/MM/YYYY') }}</p>
    </div>
  </main>
</template>

<style scoped>

</style>