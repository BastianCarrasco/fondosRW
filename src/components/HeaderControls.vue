<script setup>
const emit = defineEmits(['update-filtro-plataforma', 'update-filtro-orden'])

const props = defineProps({
  filtroPlataforma: String,
  filtroOrden: String,
  plataformasDisponibles: Array,
  darkMode: Boolean,
  toggleTheme: Function
})
</script>

<template>
  <div class="header-controls">
    <h1 class="app-title">Calendario de Fondos</h1>

    <div class="filters-container">
      <div class="filter-group">
        <label for="plataforma">Plataforma:</label>
        <select
          id="plataforma"
          :value="filtroPlataforma"
          @change="e => emit('update-filtro-plataforma', e.target.value)"
          class="filter-select"
        >
          <option value="">Todas</option>
          <option
            v-for="plataforma in plataformasDisponibles"
            :key="plataforma"
            :value="plataforma"
          >
            {{ plataforma }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label for="orden">Orden:</label>
        <select
          id="orden"
          :value="filtroOrden"
          @change="e => emit('update-filtro-orden', e.target.value)"
          class="filter-select"
        >
          <option value="visitas">Visitas</option>
          <option value="fecha">Fecha</option>
          <option value="alfabetico">A-Z</option>
        </select>
      </div>
    </div>

    <button @click="toggleTheme" class="theme-button">
      <span v-if="darkMode">☀️ Claro</span>
      <span v-else>🌙 Oscuro</span>
    </button>
  </div>
</template>

<style scoped>
.theme-button {
  scale: 1.2;
  margin-right: 20px;
}
.app-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 20px;
}
</style>
