<script setup lang="ts">
import { usePagination } from '@/hooks/usePagination'
import { computed, ref, watch } from 'vue'

const props = defineProps<{ totalPages: number; model: number }>()
const emit = defineEmits<{ (e: 'update:model', value: number): void }>()

// relaye les changements au parent
const currentPage = computed({
  get: () => props.model,
  set: (value: number) => emit('update:model', value),
})

const totalPagesRef = ref(props.totalPages)

const { visiblePages, goToPage, next, previous } = usePagination(currentPage, totalPagesRef)

watch(
  () => props.totalPages, // ancien valeur
  (val) => (totalPagesRef.value = val), // nouvelle valeur
)
</script>

<template>
  <nav v-if="props.totalPages > 1" class="group connected absolute bottom center">
    <button class="no-round" :disabled="currentPage === 1" @click="previous">
      <i>arrow_left</i>
    </button>

    <button
      v-for="(page, index) in visiblePages"
      :key="index"
      class="no-round"
      :class="{ active: page === currentPage }"
      :disabled="page === '...'"
      @click="typeof page === 'number' && goToPage(page)"
    >
      {{ page }}
    </button>

    <button class="no-round" :disabled="currentPage === props.totalPages" @click="next">
      <i>arrow_right</i>
    </button>
  </nav>
</template>
