<template>
  <ModalOtrasUb v-if="dataStore.modal_otra_ub" />
  <button class="btn btn-info btn-sm" @click="Buscar">+</button>
</template>
<script setup>
import { sicodeStore } from '@/stores/sicodes'
import ModalOtrasUb from './ModalOtrasUb.vue'
const dataStore = sicodeStore()

const Buscar=() => {
    dataStore.OtrasUbicaciones()
    dataStore.modal_otra_ub=true
  }

</script>


