<script setup lang="ts">
import { ref } from 'vue'

interface Book {
  key: string
  title: string
  author_name?: string[]
  first_publish_year?: number
  cover_i?: number
}

const books = ref<Book[]>([])
const input = ref<string>('')
const state = ref<'idle' | 'loading' | 'success' | 'error'>('idle')

const onSearch = async () => {
  if (!input.value.trim()) return

  state.value = 'loading'

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(input.value.trim())}`,
    )

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }

    const data = await response.json()

    books.value = data.docs
    state.value = 'success'
  } catch (error) {
    console.error(error)
    state.value = 'error'
  }
}

const getCoverUrl = (coverId: number) => {
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
}
</script>

<template>
  <header class="container">
    <img src="./assets/logo.png" alt="Logo du site" width="100px" height="100px" />
    <h1>Bienvenue Chez Vue Library !</h1>
  </header>

  <main>
    <div class="search">
      <label for="search" class="field border prefix search-input">
        <i>search</i>
        <input id="search" type="text" placeholder="Chercher l'oeuvre souhaitée" v-model="input" />
      </label>
      <button class="small-round large search-btn" @click="onSearch">Rechercher</button>
    </div>
    <div class="container">
      <progress v-if="state === 'loading'" class="circle wavy indeterminate" value="50" max="100" />
      <article
        v-if="state === 'error'"
        class="medium middle-align center-align"
        style="width: -webkit-fill-available"
      >
        <div>
          <i class="extra">error</i>
          <h5>Une erreur est survenue.</h5>
          <p>Veuillez réessayer plus tard.</p>
        </div>
      </article>
      <article
        v-if="input && state === 'success' && books.length === 0"
        class="medium middle-align center-align"
        style="width: -webkit-fill-available"
      >
        <div>
          <i class="extra">search</i>
          <h5>Pas de résultat.</h5>
          <p>Aucune donnée trouvée à votre recherche.</p>
        </div>
      </article>
      <ul v-if="state === 'success'" class="list border" style="width: -webkit-fill-available">
        <li v-for="book in books" :key="book.key" class="row">
          <img
            :src="getCoverUrl(book.cover_i as number)"
            :alt="book.title"
            width="80px"
            height="80px"
          />
          <div>
            <p class="bold">{{ book.title }} ({{ book.first_publish_year }})</p>
            <p class="italic">{{ book.author_name?.join(', ') }}</p>
          </div>
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
