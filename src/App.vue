<script setup>
import './assets/lineatiempo.css'
import './assets/modoOscuro.css'
import { ref, computed } from 'vue'
import { useFondos } from '@/composables/useFondos.js'
import HeaderControls from '@/components/HeaderControls.vue'
import FondosTable from '@/components/FondosTable.vue'
import TooltipFondo from '@/components/TooltipFondo.vue'
import SugerenciaConvocatoria from '@/components/SugerenciaConvocatoria.vue'

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
  dayjs
} = useFondos()

const darkMode = ref(false)
const toggleTheme = () => { darkMode.value = !darkMode.value }

const filtroPlataforma = ref('')
const filtroOrden = ref('visitas')

const plataformasDisponibles = computed(() =>
  [...new Set(fondos.value.map(f => f.plataforma))].sort()
)

const fondosFiltradosYOrdenados = computed(() => {
  let resultado = [...fondos.value]
  if (filtroPlataforma.value) {
    resultado = resultado.filter(f => f.plataforma === filtroPlataforma.value)
  }
  switch (filtroOrden.value) {
    case 'visitas': resultado.sort((a, b) => b.contador - a.contador); break
    case 'fecha': resultado.sort((a, b) => dayjs(a.fechacierre).diff(dayjs()) - dayjs(b.fechacierre).diff(dayjs())); break
    case 'alfabetico': resultado.sort((a, b) => a.nombre.localeCompare(b.nombre)); break
  }
  return resultado
})
</script>

<template>
  <main :class="['main-container', darkMode ? 'dark-mode' : 'light-mode']">
    <HeaderControls :filtroPlataforma="filtroPlataforma" :filtroOrden="filtroOrden"
      :plataformasDisponibles="plataformasDisponibles" :darkMode="darkMode" :toggleTheme="toggleTheme"
      @update-filtro-plataforma="filtroPlataforma = $event" @update-filtro-orden="filtroOrden = $event" />



    <div v-if="error" class="error">{{ error }}</div>

    <FondosTable v-else :fondos="fondosFiltradosYOrdenados" :months="months" :currentMonth="currentMonth" :dayjs="dayjs"
      :showTooltip="showTooltip" :hideTooltip="hideTooltip" :openUrl="openUrl" />

    <TooltipFondo v-if="hoveredFondo" :fondo="hoveredFondo" :position="tooltipPosition" :dayjs="dayjs" />

    <SugerenciaConvocatoria />

  </main>
</template>


<style scoped>
:global(html, body) {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

.main-container {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
</style>
