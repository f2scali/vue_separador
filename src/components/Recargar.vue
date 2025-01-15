<template>
<button @click="BorrarCache" class="btn btn-sm">Actualizar</button>
</template>

<script setup>
 const BorrarCache=()=>{      // Borrar caché del navegador
      window.location.reload(true);
    }

</script>