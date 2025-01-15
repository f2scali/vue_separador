<template>
  <div class="row border border-success ml-2 mr-1 px-2 py-2" v-if="dataStore.item_actual">
    <div class="col-12 border mb-1 pb-2">
      <label class="text-success">Descripción:</label> {{ dataStore.item_actual.desc }}
      <div class="bg-danger text-white" v-if="dataStore.item_actual.anexo.length > 0">
        <i class="fa fa-bell mx-3 p-2" aria-hidden="true"></i>
        {{ dataStore.item_actual.anexo }}
      </div>
    </div>
    <div class="col-12 col-md-7 border mb-1">
      <label class="text-success">Zona :</label> {{ dataStore.item_actual.bgzona }}
    </div>
    <div class="col-12 col-md-5 border mb-1">
      <label class="text-success">Ubicación:</label>{{ dataStore.item_actual.ubicacion }}
      <UbicAdicional /> 
    </div>
    <div 
      class="col-12 col-md-6 border mb-1"
      v-if="dataStore.parametros.ref_item"
    >
      
      <label class="text-success mr-3">Codigo/item : </label>{{ dataStore.item_actual.codigo }}
    </div>
    <div 
      class="col-12 col-md-6 border mb-1"
      v-if="!dataStore.parametros.ref_item"
    >
      <label class="text-success mr-3">Referencia : </label>{{ dataStore.item_actual.ref }}
    </div>
    <div class="col-12 col-md-6 border mb-1 d-flex">
      <label class="text-success mr-3">Codbar:</label>
      <input type="text" class="form-control" @change="VerficarCodigo" v-model="CodBarItem" v-focus ref="inputcod"
        :disabled="dataStore.codbar_ok === true">
    </div>
    <div class="col-12 col-md-6 border mb-1 py-2 d-flex flex-column">
      <label class="text-success">Cantidad a separar:</label>
      <h3>
        <span class="badge badge-secondary text-center">{{ dataStore.item_actual.cantidad }}</span>
      </h3>
      <!-- <div class="bg-danger text-white"> Lorem ipsum dolor sit consectetur</div> -->
    </div>
    <div class="col-12 col-md-6 border mb-1">
      <label class="text-success mr-3" v-if="dataStore.codbar_ok">Cantidad:</label>
      {{ dataStore.item_actual.um }}
      <div class="d-flex" v-if="dataStore.codbar_ok">
        <input type="number" class="form-control mr-2 mb-1" v-model="dataStore.item_actual.separada" :min="0"
          :max="dataStore.item_actual.cantidad" ref="inputRef">
        <button class="btn btn-success ml-2 mb-1" @click="VerficarCantidad">Procesar</button>
      </div>
      <div class="col-1 col-md-1">
      </div>
    </div>
    <button class="btn btn-primary" v-if="dataStore.lst_item.length > 0" @click="Siguiente">Siguiente</button>
  </div>
</template>
<script setup>

import { ref, nextTick } from 'vue';
import { sicodeStore } from '@/stores/sicodes';
import UbicAdicional from './UbicAdicional.vue'
const dataStore = sicodeStore();
const CodBarItem = ref('')
const inputRef = ref(0);
const inputcod = ref(0);

const VerficarCodigo = () => {
  if (dataStore.parametros.solocodigobar) {     //si el codigo es igual al referencia
    dataStore.ValidaCodigo(CodBarItem.value)
  } else {
    if (dataStore.item_actual.ref == CodBarItem.value) {
      dataStore.codbar_ok = true
      nextTick(() => {
        inputRef.value.focus()
        inputRef.value.select()
      })
    }
  }
}

const VerficarCantidad = () => {
  // alert(dataStore.ItemActual.separada)
  if (dataStore.item_actual.separada < 0) {
    alert('No se aceptan nro negativos')
  }
  else if (dataStore.item_actual.separada > dataStore.item_actual.cantidad) {
    alert('la cantidad separada no puede ser mayor a la cantidad solicitada!')
  }
  else if (dataStore.item_actual.separada == 0) {
    let separar = confirm("¿No va ha separar mercancia?");
    if (separar) {
      dataStore.Guardar()
      CodBarItem.value = ''
      inputcod.value.focus()
    }

  }
  else if (dataStore.item_actual.separada < dataStore.item_actual.cantidad) {
    dataStore.parcial = true
  }
  else {
    dataStore.Guardar()
    CodBarItem.value = ''
    inputcod.value.focus()
  }

}

const Siguiente = () => {
  dataStore.Siguiente()
  CodBarItem.value = ''
  inputcod.value.focus()

}

const vFocus = {
  mounted: (el) => el.focus()
}

</script>
