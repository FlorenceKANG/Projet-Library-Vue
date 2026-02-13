<script setup lang="ts">
const model = defineModel<string>()
const emit = defineEmits<{ (e: 'search'): void }>()
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
      />
    </label>
    <button class="small-round large search-btn" @click="emit('search')">Rechercher</button>
  </div>
</template>

<style>
.search {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 0.5rem;
}
.search-input {
  grid-area: span 4 / span 4;
}
.search-btn {
  grid-column-start: 5;
}
</style>
