<script setup lang="ts">
const model = defineModel<string>()
const emit = defineEmits<{ (e: 'search'): void; (e: 'reset'): void }>()
</script>

<template>
  <div class="search">
    <label for="search" class="field border prefix search-input">
      <i>search</i>
      <input
        id="search"
        type="text"
        placeholder="Chercher l'oeuvre souhaitée"
        v-model="model"
        @keyup.enter="emit('search')"
        style="position: relative; padding-right: 48px"
      />
      <button v-if="model" @click="emit('reset')" class="border large square reset-btn">
        <i>close</i>
      </button>
    </label>
    <button class="small-round large search-btn" @click="emit('search')">Rechercher</button>
  </div>
</template>

<style>
.search {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 0.5rem;
  padding: 1rem;
}
.search-input {
  grid-area: span 4 / span 4;
}
.search-btn {
  grid-column-start: 5;
}
.reset-btn {
  position: absolute;
  right: 0;
  z-index: 99;
  cursor: pointer;
  border-color: transparent !important;
}
</style>
