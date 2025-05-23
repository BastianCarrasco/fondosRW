<script setup>
import "./assets/lineatiempo.css";
import { useFondos } from "@/composables/useFondos.js";

const {
  fondos,
  loading,
  error,
  hoveredFondo,
  tooltipPosition,
  months,
  todayPosition,
  currentMonth,
  showTooltip,
  hideTooltip,
  openUrl,
  dayjs,
} = useFondos();
</script>

<template>
  <main class="main-container">
    <!-- Estado de carga con spinner -->
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <span>Cargando fondos...</span>
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="error">
      {{ error }}
    </div>

    <!-- Tabla con línea temporal -->
    <div v-else class="table-container relative">
      <div v-if="todayPosition" class="today-line" :style="{ left: `${todayPosition}%` }"></div>

      <table class="fondos-table">
        <thead>
          <tr>
            <th class="text-left">Nombre del Fondo</th>
            <th class="text-left">Plataforma</th>
            <th class="timeline-cell relative">
              <div class="timeline-months absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex">
                <div v-for="(month, index) in months" :key="index"
                  class="timeline-month text-center text-sm border-r border-gray-200"
                  :class="{ 'bg-green-300': index === currentMonth }" :style="{ width: `${100 / 12}%` }">
                  {{ month }}
                  <div v-if="index === currentMonth" class="current-date">
                    {{ dayjs().format("DD/MM/YYYY") }}
                  </div>
                </div>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="fondo in fondos" :key="fondo.id" class="fondo-row" @mousemove="showTooltip(fondo, $event)"
            @mouseleave="hideTooltip">
            <td class="fondo-name">
              <button class="fondo-button" @click="openUrl(fondo.url, fondo.id)">
                {{ fondo.nombre }}
              </button>
            </td>
            <td>{{ fondo.plataforma }}</td>
            <td class="timeline-cell">
              <div class="timeline-bar-container">
                <div class="timeline-bar" :style="{
                  left: `${(fondo.startMonth + fondo.startDay / 30) * (100 / 12)
                    }%`,
                  width: `${Math.max(
                    2,
                    (fondo.endMonth -
                      fondo.startMonth +
                      (fondo.endDay - fondo.startDay) / 30) *
                    (100 / 12)
                  )}%`,
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
      top: `${tooltipPosition.y}px`,
    }">
      <h3>{{ hoveredFondo.nombre }}</h3>
      <p><strong>Plataforma:</strong> {{ hoveredFondo.plataforma }}</p>
      <p>
        <strong>Inicio:</strong>
        {{ dayjs(hoveredFondo.fechainicio).format("DD/MM/YYYY") }}
      </p>
      <p>
        <strong>Cierre:</strong>
        {{ dayjs(hoveredFondo.fechacierre).format("DD/MM/YYYY") }}
      </p>
    </div>
  </main>
</template>

<style scoped>
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-size: 1.2rem;
  gap: 1rem;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #ccc;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
