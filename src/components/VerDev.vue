<template>
  <table class="table">
    <tr><td>dataStore.codbar_ok</td>    <td>{{dataStore.codbar_ok }}</td></tr>
    <tr><td>dataStore.parametros</td>   <td>{{ dataStore.parametros }}</td></tr>
    <tr><td>dataStore.agrupacion</td>   <td>{{ dataStore.agrupacion }}</td></tr>
    <tr><td>dataStore.id_contenedor</td><td>{{ dataStore.id_contenedor }}</td></tr>
    <tr><td>dataStore.id_canastilla</td><td>{{ dataStore.id_canastilla }}</td></tr>
    <tr><td>dataStore.conitems</td>     <td>{{ dataStore.conitems }}</td></tr>
    <tr><td>dataStore.id_pedido</td>    <td>{{ dataStore.id_pedido }}</td></tr>
    <tr><td>dataStore.ped_actual</td>   <td>{{ dataStore.ped_actual }}</td></tr>
    <tr><td>dataStore.lst_pedidos</td>  <td>{{ dataStore.lst_pedidos }}</td></tr>
    <tr><td>dataStore.lst_item</td>     <td>{{ dataStore.lst_item }}</td></tr>
    <tr><td>dataStore.item_actual</td>  <td>{{ dataStore.item_actual }}</td></tr> 
  </table>
</template>

<script setup>
import { sicodeStore } from '@/stores/sicodes'
const dataStore = sicodeStore()

</script>