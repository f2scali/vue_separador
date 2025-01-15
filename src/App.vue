<template>
  <!-- modals -->
  <ModalParcial v-if="dataStore.parcial" />
  <ModalGrupoTotal v-if="dataStore.agrupacion > 0 && dataStore.agrupacion < 3" />
  <!-- componentes -->

  <div>
    <!-- Botón que dispara el mensaje flotante 

    <button @click="showFloatingMessage">Mostrar mensaje</button>
    -->

    <!-- Mostrar el mensaje flotante cuando se activa el evento -->
    <FloatingMessage ref="floatingMessage" message="¡Evento activado! ¡Mensaje flotante!" />
  </div>

  <SeleccionPedido v-if="dataStore.id_pedido == 0  && dataStore.mult_Activo==false" />
  <!--
  SeleccionPedidoMul v-if="dataStore.mult_pedidos.length > 0 && dataStore.mult_Activo==false "/>
  -->
  <div class="d-flex justify-content-between">
    <BarraComandos v-if="dataStore.id_contenedor > 0 " />
  </div>
  <div class="row border" v-if="dataStore.id_contenedor > 0">
    <div class="col-md-5">
      <SepDescPedido />
    </div>
    <div class="col-md-7">
      <SepararItem />
    </div>
  </div>
  
  <Mult_Separacion v-if="dataStore.mult_Activo" />
  <SepPedientes v-if="dataStore.lst_item.length > 0" />

  <VerDev v-if="dataStore.actdev" />
  <div>
      version 4.0.0
      <Recargar />
    </div>
</template>


<script setup>
import { onMounted } from 'vue'
import { sicodeStore } from '@/stores/sicodes'
import FloatingMessage from './components/FloatingMessage.vue'
import SeleccionPedido from './components/SeleccionPedido.vue'
import SeleccionPedidoMul from './components/SeleccionPedidoMul.vue'
import Mult_Separacion from './components/Mult_Separacion.vue'
import ModalGrupoTotal from './components/ModalGrupoTotal.vue'
import ModalParcial from './components/ModalParcial.vue'
import SepDescPedido from './components/SepDescPedido.vue'
import SepPedientes from './components/SepPedientes.vue'
import BarraComandos from './components/BarraComandos.vue'
import SepararItem from './components/SepararItem.vue'
import VerDev from './components/VerDev.vue'
import Recargar from './components/Recargar.vue'
const dataStore = sicodeStore()


onMounted(() => {
  dataStore.CarguePedidos()
  dataStore.Mult_CarguePedidos()
})




</script>



<style scoped></style>
