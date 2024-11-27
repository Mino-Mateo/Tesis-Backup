<!-- HTML -->
<template>
  <div class="flex items-center space-x-3 flex-wrap">
    <!-- Label -->
    <strong class="text-center font-sans font-bold text-[20px] break-words">{{ label }}</strong>
    <!-- Contenido -->
    <span class="bg-light p-3 rounded-md flex-1 flex items-center font-sans font-bold overflow-hidden">
      <img :src="iconSrc" alt="Icono" class="w-6 h-6 mr-5" />
      <span class="font-sans text-[18px] break-words overflow-hidden text-ellipsis">{{ formattedValue }}</span>
    </span>
  </div>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { computed } from 'vue';

// Definir las props
const props = defineProps({
  label: {
    type: String,
    required: false,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  isPrice: {
    type: Boolean,
    default: false, 
  },
  isStock: {
    type: Boolean,
    default: false, 
  },
});

// Computar la ruta del icono
const iconSrc = computed(() => {
  return new URL(`../assets/icons/Resaltado/Simbolo/${props.icon}`, import.meta.url).href;
});

const formattedValue = computed(() => {
  if (props.isPrice) {
    // Asegurarse de que el valor sea un número y formatearlo a dos decimales
    return `${parseFloat(props.value).toFixed(2)}`;
  } else if (props.isStock) {
    // Formatear stock como entero
    return `${Math.round(props.value)} unidades`;
  }
  return props.value;
});
</script>