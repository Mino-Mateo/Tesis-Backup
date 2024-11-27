<!-- HTML -->
<template>
  <main id="main" class="flex flex-col w-full min-h-screen pt-0">
    <!-- Navbar -->
    <Navbar />

    <!-- Contenedor principal -->
    <div class="flex w-full h-full gap-6 mt-6 px-10">
      <!-- Contenedor Izquierda -->
      <section class="w-1/3 max-w-xs p-5 bg-primary rounded-card shadow-lg mb-5">
        <!-- Botón añadir Caja -->
        <button @click="toggleAddNewCaja"
          class="w-full flex items-center justify-center py-2 px-4 mb-5 bg-secondary text-text-light hover:bg-[#9397c0] focus:outline-none focus:ring-2 rounded-card focus:ring-[#946ad8] focus:border-[#946ad8] focus:ring-opacity-50 font-sans"
          aria-label="Añadir nueva caja">
          Añadir Caja
        </button>

        <!-- Cuadro de búsqueda -->
        <div class="pb-6 text-texto">
          <input type="text" aria-label="Buscar clientes por nombre" placeholder="Buscar por nombre"
            v-model="searchQuery" @input="filterCajas"
            class="w-full bg-light p-3 rounded-md shadow-md text-center focus:outline-none" />
          <div v-if="filteredCajas.length === 0" class="text-center pt-5 text-xl text-white">
            No se encontraron resultados
          </div>
        </div>

        <!-- Lista de cajas -->
        <div class="h-[590px] overflow-y-auto space-y-4 pr-4">
          <div v-for="(caja, index) in filteredCajas" :key="index" @click="selectCaja(caja)"
            class="caja-item flex items-center bg-light p-2 rounded-md shadow-md cursor-pointer text-texto">
            <img src="../../assets/icons/Resaltado/Simbolo/caja2-icon.svg" alt="Icono Cliente"
              class="w-10 h-10 rounded-full mr-4" />
            <span>{{ caja.nombre }}</span>
          </div>
        </div>
      </section>

      <!-- Contenedor Derecha -->
      <section class="flex-1 p-10 bg-primary rounded-card shadow-lg mb-5">
        <h2 class="text-3xl text-center mb-6 font-heading font-bold text-text-light">Datos de la caja</h2>

        <!-- Contenedor principal -->
        <div class="w-full bg-secondary pl-10 pr-10 pt-6 pb-6 rounded-card text-texto">
          <!-- Texto antes de seleccionar la caja -->
          <div v-if="!selectedCaja && !isAddingNewCaja"
            class="text-[25px] text-center font-semibold font-sans text-text-light">
            Selecciona una caja para ver sus datos
          </div>

          <!-- Datos de la nueva caja -->
          <div v-if="isAddingNewCaja && !selectedCaja" class=" rounded-card space-y-5">
            <!-- Título -->
            <h3 class="text-2xl font-bold text-center text-white">Nueva Caja</h3>

            <!-- Campos del formulario -->
            <div class="space-y-4">
              <!-- Nombre -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Icono de Nombre"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newCaja.nombre" type="text" placeholder="Nombre" class="block w-full pl-12 py-3 rounded-md text-texto 
                  focus:outline-none bg-light" />
              </div>

              <!-- Descripción -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Icono de descripción"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <textarea v-model="newCaja.descripcion" placeholder="Descripción" rows="3" class="block w-full pl-12 py-3 rounded-md text-texto 
                  focus:outline-none bg-light"></textarea>
              </div>

              <!-- Precio -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Icono de Precio"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newCaja.precio" type="text" placeholder="Precio" class="block w-full pl-12 py-3 rounded-md text-texto 
                  focus:outline-none bg-light" @input="validatePrice" @blur="formatPrice" />
              </div>

              <!-- Stock -->
              <div class="relative">
                <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Icono de Stock"
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                <input v-model="newCaja.stock" type="number" placeholder="Stock" min="0" step="1" class="block w-full pl-12 py-3 rounded-md text-texto 
                  focus:outline-none bg-light" @input="validateStock" />
              </div>

              <!-- Imagen -->
              <div class="relative">
                <!-- Botón personalizado -->
                <label for="file-upload" :class="[
                  'block w-full text-center py-3 rounded-md cursor-pointer transition duration-200',
                  selectedImage ? 'bg-success text-white' : 'bg-warning text-black hover:bg-[#e9df55]'
                ]">
                  {{ selectedImage ? 'Imagen Seleccionada' : 'Subir Imagen' }}
                </label>
                <!-- Input de archivo escondido -->
                <input id="file-upload" type="file" @change="onImageSelected" accept="image/png, image/jpeg, image/jpg"
                  class="hidden" />
              </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-center space-x-20 pt-4">
              <button @click="saveNewCaja" class="w-1/3 bg-success hover:bg-[#63e951] text-black py-3 px-16 rounded-md">
                Guardar
              </button>
              <button @click="cancelAddCaja"
                class="w-1/3 bg-danger hover:bg-[#e95151] text-black py-3 px-16 rounded-md">
                Cancelar
              </button>
            </div>
          </div>

          <!-- Datos de la caja -->
          <div v-if="selectedCaja && !isAddingNewCaja" class="space-y-3">
            <!-- Imagen -->
            <div class="flex justify-center ">
              <div class="w-48 h-48 flex items-center shadow-md">
                <!-- Modo de edición -->
                <label v-if="editMode" for="fileInput"
                  class="cursor-pointer bg-light p-3 rounded-card w-full h-full flex justify-center items-center">
                  <input type="file" id="fileInput" @change="onImageSelected" class="hidden"
                    accept="image/png, image/jpeg" />
                  <img v-if="selectedImage" :src="selectedImage"
                    class="image-preview rounded-card w-full h-full bg-light" />
                </label>
                <!-- Modo normal -->
                <div v-else class="bg-light p-3 rounded-card w-full h-full flex justify-center items-center">
                  <img :src="selectedCaja.foto" alt="Foto" class="w-full h-full rounded-card object-cover" />
                </div>
              </div>
            </div>

            <!-- Campos de texto -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Nombre -->
              <div>
                <strong class="text-lg block pl-3">Nombre</strong>
                <InfoRow v-if="!editMode" :value="selectedCaja.nombre" icon="namelast-icon.svg" />
                <div v-if="editMode" class="flex bg-light p-3 rounded-md space-x-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/namelast-icon.svg" alt="Nombre Icono"
                    class="w-6 h-6" />
                  <input v-model="selectedCaja.nombre" type="text"
                    class="bg-light rounded-md w-full font-sans text-[18px] focus:outline-none" />
                </div>
              </div>

              <!-- Precio -->
              <div>
                <strong class="text-lg block pl-3">Precio</strong>
                <InfoRow v-if="!editMode" :value="`${selectedCaja.precio}`" icon="dinero-icon.svg" />
                <div v-if="editMode" class="flex bg-light p-3 rounded-md space-x-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/dinero-icon.svg" alt="Precio Icono" class="w-6 h-6" />
                  <input v-model="selectedCaja.precio" type="number" min="0" step="0.01" @input="validatePrice"
                    class="bg-light rounded-md w-full font-sans text-[18px] focus:outline-none" />
                </div>
              </div>

              <!-- Stock -->
              <div>
                <strong class="text-lg block pl-3">Stock</strong>
                <InfoRow v-if="!editMode" :value="selectedCaja.stock" icon="stock-icon.svg" />
                <div v-if="editMode" class="flex bg-light p-3 rounded-md space-x-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/stock-icon.svg" alt="Stock Icono" class="w-6 h-6" />
                  <input v-model="selectedCaja.stock" type="number" min="0" step="1"
                    class="bg-light rounded-md w-full font-sans text-[18px] focus:outline-none" />
                </div>
              </div>

              <!-- Descripción -->
              <div class="col-span-1 md:col-span-2">
                <strong class="text-lg block pl-2">Descripción</strong>
                <InfoRow v-if="!editMode" :value="selectedCaja.descripcion" icon="descripcion-icon.svg" />
                <div v-if="editMode" class="flex bg-light p-3 rounded-md space-x-3">
                  <img src="../../assets/icons/Resaltado/Simbolo/descripcion-icon.svg" alt="Descripción Icono"
                    class="w-6 h-6" />
                  <textarea v-model="selectedCaja.descripcion" rows="3"
                    class="bg-light rounded-md w-full font-sans text-[18px] focus:outline-none"></textarea>
                </div>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex justify-center space-x-20 pt-4">
              <button v-if="!editMode" @click="editMode = true"
                class="w-1/3 bg-warning hover:bg-[#e9df55] text-black py-3 px-16 rounded-md">
                Editar
              </button>
              <button v-if="editMode" @click="saveCaja"
                class="w-1/3 bg-success hover:bg-[#63e951] text-black py-3 px-16 rounded-md">
                Guardar
              </button>
              <button @click="openDeleteConfirm(selectedCaja)"
                class="w-1/3 bg-danger hover:bg-[#e95151] text-black py-3 px-16 rounded-md">
                Eliminar
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- Ventana Emergente -->
      <ConfirmDeleteModal :visible="showDeleteConfirm" :mensaje="'¿Estás seguro de eliminar la caja?'"
        @close="closeDeleteConfirm" @confirm="confirmDeleteCaja" />

      <!-- Mensaje de Error -->
      <ErrorMessage v-if="showError" :message_1="'Debes completar todos los campos'" message_2="Intenta de nuevo"
        class="animate-slide-in" />
    </div>
  </main>
