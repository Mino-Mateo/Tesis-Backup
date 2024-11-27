<!-- HTML -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="relative p-8 bg-primary rounded-card text-center w-3/4 max-w-md">

      <!-- Botón para cerrar -->
      <button class="absolute top-2 right-2 text-white" @click="$emit('close')" aria-label="Cerrar ventana">
        <img src="../assets/icons/Resaltado/Accion/close-icon.svg" alt="Cerrar" class="w-7 h-7" />
      </button>

      <!-- Mensaje -->
      <p class="text-3xl text-center mb-6 mt-2 font-heading font-bold text-text-light">{{ title }}</p>
      <img src="../assets/icons/Resaltado/Alerta/confirmacion-icon.svg" alt="Confirmación"
        class="w-20 h-20 place-self-center" />
      <p class="text-white font-sans text-[20px] mt-5">{{ message }}</p>

    </div>
  </div>
</template>

<!-- Scripts -->
<script setup>
// Comportamiento del modal
defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});
</script>