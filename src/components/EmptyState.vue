<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
}>()
</script>

<template>
  <article class="medium middle-align center-align" style="width: -webkit-fill-available">
    <div>
      <i class="extra">{{ icon }}</i>
      <h5>{{ title }}</h5>
      <p>{{ description }}</p>
    </div>
  </article>
</template>
