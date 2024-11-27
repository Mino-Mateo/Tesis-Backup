<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen font-heading bg-cover bg-custom">
    <!-- Navbar -->
    <Navbar />

    <!-- Sección Principal -->
    <section class="flex justify-center items-center flex-1 px-6 py-12">
      <!-- Cuadros de Navegación -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-16">
        <!-- Cuadro Cajas -->
        <div @click="goToCajas"
          class="bg-primary p-16 rounded-card shadow-lg flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-hover-primary">
          <img :src="cajaIcon" alt="Icono Cajas" class="mb-6 w-16 h-16" />
          <span class="text-3xl text-center font-heading font-bold text-text-light">Cajas</span>
        </div>

        <!-- Cuadro Materiales -->
        <div @click="goToMateriales"
          class="bg-primary p-16 rounded-card shadow-lg flex flex-col items-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-hover-primary">
          <img :src="materialIcon" alt="Icono Materiales" class="mb-6 w-16 h-16" />
          <span class="text-3xl text-center font-heading font-bold text-text-light">Materiales</span>
        </div>
      </div>
    </section>

  </main>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import Navbar from "../../components/Navbar.vue";
import { useRouter } from "vue-router";
import cajaIcon from "../../assets/icons/Resaltado/Simbolo/caja-icon.svg";
import materialIcon from "../../assets/icons/Resaltado/Simbolo/flor-icon.svg";

// Variables
const router = useRouter();

// Función redirigir a la pantalla de cajas
function goToCajas() {
  router.push("/Cajas");
}

// Función redirigir a la pantalla de materiales
function goToMateriales() {
  router.push("/Materiales");
}
</script>

<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap");

.font-heading {
  font-family: "Poppins", sans-serif;
}

/* Estilos extras */
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
}

@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

/* Transición de Hover */
.transition-transform {
  transition: transform 0.3s ease-in-out;
}

.transform {
  transform: scale(1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}

/* Clase responsive para tarjetas */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: 1fr;
  }
}
</style>