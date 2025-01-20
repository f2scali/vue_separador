<template>

  
  <div class="d-flex ml-2 mb-1">
    <button class="btn btn-warning"
            @click="Regresar()"
      >
      Regresar
    </button>
    <h4 class="ml-2 mt-2">
      nro.Pedido:{{nroPedido}}
      <li class="fa fa-th-list mr-1" title="Nro lineas a separar"></li>
      Lineas Pendientes: {{ dataStore.mul_lineasPend }}
    </h4>
  </div>
  <div class="row mx-1 mb-2">
    <div class="col-12 col-md-6 bg-success pb-2">
      <label class="text-white mt-2">Leer Código Barras</label>
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
  
  <div class="table-container mx-1">
    <table class="table">
      <thead>
        <tr>
          <th class="sticky-header sticky-column">Ctrl</th>
          <th class="sticky-header sticky-column">Referencia</th>
          <th class="sticky-header">Descripción</th>
          <th class="sticky-header">Marca</th>
          <th class="sticky-header">Und. Med</th>
          <th class="sticky-header">Pedida</th>
          <th class="sticky-header">Separada</th>
          <th class="sticky-header">Adicional</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in dataStore.mult_items"
          :key="item.id"
          :class="{ 
            resaltado: item.resaltado, 
            'text-success': item.separada,
            'text-danger': item.cansep1 === 0 && item.separada,
            'text-warning': item.cant_add >0
          }"
          @animationend="item.resaltado = false"
        >
          <td class="sticky-column">
            <button
              title="No hay existencia"
              @click="CerrarItem(item.id, index)"
              v-if="item.separada === false"
            >
              X
            </button>
          </td>
          <td class="sticky-column">{{ item.referencia }}</td>
          <td>{{ item.decripcion }}</td>
          <td>{{ item.marca }}</td>
          <td>{{ item.um }}</td>
          <td>{{ item.cantped }}</td>
          <td>{{ item.cansep1 }}</td>
          <td>{{ item.cant_add }}</td>
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
const nroPedido=ref('Nro')

let intervalo = null


//Envio 
const VerficarCodigo = async () => {
  await dataStore.Mult_itemSeparado(CodBarItem.value);
  if (dataStore.mult_actvarCant){
    ActCantidad.value=true
    CantItem.value=1
  }else{
    CodBarItem.value=""
  }
};
//cantidad ingresas manual con el item especial.....
const EnvioCantidad = async () =>{
  const calculo = dataStore.mult_item.cantped - dataStore.mult_item.cansep1
  if (CantItem.value > calculo ){
    alert(`No se puede ingresar una cantidad mayor a ${calculo}`)
    return
  }
  await dataStore.Mult_ItemCantSep(CantItem.value)
  CantItem.value=1
  CodBarItem.value=""
  ActCantidad.value=false
}

const CerrarItem = (iditem, index) => {
  if (!confirm('¿Está seguro? este item no queda con más separación')) {
    return;
  }
  dataStore.mult_FinalizarItem(iditem, index) 
};

const Regresar=()=>{
  dataStore.Inicio()
}


const LimpiarLectura = () =>{
    CantItem.value=1
    CodBarItem.value=""
    ActCantidad.value=false
    dataStore.LimpiarMult()
  }

const iniciarOrdenamiento = () => {
  intervalo = setInterval(() => {
    const terminado = dataStore.Mult_OrdenarLista(); // Llama a la función del store
    if (terminado) {
      clearInterval(intervalo); // Detener el intervalo si todo tiene fin=true
      console.log("No quedan elementos con fin=false. Intervalo detenido.");
    }
  }, 4000);
};

const NroPedido = ()=>{
  const buscar = dataStore.mult_pedidos.find(pedido => pedido.idpedido === dataStore.mult_idpedido)
  return buscar.nropedido
}

onMounted(() => {
    
  nextTick(() => {
    const input = document.querySelector('input[type="text"]');
    if (input) {
      input.focus();
    }
  })
  nroPedido.value =NroPedido()
  iniciarOrdenamiento()  
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

.table-container {
  height: calc(100vh - 220px); /* Ajusta el alto según tus necesidades */
  overflow: auto;
  border: 1px solid #ccc;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  border: 1px solid #ddd;
}

/* Encabezados fijos (fila superior) */
.sticky-header {
  position: sticky;
  top: 0; /* Se queda en la parte superior al hacer scroll */
  background: #f8f9fa; /* Fondo para distinguir los encabezados */
  z-index: 3; /* Mayor prioridad que las columnas */
}

/* Primera columna fija */
.sticky-column {
  position: sticky;
  left: 0; /* Se queda en el lado izquierdo al hacer scroll */
  background: #f8f9fb; /* Fondo blanco para que destaque */
  z-index: 2; /* Menor prioridad que los encabezados */
}

/* Segunda columna fija */
.sticky-column:nth-child(2) {
  left: 50px; /* Ajusta este valor al ancho real de la primera columna */

}

/* Combinación de encabezado y columna fija */
.sticky-header.sticky-column {
  z-index: 4; /* Mayor prioridad para las intersecciones */
}
</style>