</template>

<!-- Scripts -->
<script setup>
/* Importaciones */
import { ref, reactive, computed } from "vue";
import Navbar from "../../components/Navbar.vue";
import ErrorMessage from "../../components/ErrorMessage.vue";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal.vue";
import InfoRow from "../../components/InfoRow.vue";

// Datos quemados cajas
const initialCajas = [
  {
    nombre: "Caja romántica",
    descripcion: "Caja en forma de corazón, ideal para San Valentín",
    precio: 8.0,
    stock: 50,
    foto: obtenerRutaImagen(1),
  },
  {
    nombre: "Caja de lujo",
    descripcion: "Caja negra con acabado mate y lazo dorado",
    precio: 15.0,
    stock: 30,
    foto: obtenerRutaImagen(2),
  },
  {
    nombre: "Caja vintage",
    descripcion: "Caja de madera con detalles en hierro envejecido",
    precio: 12.0,
    stock: 20,
    foto: obtenerRutaImagen(3),
  },
  {
    nombre: "Caja minimalista",
    descripcion: "Caja blanca con líneas simples y elegante",
    precio: 10.0,
    stock: 40,
    foto: obtenerRutaImagen(4),
  },
  {
    nombre: "Caja de cumpleaños",
    descripcion: "Caja decorada con motivos festivos, perfecta para regalos",
    precio: 9.5,
    stock: 25,
    foto: obtenerRutaImagen(5),
  },
  {
    nombre: "Caja navideña",
    descripcion: "Caja roja con detalles dorados, ideal para la Navidad",
    precio: 14.0,
    stock: 15,
    foto: obtenerRutaImagen(6),
  },
  {
    nombre: "Caja para joyas",
    descripcion: "Caja de terciopelo azul, perfecta para guardar joyas y accesorios",
    precio: 20.0,
    stock: 10,
    foto: obtenerRutaImagen(7),
  },
  {
    nombre: "Caja eco-friendly",
    descripcion: "Caja de cartón reciclado con acabado natural y ecológico",
    precio: 6.5,
    stock: 60,
    foto: obtenerRutaImagen(8),
  },
  {
    nombre: "Caja de madera personalizada",
    descripcion: "Caja de madera con grabado personalizado para ocasiones especiales",
    precio: 18.0,
    stock: 12,
    foto: obtenerRutaImagen(9),
  },
  {
    nombre: "Caja de lujo dorada",
    descripcion: "Caja dorada con detalles en blanco y lazo de satén",
    precio: 25.0,
    stock: 8,
    foto: obtenerRutaImagen(10),
  },
  {
    nombre: "Caja de flores",
    descripcion: "Caja con decoración de flores secas, ideal para regalar en bodas",
    precio: 17.0,
    stock: 18,
    foto: obtenerRutaImagen(11),
  },
  {
    nombre: "Caja de madera rústica",
    descripcion: "Caja de madera con acabados rústicos, ideal para decorar espacios",
    precio: 13.0,
    stock: 22,
    foto: obtenerRutaImagen(12),
  },
];

