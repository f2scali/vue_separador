<template>
  <div class="card border border-primary">
    <div class="card-header text-white bg-primary py-2"><h3 class="py-0">Seleccion MultiPedido</h3></div>
    <div class="card-body">
      <div class='d-flex mb-3'>
        <div>Estados:</div>
        <div class='bg-primary px-2 py-2 mx-1'>Pedido sin separar</div>
        <div class='bg-warning  px-2 py-2 mx-1'>Pedido en proceso</div>
      </div>
      <div 
        v-for="pedido in dataStore.mult_pedidos"
        :key=pedido.pedido
      >
        <button 
          class="btn btn-primary mb-1"
          :title="'Lineas: ' + pedido.lineas + ' - Items: ' + pedido.items"
          @click="SeleccionPedido(pedido.idpedido)"
        >
        {{pedido.nropedido}} - {{pedido.valor}} </button>
      </div>
    </div>
  </div>
 
</template>

<script setup>
    import { sicodeStore } from '@/stores/sicodes';
    const dataStore = sicodeStore();


    const SeleccionPedido = (pedido) =>{
      console.log(pedido)
      dataStore.Mult_SelPedido(pedido)
    }  

</script>
