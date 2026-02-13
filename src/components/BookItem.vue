<script setup lang="ts">
import type { Book } from '@/@types'

defineProps<{ book: Book }>()

const getCoverUrl = (coverId: number) => {
  return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
}
</script>

<template>
  <img :src="getCoverUrl(book.cover_i as number)" :alt="book.title" width="80px" height="80px" />
  <div>
    <p class="bold">{{ book.title }} ({{ book.first_publish_year }})</p>
    <p class="italic">{{ book.author_name?.join(', ') }}</p>
  </div>
</template>
