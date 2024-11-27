<!-- HTML -->
<template>
  <div
    class="fixed top-4 right-0 bg-danger text-text-light px-4 py-2 rounded-l-md shadow-lg flex items-start space-x-3">
    <img src="../assets/icons/Resaltado/Alerta/alert-icon.svg" alt="Icono de error" class="w-6 h-6 self-center" />
    <div>
      <p class="font-semibold">{{ message_1 }}</p>
      <p class="font-semibold">{{ message_2 }}</p>
    </div>
  </div>
</template>

<!-- Scripts -->
<script setup>
// Comportamiento del mensaje
defineProps({
  message_1: {
    type: String,
    required: true,
  },
  message_2: {
    type: String,
    required: true,
  },
});
</script>