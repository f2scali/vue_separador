<template>
  <div>
    <select>
      <option v-for="separador in dataStore.lst_separadores"
              @key="separador.id"
      >
        {{separador.username}}
      </option>
  </div>
</template>

<script setup>
 import {ref, onUnmounted} from 'vue'
 import { sicodeStore } from '@/stores/sicodes';
 const dataStore = sicodeStore();

 onUnmounted(() => {dataStore.ListarSeparadores})

</script>

<style scoped>
  
</style>
