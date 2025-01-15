<template>
<div class="card border border-primary">
  <div class="card-header text-white bg-primary py-2"><h3 class="py-0">Seleccion del Pedido</h3></div>
  <div class="card-body">
    <div class='d-flex mb-3'>
      <div>Estados:</div>
      <div class='bg-primary px-2 py-2 mx-1'>Primer pedido</div>
      <div class='bg-secondary px-2 py-2 mx-1'>Pedido sin separar</div>
      <div class='bg-info px-2 py-2 mx-1'>Separando por otros</div>
      <div class='bg-warning  px-2 py-2 mx-1'>Pedido en pausa</div>
    </div>
      <div
          class="alert alert-dark"
          v-for="ruta in dataStore.rutas" :key="ruta" 
      >
        {{ ruta}}
        <div class="row">
            <div 
                v-for="(item, index) in dataStore.lst_pedidos.filter((item) => item.ruta === ruta)"
                :key="item.idpedido"
                class="col-md-3 ml-2 mt-2 btn"
                :class="{'bg-primary': index === 0, 
                        'bg-secondary': index > 0,
                        'bg-info':item.pedidoestado==6,
                        'bg-warning':item.estadosep=='A',
                        'text-black': index > 0
                        }"

                @click="SeleccionPedido(item.idpedido, index)"
                >
                    <h5>{{item.nropedido}}</h5>
                    <li class="fa fa-th-list mr-1"
                        title="Nro Items a separar"
                    ></li>
                    {{ item.contador}}
            </div>
        </div>
      </div>
    </div>
</div>
</template>

<script setup>
    import { sicodeStore } from '@/stores/sicodes';
    const dataStore = sicodeStore();


    const SeleccionPedido = (item, index) =>{
        if (dataStore.parametros.soloprimero & index!=0){
            alert('Solo se puede seleccionar el pedido en color azul')
            return
        }
        dataStore.SelPedido(item)
    }  

</script>
