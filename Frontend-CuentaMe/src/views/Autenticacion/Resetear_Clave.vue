<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">
    <div class="flex flex-1 items-center justify-center">

      <!-- Regresar al Login -->
      <button class="absolute flex justify-center rounded-input top-4 left-6 w-10 h-10 bg-primary hover:bg-hover-primary"
        @click="navigateToLogin" aria-label="Regresar al login">
        <img src="../../assets/icons/Resaltado/Accion/back-icon.svg" alt="Flecha Regresar"
          class="w-6 h-6 self-center" />
      </button>

      <!-- Contenedor Principal -->
      <div class="w-full max-w-md p-8 bg-primary rounded-card shadow-pr">
        <!-- Texto -->
        <h2 class="text-3xl text-center mb-6 font-heading font-bold text-text-light">
          Restablecer Contraseña
        </h2>
        <p class="text-center mb-4 text-white font-sans">
          Ingresa tu nueva contraseña para restablecerla
        </p>

        <!-- Campos de la Contraseña doble -->
        <form @submit.prevent="handlePasswordReset" class="space-y-4">

          <!-- Contraseña 1 -->
          <div class="relative">
            <span class="absolute inset-y-0 left-4 flex items-center">
              <img src="../../assets/icons/Resaltado/Simbolo/password-icon.svg" alt="Icono de Candado"
                class="w-5 h-5" />
            </span>
            <input :type="showPassword ? 'text' : 'password'" v-model="newPassword" required
            class="block w-full pl-12 pr-3 py-3 text-center text-texto font-bold bg-light border border-gray-300 rounded-card shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
            placeholder="Nueva Contraseña" />
            <!-- Icono -->
            <span class="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              @click="togglePasswordVisibility('new')">
              <img src="../../assets/icons/Resaltado/Accion/eyepswd-icon.svg" alt="Icono Ojo" class="w-5 h-5" />
            </span>
          </div>

          <!-- Contraseña 2 -->
          <div class="relative">
            <span class="absolute inset-y-0 left-4 flex items-center">
              <img src="../../assets/icons/Resaltado/Simbolo/password-icon.svg" alt="Icono de Candado"
                class="w-5 h-5" />
            </span>
            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="confirmPassword" required
              class="block w-full pl-12 pr-3 py-3 text-center text-texto font-bold bg-light border border-gray-300 rounded-card shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
              placeholder="Confirmar Contraseña" />
            <!-- Icono -->
            <span class="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              @click="togglePasswordVisibility('confirm')">
              <img src="../../assets/icons/Resaltado/Accion/eyepswd-icon.svg" alt="Icono Ojo" class="w-5 h-5" />
            </span>
          </div>

          <!-- Enviar formulario -->
          <div class="relative">
            <button type="submit"
              class="w-full py-2 px-4 bg-secondary text-white font-semibold rounded-card hover:bg-[#9397c0] focus:outline-none focus:ring-2 focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-sans">
              Restablecer
            </button>
          </div>

        </form>
      </div>
    </div>

    <!-- Ventana de Confirmación -->
    <ConfirmationModal v-if="showConfirmation" title="Contraseña restablecida con éxito"
      message="Regresa e inica sesión de nuevo" @close="closeConfirmation" />

    <!-- Mensaje de Error -->
    <ErrorMessage v-if="showError" :message_1="'Las contraseñas no coinciden'" message_2="Intenta de nuevo"
      class="animate-slide-in" />

  </main>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { ref } from "vue";
import { useRouter } from "vue-router";
import ErrorMessage from "../../components/ErrorMessage.vue";
import ConfirmationModal from "../../components/ConfirmationModal.vue";

// Variables Reactivas
const router = useRouter();
const newPassword = ref("");
const confirmPassword = ref("");
const showError = ref(false);
const showConfirmation = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Regresar al Login
function navigateToLogin() {
  router.push({ name: "Login" });
}

// Restablecer la contraseña
function handlePasswordReset() {
  if (newPassword.value !== confirmPassword.value) {
    showError.value = true;
    setTimeout(() => (showError.value = false), 5000);
  } else {
    setTimeout(() => (showConfirmation.value = true), 2000);
  }
}

// Cerrar ventana de confirmación
function closeConfirmation() {
  showConfirmation.value = false;
}

// Función ver contraseña
function togglePasswordVisibility(type) {
  if (type === 'new') {
    showPassword.value = !showPassword.value;
  } else if (type === 'confirm') {
    showConfirmPassword.value = !showConfirmPassword.value;
  }
}
</script>

<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap");

.font-heading {
  font-family: "Poppins", sans-serif;
}

.font-sans {
  font-family: "Josefin Sans", sans-serif;
}

/* Animación de Entrada */
@keyframes slide-in {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.5s ease-out forwards;
}

/* Fondo de Pantalla */
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
  background-repeat: no-repeat;
}

/* Estilos Responsivos */
@media (max-width: 640px) {
  .rounded-2xl {
    border-radius: 20px;
  }

  h2 {
    font-size: 1.5rem;
  }

  input,
  button {
    font-size: 0.875rem;
  }
}
</style>