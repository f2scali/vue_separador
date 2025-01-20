<template>
  <div class="card border border-success">
    <div class="card-header text-white bg-success py-2"><h3 class="py-0">Seleccion MultiPedido</h3></div>
    <div class="card-body">
      <div class='d-flex mb-3'>
        <div>Estados:</div>
        <div class='bg-primary px-2 py-2 mx-1'>Pedido sin separar</div>
        <div class='bg-warning  px-2 py-2 mx-1'>Pedido en proceso</div>
      </div>
      <div class="row">
        <div
          class ="col-12 col-md-3"
          v-for="pedido in dataStore.mult_pedidos"
          :key=pedido.pedido
        >
          <button 
            class="btn btn-primary mb-1 btn-block"
            @click="SeleccionPedido(pedido.idpedido)"
          >
            <div>
              {{pedido.cliente}}
              <br>
              {{pedido.nropedido}}
            </div>
            <div class="bg-white text-primary">
            {{pedido.valor}}

            <li class="fa fa-th-list mr-1" title="Nro lineas a separar"></li>
            {{pedido.lineas}} 
            <li class="fa fa-th mr-1" title="Nro Items a separar"></li>
            {{pedido.items}}
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { sicodeStore } from '@/stores/sicodes';
    const dataStore = sicodeStore();

    const SeleccionPedido = (pedido) =>{
      dataStore.Mult_SelPedido(pedido)
    }  

</script>
