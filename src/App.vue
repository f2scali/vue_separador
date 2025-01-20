<template>
  <MarcadordeCarga v-if="dataStore.procesando" />
   <!-- modals -->
  <ModalParcial v-if="dataStore.parcial" />
  <ModalGrupoTotal v-if="dataStore.agrupacion > 0 && dataStore.agrupacion < 3" />
  <ModalLimiteAdicional v-if= "dataStore.modal_limite" />
  <!-- componentes -->
 <BarraMensajes />
  <SeleccionPedido v-if="dataStore.act_sep" />

  <SeleccionPedidoMul class="mt-2" v-if="dataStore.act_mult"/>
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
  
  <SepPedientes v-if="dataStore.lst_item.length > 0" />

  <Mult_Separacion v-if="dataStore.pantalla==4" />

  <div>
      version 4.0.0
      <Recargar />
    </div>
</template>


<script setup>
import { onMounted } from 'vue'
import { sicodeStore } from '@/stores/sicodes'
import MarcadordeCarga from './components/MarcadordeCarga.vue'
import ModalLimiteAdicional from './components/ModalLimiteAdicional.vue'
import BarraMensajes from './components/BarraMensajes.vue'
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
 dataStore.Inicio() 
})

</script>



<style scoped></style>