// Formato de las cajas
const newCajaTemplate = {
  nombre: "",
  descripcion: "",
  precio: 0,
  stock: 0,
  foto: null,
};

// Variables reactivas
const isAddingNewCaja = ref(false);
const selectedCaja = ref(null);
const selectedImage = ref('');
const editMode = ref(false);
const showDeleteConfirm = ref(false);
const cajaToDelete = ref(null);
const showError = ref(false);
const searchQuery = ref("");
const newCaja = reactive({ ...newCajaTemplate });
const cajas = reactive([...initialCajas]);

/* Computadas */
const filteredCajas = computed(() =>
  cajas.filter((caja) =>
    caja.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

/* Funciones generales */
// Cambiar entre crear y ver caja
const toggleAddNewCaja = () => {
  isAddingNewCaja.value = !isAddingNewCaja.value;
  resetNewCajaForm();
  selectedCaja.value = null;
};

// Resetear Formulario
const resetNewCajaForm = () => {
  Object.assign(newCaja, { ...newCajaTemplate });
  selectedImage.value = null;
};

// Seleccionar caja
const selectCaja = (caja) => {
  if (!isAddingNewCaja.value && !editMode.value) {
    selectedCaja.value = caja;
    if (caja.foto) {
      selectedImage.value = caja.foto;
    }
  }
};

// Cancela el añadir caja
const cancelAddCaja = () => {
  resetNewCajaForm();
  isAddingNewCaja.value = false;
};

// Formatear precio a dos decimales
const formatPrice = () => {
  if (newCaja.precio !== null && newCaja.precio !== undefined && !isNaN(newCaja.precio) && parseFloat(newCaja.precio) >= 0) {
    newCaja.precio = parseFloat(newCaja.precio).toFixed(2);
  } else {
    newCaja.precio = '0.00'; 
  }
};

// Validar precio
const validatePrice = (event) => {
  let value = event.target.value;
  let regex = /^\d*\.?\d{0,2}$/;

  // Verificar que el valor sea un número válido y no negativo
  if (regex.test(value) && parseFloat(value) >= 0) {
    newCaja.precio = value;
  } else {
    event.target.value = newCaja.precio; // Restaurar el valor original si es inválido
  }
};

// Formatear stock 
const formatStock = () => {
  // Asegurarse de que el stock sea un número entero no negativo
  if (newCaja.stock !== null && newCaja.stock !== undefined && !isNaN(newCaja.stock) && parseInt(newCaja.stock) >= 0) {
    newCaja.stock = parseInt(newCaja.stock);
  } else {
    newCaja.stock = 0;  // Si el stock es inválido, ponerlo a 0
  }
};

// Validar stock
const validateStock = (event) => {
  let value = event.target.value;
  let regex = /^\d*$/;  

  // Validar que el valor sea un número entero no negativo
  if (regex.test(value) && parseInt(value) >= 0) {
    newCaja.stock = value;
  } else {
    event.target.value = newCaja.stock;  // Restaurar el valor original si es inválido
  }
};

// Guardar nueva caja
const saveNewCaja = () => {
  // Validar que no haya campos vacíos o valores incorrectos
  if (
    !newCaja.nombre.trim() || 
    !newCaja.descripcion.trim() || 
    newCaja.precio <= 0 || 
    newCaja.stock < 0 || 
    !newCaja.foto
  ) {
    showError.value = true;
    setTimeout(() => (showError.value = false), 3000);
    return;
  }

  formatStock();
  formatPrice();
  cajas.push({ ...newCaja }); 
  resetNewCajaForm(); 
  isAddingNewCaja.value = false;
};

// Guardar caja editada
const saveCaja = () => {
  if (selectedCaja.value) {
    // Asegurarse de que el precio esté bien formateado
    selectedCaja.value.precio = parseFloat(selectedCaja.value.precio).toFixed(2);
    
    // Validar y formatear el stock
    selectedCaja.value.stock = parseInt(selectedCaja.value.stock) >= 0 ? parseInt(selectedCaja.value.stock) : 0;

    // Encontrar la caja en el array y actualizarla
    const index = cajas.indexOf(selectedCaja.value);
    if (index !== -1) {
      cajas[index] = { ...selectedCaja.value };
    }
    editMode.value = false;
    resetNewCajaForm(); // Resetear formulario
  }
};

// Abrir ventana para elminar
const openDeleteConfirm = (caja) => {
  cajaToDelete.value = caja;
  showDeleteConfirm.value = true;
};

// Cerrar ventana para elminar
const closeDeleteConfirm = () => {
  showDeleteConfirm.value = false;
};

// Confirmar borrar caja
const confirmDeleteCaja = () => {
  if (cajaToDelete.value) {
    const index = cajas.indexOf(cajaToDelete.value);
    if (index !== -1) {
      cajas.splice(index, 1);
    }
    selectedCaja.value = null;
    editMode.value = false;
  }
  showDeleteConfirm.value = false;
};

// Manejar imagenes
const onImageSelected = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    selectedImage.value = imageUrl;
    if (isAddingNewCaja.value) {
      newCaja.foto = imageUrl;
    } else if (editMode.value && selectedCaja.value) {
      selectedCaja.value.foto = imageUrl;
    }
  }
};

