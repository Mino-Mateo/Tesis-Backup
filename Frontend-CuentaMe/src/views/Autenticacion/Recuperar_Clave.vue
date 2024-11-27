<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen">
    <div class="flex flex-1 items-center justify-center">

      <!-- Regresar al Login -->
      <button
        class="absolute flex justify-center rounded-input top-4 left-6 w-10 h-10 bg-primary hover:bg-hover-primary"
        @click="navigateToLogin" aria-label="Regresar al login">
        <img src="../../assets/icons/Resaltado/Accion/back-icon.svg" alt="Flecha Regresar"
          class="w-6 h-6 self-center" />
      </button>

      <!-- Contenedor Principal -->
      <div class="w-full max-w-md p-8 bg-primary rounded-card shadow-pr">

        <!-- Texto -->
        <h2 class="text-3xl text-center mb-6 font-heading font-bold text-text-light">
          Recuperar Contraseña
        </h2>
        <p class="text-center mb-4 text-text-light font-sans">
          Ingresa tu correo electrónico, te enviaremos un correo para cambiar tu contraseña.
        </p>

        <!-- Formulario de Recuperación -->
        <form @submit.prevent="handlePasswordRecovery" class="space-y-4">
          <!-- Campo de Correo Electrónico -->
          <div class="relative">
            <span class="absolute inset-y-0 left-4 flex items-center">
              <img src="../../assets/icons/Resaltado/Simbolo/mail-icon.svg" alt="Icono Carta" class="w-7 h-7" />
            </span>
            <input type="email" v-model="email" required
              class="block w-full pl-12 pr-3 py-3 text-center text-texto font-bold bg-light border border-gray-300 rounded-card shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#946ad8] focus:border-[#946ad8]"
              placeholder="Correo electrónico" aria-label="Correo electrónico" />
          </div>

          <!-- Botón de Envío de Recuperación -->
          <button type="submit"
            class="w-full flex items-center justify-center py-2 px-4 bg-secondary text-text-light hover:bg-[#9397c0] focus:outline-none focus:ring-2 rounded-card focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-sans"
            aria-label="Recuperar contraseña">
            Recuperar
          </button>
        </form>
      </div>
    </div>

    <!-- Ventana de Confirmación -->
    <ConfirmationModal v-if="showConfirmation" title="Correo enviado con éxito"
      message="Revisa tu bandeja de entrada para restablecer tu contraseña" @close="closeConfirmation" />

    <!-- Mensaje de Error -->
    <ErrorMessage v-if="showError" :message_1="'Ingresa un correo electrónico válido'" message_2="Intenta de nuevo"
      class="animate-slide-in" />

  </main>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ConfirmationModal from "../../components/ConfirmationModal.vue";
import ErrorMessage from "../../components/ErrorMessage.vue";

// Variables reactivas
const email = ref("");
const showConfirmation = ref(false);
const showError = ref(false);
const router = useRouter();

// Formato del correo electrónico
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Función para navegar al login
function navigateToLogin() {
  router.push({ name: "Login" });
}

// Función para manejar la recuperación de contraseña
function handlePasswordRecovery() {
  if (emailPattern.test(email.value)) {
    showConfirmation.value = true;
  } else {
    showError.value = true;
    setTimeout(() => (showError.value = false), 5000);
  }
}

// Enfoque del correo electrónico
onMounted(() => {
  const emailInput = document.querySelector("input[type='email']");
  emailInput && emailInput.focus();
});

// Función para cerrar la ventana de confirmación
function closeConfirmation() {
  showConfirmation.value = false;
}
</script>

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