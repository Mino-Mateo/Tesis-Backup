<!-- HTML -->
<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
    <div class="relative p-8 bg-primary rounded-card text-center w-3/4 max-w-md">

      <!-- Mensaje -->
      <h3 class="text-3xl text-center mb-6 mt-2 font-heading font-bold text-text-light">
        {{ mensaje }}
      </h3>
      <img src="../assets/icons/Resaltado/Alerta/alert-icon.svg" alt="Advertencia"
        class="w-20 h-20 place-self-center" />

      <!-- Botones -->
      <div class="flex justify-between mt-10">
        <button @click="confirmAction"
          class="w-40 h-10 text-black rounded-card font-bold bg-success hover:bg-[#63e951]">
          Sí
        </button>
        <button @click="closeModal" class="w-40 h-10 text-black rounded-card font-bold bg-danger hover:bg-[#e95151]">
          No
        </button>
      </div>

    </div>
  </div>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { defineProps, defineEmits } from "vue";

// Variables reactivas
const emit = defineEmits(["close", "confirm"]);

// Comportamiento del modal
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  mensaje: {
    type: String,
    default: "¿Estás seguro de realizar esta acción?",
  },
});

// Función para cancelar acción
function closeModal() {
  emit("close");
}

// Función para confirmar acción
function confirmAction() {
  emit("confirm");
}
</script>