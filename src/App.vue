<script setup lang="ts"></script>

<template>
  <header class="container">
    <img src="./assets/logo.png" alt="Logo du site" />
    <h1>Bienvenue Chez Vue Library !</h1>
  </header>

  <main>
    <div class="search">
      <label for="search" class="field border prefix search-input">
        <i>search</i>
        <input id="search" type="text" placeholder="Chercher l'oeuvre souhaité" />
      </label>
      <button class="small-round large search-btn">Rechercher</button>
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
  margin: 1rem;
}
.search {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
}
.search-input {
  grid-area: span 4 / span 4;
}
.search-btn {
  grid-column-start: 5;
}
</style>
