import { computed, type Ref } from 'vue'

export function usePagination(currentPage: Ref<number>, totalPages: Ref<number>) {
  const visiblePages = computed<(number | string)[]>(() => {
    const pages: (number | string)[] = []
    const total = totalPages.value
    const current = currentPage.value
    const delta = 1 // nombre de pages autour de la page active

    if (total <= 5) {
      // Si peu de pages → on affiche tout
      return Array.from({ length: total }, (_, i) => i + 1)
    }

    const start = Math.max(2, current - delta)
    const end = Math.min(total - 1, current + delta)

    // Toujours afficher la première page
    pages.push(1)

    // Ajouter "…" si nécessaire avant
    if (start > 2) pages.push('...')

    // Pages centrales
    for (let i = start; i <= end; i++) pages.push(i)

    // Ajouter "…" si nécessaire après
    if (end < total - 1) pages.push('...')

    // Toujours afficher la dernière page
    pages.push(total)

    return pages
  })

  const goToPage = (page: number) => {
    if (currentPage.value === page) return
    currentPage.value = page
  }

  const next = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
  }

  const previous = () => {
    if (currentPage.value > 1) currentPage.value--
  }

  return { visiblePages, goToPage, next, previous }
}
