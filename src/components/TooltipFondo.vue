<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  fondo: Object,
  position: Object,
  dayjs: Function
})
</script>

<template>
  <div v-if="fondo" class="tooltip" :style="{ left: `${position.x}px`, top: `${position.y}px` }">
    <h3>{{ fondo.nombre }}</h3>
    <p><strong>Plataforma:</strong> {{ fondo.plataforma }}</p>
    <p><strong>Inicio:</strong> {{ dayjs(fondo.fechainicio).format('DD/MM/YYYY') }}</p>
    <p><strong>Cierre:</strong> {{ dayjs(fondo.fechacierre).format('DD/MM/YYYY') }}</p>
    <!-- <p><strong>Visitas:</strong> {{ fondo.contador }}</p> -->
  </div>
</template>
