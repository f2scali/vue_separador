<template>
    <div class="row border border-success ml-2 mr-1" v-if="dataStore.id_contenedor>0">
    <div class="col-md-3">
        <div v-if ="dataStore.id_canastilla>0">
            <i  class="fa fa-shopping-basket fa-5x text-success mt-3"></i>
            {{ Fmt_Canastailla }}
        </div>
        <div v-else>
            <div v-if ="dataStore.id_contenedor>0">
                <div class="col-centrol mb-3">
                    <div><i class="fa fa-shopping-cart fa-5x text-success mt-3"></i></div>
                    <i class="fa fa-2x fa-barcode"></i>
                    <div class="letra-mitad">{{ Fmt_Contendor }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col mt-4">
        <h5 ><label class="text-success">Nro. Pedido :</label>{{dataStore.ped_actual.nropedido}}  </h5>
        <h6>{{dataStore.ped_actual.cliente}} </h6>
        <h5><label class="text-success">stage: </label>{{dataStore.ped_actual.stage}}  </h5>
        <h5><label class="text-success">Separador: </label>{{dataStore.ped_actual.separador}} </h5>
    </div>
</div>
</template>

<script setup>
import { computed } from 'vue';
import { sicodeStore } from '@/stores/sicodes';
const dataStore = sicodeStore();

const Fmt_Contendor = computed(() => {
    // let resultado = dataStore.id_contenedor.toString().padStart(9, '0') + dataStore.id_pedido.toString().padStart(9, '0')
    let resultado = dataStore.id_contenedor.toString().padStart(9, '0') + '...'
  return resultado
})
const Fmt_Canastailla = computed(() => {
    // let resultado = dataStore.id_contenedor.toString().padStart(9, '0') + dataStore.id_pedido.toString().padStart(9, '0')
    let resultado = dataStore.id_canastilla.toString().padStart(10, '0')
  return resultado
})


</script>

<style scoped>
.col-centrol {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
  }

.letra-mitad {
    font-size: .8rem
}
  </style>