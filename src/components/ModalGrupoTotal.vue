<template>
    <div class="modal">
        <div class="modal-content">
            <div class="card border-primary mb-3">
                <div class="card-header">
                    <h5>Modo de agrupación</h5>
                </div>
                <div class="card-body">
                    <div class="row border my-2">
                        <div class="col-6" v-if="dataStore.agrupacion == 1">
                            <label class="form-control" for="canasta">
                                <input type="radio" id="canasta" v-model="selectedOption" 
                                        value="canasta"
                                        class="mr-2"
                                        >
                                Canastilla
                                <i class="fa fa-shopping-basket fa-2x text-success" aria-hidden="true"></i>
                                
                                <div v-if="selectedOption === 'canasta'">
                                    <input type="text"
                                    class="form-control" 
                                    id="codbar"
                                    placeholder="codigo barras<enter>"
                                        @change="BuscarCanasta" 
                                        v-model="dataStore.id_canastilla">
                                    </div>
                                </label>
                            </div>
                            <div class="col-6">
                                <label class="form-control" for="contenedor">
                                    <input type="radio" id="contenedor" class="mr-2" 
                                    v-model="selectedOption" value="contenedor">
                                    Contendor
                                    <li class="fa fa-shopping-cart fa-2x text-success"></li>
                                    <div v-if="selectedOption === 'contenedor'">
                                        <button class="btn btn-success" @click="UsarContendor">Seleccionar</button>
                                    </div>

                                </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import { ref } from 'vue';
import { sicodeStore } from '@/stores/sicodes';
const dataStore = sicodeStore();

const selectedOption = ref(null)
const BuscarCanasta=()=>{
    // alert(dataStore.id_canastilla)
    dataStore.AsignarCasilla()
}
const UsarContendor=()=>{
    dataStore.AsignarContendor()
    
}
</script>


<style scoped>
/* Estilos básicos para el modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 50rem;
}
</style>
