<script setup>
import { defineProps, computed } from 'vue'
import '../assets/tabla.css'

const props = defineProps({
  fondos: Array,
  months: Array,
  currentMonth: Number,
  dayjs: Function,
  showTooltip: Function,
  hideTooltip: Function,
  openUrl: Function
})

// Función para calcular el porcentaje de vigencia
const calculateVigency = (fondo, currentMonth) => {
  const now = new Date()
  const currentDay = now.getDate()
  const currentDate = currentMonth + (currentDay / 30)
  
  const startDate = fondo.startMonth + (fondo.startDay / 30)
  const endDate = fondo.endMonth + (fondo.endDay / 30)
  
  if (endDate < currentDate) {
    // Todo pasado (100% rojo)
    return { past: 100, future: 0 }
  } else if (startDate > currentDate) {
    // Todo futuro (100% verde)
    return { past: 0, future: 100 }
  } else {
    // Parcial
    const totalDuration = endDate - startDate
    const pastDuration = currentDate - startDate
    const pastPercentage = (pastDuration / totalDuration) * 100
    return { past: pastPercentage, future: 100 - pastPercentage }
  }
}
</script>

<template>
  <div class="table-container relative">
    <table class="fondos-table">
      <thead>
        <tr>
          <th class="text-left">Nombre del Fondo</th>
          <th class="text-center">Plataforma</th>
          <th class="text-center">Visitas</th>
          <th class="timeline-cell relative">
            <div class="timeline-months absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex">
              <div v-for="(month, index) in months" :key="index"
                class="timeline-month text-center text-sm border-r border-gray-200"
                :class="{ 'bg-green-300': index === currentMonth }" :style="{ width: `${100 / 12}%` }">
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
        <tr v-for="(fondo, index) in fondos" :key="fondo.id" class="fondo-row"
          @mousemove="e => showTooltip(fondo, e)" @mouseleave="hideTooltip">
          <td class="text-left">
            <button class="fondo-button" @click="() => openUrl(fondo.url, fondo.id)">
              {{ fondo.nombre }}
            </button>
          </td>
          <td class="text-center">{{ fondo.plataforma }}</td>
          <td class="text-center">
            <span class="medalla" v-if="index === 0">🥇</span>
            <span class="medalla" v-else-if="index === 1">🥈</span>
            <span class="medalla" v-else-if="index === 2">🥉</span>
            <span v-else>#{{ index + 1 }}</span>
          </td>
          <td class="timeline-cell">
            <div class="timeline-bar-container">
              <div class="timeline-bar" :style="{
                left: `${(fondo.startMonth + (fondo.startDay / 30)) * (100 / 12)}%`,
                width: `${Math.max(2, ((fondo.endMonth - fondo.startMonth) + (fondo.endDay - fondo.startDay) / 30) * (100 / 12))}%`,
                background: `linear-gradient(to right, 
                  #f44336 ${calculateVigency(fondo, currentMonth).past}%, 
                  #4CAF50 ${calculateVigency(fondo, currentMonth).past}%)`
              }"></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-container {
  max-height: 600px;
  overflow-y: auto;
  position: relative;
}

.fondos-table thead th {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 20;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.medalla {
  font-size: 2rem;
}


</style>