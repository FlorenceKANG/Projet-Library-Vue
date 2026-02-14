<script setup lang="ts">
import { computed, ref } from 'vue'
import SearchBar from './components/SearchBar.vue'
import BookItem from './components/BookItem.vue'
import type { Book } from './@types'
import EmptyState from './components/EmptyState.vue'

const books = ref<Book[]>([])
const input = ref<string>('')
const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

let controller: AbortController | null = null

const hasNoResults = computed(
  () => input.value && state.value === 'success' && books.value.length === 0,
)

const onSearch = async () => {
  const query = input.value.trim()
  if (!query) return

  // Annule la requête précédente si elle existe
  controller?.abort()
  controller = new AbortController()

  state.value = 'loading'

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(input.value.trim())}`,
      { signal: controller.signal },
    )

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json()

    books.value = data.docs ?? []
    state.value = 'success'
  } catch (error) {
    console.error(error)
    state.value = 'error'
  }
}

const onReset = () => {
  controller?.abort()
  input.value = ''
  books.value = []
  state.value = 'idle'
}
</script>

<template>
  <header class="container">
    <img src="./assets/logo.png" alt="Logo du site" width="100px" height="100px" />
    <h1>Bienvenue Chez Vue Library !</h1>
  </header>

  <main>
    <SearchBar v-model="input" @search="onSearch" @reset="onReset" />

    <div class="container">
      <progress v-if="state === 'loading'" class="circle wavy indeterminate" value="50" max="100" />

      <EmptyState
        v-else-if="state === 'error'"
        icon="error"
        title="Une erreur est survenue."
        description="Veuillez réessayer plus tard."
      />

      <EmptyState
        v-else-if="hasNoResults"
        icon="search"
        title="Pas de résultat"
        description="Aucune donnée trouvée à votre recherche."
      />

      <ul v-else-if="state === 'success'" class="list border responsive">
        <li v-for="book in books" :key="book.key" class="row">
          <BookItem :book="book" />
        </li>
      </ul>
    </div>
  </main>
</template>

<style>
h1 {
  text-align: center;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
}
</style>
