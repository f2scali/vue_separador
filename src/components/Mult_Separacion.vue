<template>
  <div class="row">
    <div class="col-6">
      <label>Leer Código Barras</label>
      <div class="d-flex">
        <input
          type="text"
          class="form-control"
          @keydown.enter="VerficarCodigo"
          v-model="CodBarItem"
          :disabled="ActCantidad"
        />
        <button
          v-if ="ActCantidad"
          @click="LimpiarLectura"
        >X</button>
      </div>
    </div>
    <div 
      class="col-5"
      v-if="ActCantidad"
    >
      <label>Cantidad</label>
      <input 
        type="number"
        class="form-control"
        v-model="CantItem"
        min="1"
        @keydown.enter="EnvioCantidad"
      />

    </div>

  </div>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th colspan="4">
            <h4>Lineas Pendientes: {{ dataStore.mul_lineasPend}}</h4>
          </th>
          <th colspan="2">Cantidad</th>
        </tr>
        <tr>
          <th>Referencia</th>
          <th>Descripción</th>
          <th>Marca</th>
          <th>Und. Med</th>
          <th>Pedida</th>
          <th>Separada</th>
          <th>Ctrl</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in dataStore.mult_items"
          :key="item.id"
          :class="{ resaltado: item.resaltado,'text-success': item.separada }"
          @animationend="item.resaltado = false"
        >
          <td>{{ item.referencia }}</td>
          <td>{{ item.decripcion }}</td>
          <td>{{ item.marca }}</td>
          <td>{{ item.um }}</td>
          <td>{{ item.cantped }}</td>
          <td>{{ item.cansep1 }}</td>
          <td>
            <button
              title="No hay existencia"
              @click="CerrarItem(item.id)"
              v-if="item.separada==false"
            >
              X
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { sicodeStore } from '@/stores/sicodes';

const dataStore = sicodeStore();
const CodBarItem = ref('');
const CantItem = ref(1);
const ActCantidad=ref(false)

const VerficarCodigo = async () => {
  await dataStore.Mult_itemSeparado(CodBarItem.value);
  if (dataStore.mult_actvarCant){
    ActCantidad.value=true
    CantItem.value=1
  }else{
    CodBarItem.value=""
  }
};
const EnvioCantidad = async () =>{
  const calculo = dataStore.mult_item.cantped - dataStore.mult_item.cansep1
  if (CantItem.value > calculo ){
    alert(`No se puede ingresar una cantidad mayo a ${calculo}`)
    return
  }
  await dataStore.Mult_ItemCantSep(CantItem.value)
  CantItem.value=1
  CodBarItem.value=""
  ActCantidad.value=false
}

const CerrarItem = (iditem) => {
  if (!confirm('¿Está seguro? este item no queda con más separación')) {
    return;
  }
  alert('Cerrar');
};

const LimpiarLectura = () =>{
    CantItem.value=1
    CodBarItem.value=""
    ActCantidad.value=false
    dataStore.LimpiarMult()
  }

onMounted(() => {
  nextTick(() => {
    const input = document.querySelector('input[type="text"]');
    if (input) {
      input.focus();
    }
  });
});
</script>

<style scoped>
.resaltado {
  animation: resaltado 1s ease-in-out;
  background-color: #fdfd96;
}

@keyframes resaltado {
  0% {
    background-color: #fff;
  }
  50% {
    background-color: #fdfd96;
  }
  100% {
    background-color: #fff;
  }
}
</style>

