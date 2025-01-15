<template>
<div class="ml-2">
    <button
        @click="Regreso" 
        class="btn btn-success mr-1">
        <i class="fa fa-arrow-left" aria-hidden="true"></i>
        Regresar
    </button>
    <button class="btn btn-primary mr-1">
        <i class="fa fa-print" aria-hidden="true"></i>
        Reimprimir
    </button>
    <button 
        class="btn btn-warning" 
        v-if="dataStore.conitems"
        @click="NuevoContenedor"
        >
        <i class="fa fa-tag" aria-hidden="true"></i>
        + Contenedor
    </button>
</div>

</template>

<script setup>
import { sicodeStore } from '@/stores/sicodes';
const dataStore = sicodeStore()

const NuevoContenedor=()=>{
    dataStore.NuevoContenedor()
}
const Regreso =()=>{
    dataStore.Inicio()
}

</script>