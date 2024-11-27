<!-- HTML -->
<template>
  <router-view />
  <main id="main" class="flex flex-col w-full min-h-screen">
    <div class="flex flex-1 items-center justify-center">

      <!-- Contenedor Principal -->
      <div class="w-full max-w-sm p-10 bg-primary rounded-2xl shadow-lg">

        <!-- Texto de Bienvenida -->
        <h2 class="text-3xl text-center mb-6 font-heading font-bold text-text-light">
          Bienvenid@
        </h2>

        <!-- Formulario de Login -->
        <form @submit.prevent="handleLogin" class="space-y-6 font-sans">
          <!-- Correo -->
          <div class="relative">
            <label for="email" class="sr-only">Correo electrónico</label>
            <div class="absolute inset-y-0 left-4 flex items-center">
              <img src="../../assets/icons/Resaltado/Simbolo/mail-icon.svg" alt="Icono de correo electrónico"
                class="w-5 h-5" />
            </div>
            <input type="email" id="email" v-model="email" required
              class="block w-full pl-12 pr-10 py-3 text-center text-texto font-bold bg-light border border-gray-300 rounded-input shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              :class="{ 'border-danger': showError && !isValidEmail }" placeholder="Correo electrónico"
              aria-label="Correo electrónico" />
          </div>

          <!-- Contraseña -->
          <div class="relative">
            <label for="clave" class="sr-only">Contraseña</label>
            <div class="absolute inset-y-0 left-4 flex items-center">
              <img src="../../assets/icons/Resaltado/Simbolo/password-icon.svg" alt="Icono de candado"
                class="w-5 h-5" />
            </div>
            <input :type="showPassword ? 'text' : 'password'" id="clave" v-model="clave" required
              class="block w-full pl-12 pr-10 py-3 text-center text-texto font-bold bg-light border border-gray-300 rounded-input shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary"
              :class="{ 'border-danger': showError && !isValidPassword }" placeholder="Contraseña"
              aria-label="Contraseña" />
            <div class="absolute inset-y-0 right-4 flex items-center cursor-pointer" @click="togglePasswordVisibility">
              <img src="../../assets/icons/Resaltado/Accion/eyepswd-icon.svg" alt="Mostrar/Ocultar contraseña"
                class="w-5 h-5" />
            </div>
          </div>

          <!-- Botón de Ingreso -->
          <div class="relative">
            <button type="submit"
              class="w-full flex items-center justify-center py-2 px-4 bg-secondary text-text-light hover:bg-[#9397c0] focus:outline-none focus:ring-2 rounded-card focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-sans">
              <img src="../../assets/icons/Resaltado/Simbolo/login-icon.svg" alt="Icono de ingresar"
                class="w-5 h-5 mr-2" />
              Ingresar
            </button>
          </div>
        </form>

        <!-- Enlace de Recuperación de Contraseña -->
        <div class="text-center mt-4">
          <router-link to="/recuperacion" class="text-sm text-light hover:underline font-sans">
            Recuperar contraseña
          </router-link>
        </div>

      </div>
    </div>

    <!-- Mensaje de Error -->
    <ErrorMessage v-if="showError" :message_1="'El usuario o contraseña son incorrectos'" message_2="Intenta de nuevo"
      class="animate-slide-in" />
  </main>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import ErrorMessage from "../../components/ErrorMessage.vue";

// Variables reactivas
const email = ref("");
const clave = ref("");
const showError = ref(false);
const showPassword = ref(false);
const router = useRouter();

// Validaciones
const isValidEmail = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value));
const isValidPassword = computed(() => clave.value.length >= 6);

// Función para el Inicio de sesión
function handleLogin() {
  if (isValidEmail.value && isValidPassword.value && email.value === "a@a.com" && clave.value === "123456") {
    router.push("/Menu");
  } else {
    showError.value = true;
    setTimeout(() => (showError.value = false), 5000);
  }
}

// Función para mostrar/ocultar la contraseña
function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
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
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantallaLogo.png");
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