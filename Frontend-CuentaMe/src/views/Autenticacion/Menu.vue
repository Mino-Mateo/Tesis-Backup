<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">
    <Navbar aria-label="Menú de navegación principal" />
  </main>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import Navbar from "../../components/Navbar.vue";
</script>

<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap");

@media (max-width: 640px) {
  main {
    padding: 1rem;
  }
}

/* Fondo de Pantalla */
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
  background-position: center;
}
</style>