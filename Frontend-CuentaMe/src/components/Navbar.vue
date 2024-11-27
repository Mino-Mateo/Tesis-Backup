<!-- HTML -->
<template>
  <nav class="navbar flex items-center justify-between bg-primary p-4 font-heading rounded-b-lg shadow-lg">
    <!-- Texto de bienvenida -->
    <div class="flex-1">
      <span class="text-text-light text-lg font-bold">Bienvenida {{ userName }}</span>
    </div>

    <!-- Navegación -->
    <div class="flex flex-1 justify-between space-x-10 font-semibold text-text-light">
      <router-link to="/Clientes" aria-label="Ir a la sección de Clientes"
        class="transition-colors hover:text-focus-primary">Clientes</router-link>
      <router-link to="/Menu_Productos" aria-label="Ir a la sección de Productos"
        class="transition-colors hover:text-focus-primary">Productos</router-link>
      <router-link to="/Pedidos" aria-label="Ir a la sección de Pedidos"
        class="transition-colors hover:text-focus-primary">Pedidos</router-link>
    </div>

    <!-- Botón de cerrar sesión -->
    <div class="flex-1 flex justify-end">
      <button @click="handleLogout" aria-label="Cerrar sesión"
        class="logout-button transition-colors flex px-4 py-2 items-center space-x-3 rounded-card font-bold  text-text-light bg-danger hover:bg-[#e95151]">
        <img src="../assets/icons/Resaltado/Simbolo/login-icon.svg" alt="Cerrar sesión" class="w-5 h-5" />
        <span>Salir</span>
      </button>
    </div>

  </nav>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { ref } from "vue";
import { useRouter } from "vue-router";

// Variables reactivas
const router = useRouter();
const userName = ref("Mariana");

// Función para cerrar sesión
function handleLogout() {
  localStorage.removeItem("authToken");
  router.push({ name: "Login" });
}
</script>

<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap");

.font-heading {
  font-family: "Poppins", sans-serif;
}

/* Responsividad */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    text-align: center;
  }

  .logout-button {
    margin-top: 10px;
  }
}
</style>