// Función para obtener las imágenes de las cajas
function obtenerRutaImagen(cajaId) {
  return new URL(`../../assets/icons/Cajas/Caja_${cajaId}.jpg`, import.meta.url).href;
}
</script>

<!-- Estilos -->
<style scoped>
/* Fuentes */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Josefin+Sans:wght@400;600&display=swap');

/* Fondo de Pantalla */
main {
  background-image: url("../../assets/icons/Fondo_de_Pantalla/FondoPantalla.png");
  background-size: cover;
  background-position: center;
}

/* Barra de scroll */
section>div {
  scrollbar-width: auto;
  scrollbar-color: #946ad8 #E0D3F5;
}

/* Estilo para navegadores Webkit */
section>div::-webkit-scrollbar {
  width: 8px;
}

section>div::-webkit-scrollbar-thumb {
  background-color: #946ad8;
  border-radius: 4px;
}

section>div::-webkit-scrollbar-track {
  background-color: #E0D3F5;
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

/* Estilos Responsivos */
@media (max-width: 768px) {
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

/* Estilos para la imagen de la caja */
label[for="image-upload"] {
  display: inline-block;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border: 1px solid #ddd;
}

label[for="image-upload"]:hover {
  transform: scale(1.05);
}

.image-preview {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border: 1px solid #ddd;
}
</style>