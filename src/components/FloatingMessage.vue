
<template>
  <div v-if="isVisible" class="floating-message">
    {{ message }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Props para recibir el texto del mensaje
const props = defineProps({
  message: String
});

// Estado para controlar la visibilidad del mensaje
const isVisible = ref(false);

// Función para mostrar el mensaje
const showMessage = () => {
  isVisible.value = true;
  setTimeout(() => {
    isVisible.value = false;
  }, 4000); // Desaparece después de 4 segundos
};

// Referencia al componente flotante
const floatingMessage = ref(null);
// Función para activar el mensaje flotante
const showFloatingMessage = () => {
  floatingMessage.value.showMessage();
};



</script>

<style scoped>
.floating-message {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeInOut 4s ease-in-out;
}

@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>

