<template>
<div class="mt-3 border border-primary mx-3 p-3">
    <div class="d-flex align-items-center mb-2">
        <h6 class="pt-1 mr-2">Item Pendientes</h6> <button class="btn btn-secondary">{{dataStore.lst_item.length}}</button>
    </div>
    <table class="table table-striped table-bordered">
        <thead>
            <tr class="bg-secondary text-white">
                <th 
                    class="text-center"
                    v-if="dataStore.parametros.ref_item"
                >Referencia</th>
                <th 
                    class="text-center"
                    v-if="!dataStore.parametros.ref_item"
                >Codigo/item</th>
                <th class="text-center">Descripción</th>
                <th class="text-center">Cantidad</th>
                <th class="text-center">Bog. / zona</th>
                <th class="text-center">Ubicacion</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="registro in dataStore.lst_item"
                :key="registro.id">
                <td  v-if="dataStore.parametros.ref_item">{{registro.ref}}</td>
                <td  v-if="!dataStore.parametros.ref_item">{{registro.codigo}}</td>
                <td>{{registro.desc}}</td>
                <td class="text-right pr-4">{{registro.cantidad}}</td>
                <td>{{registro.bgzona}}</td>
                <td>{{registro.ubicacion}}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { sicodeStore } from '@/stores/sicodes';
    const dataStore = sicodeStore();

</script>
