// src/composables/useFondos.js
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'

export function useFondos() {
  const fondos = ref([])
  const loading = ref(true)
  const error = ref(null)
  const hoveredFondo = ref(null)
  const tooltipPosition = ref({ x: 0, y: 0 })

  const currentYear = dayjs().year()
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']

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

  const todayPosition = computed(() => {
    const today = dayjs()
    if (today.year() !== currentYear) return null
    return (today.month() + today.date() / 30) * (100 / 12)
  })

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

  const openUrl = (url) => {
    window.open(url, '_blank')
  }

  onMounted(fetchFondos)

  return {
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
  }
}
