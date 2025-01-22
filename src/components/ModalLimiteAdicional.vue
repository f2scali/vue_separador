
<template>
    <div>
      <div  class="modal">
        <div class="modal-content">
            <div class="card border-primary mb-3">
                <div class="card-header text-center">
                  <h3> La referencia: {{dataStore.mult_item.referencia}} ya cumplio con el pedido </h3>
                </div>
                <div class="card-body">
                  <div class="d-flex">
                    <div class="mr-3 mt-2 text-center" v-show="!adicionarSi" >
                      Desea adicionar una cantidad mas? 
                      <button class="btn btn-danger mr-3" @click="MuestreSi">Si</button>
                      <button class="btn btn-primary" @click="cerrarModal">No</button>
                    </div>
                    <div  v-show="adicionarSi">
                      <div class="row">
                        <div class="col-8">
                          Actualmente tienes separado:
                          <span class="text-danger mx-2">
                            {{dataStore.mult_item.cansep1}}
                          </span>
                           Ingrese la cantidad adiciona:
                        </div>
                        <div class="col-4">
                          <input  class="form-control" type="number" v-model="cantidad"/>
                        </div>
                      </div>
                    </div>
                    
                  </div>

                </div>
                <div class="card-footer bg-transparent border-success ">
                    <div class="d-flex justify-content-end">
                        <div class="btn-group" role="group" aria-label="botones">
                          <button 
                            class="btn btn-success mr-3"
                            v-show="adicionarSi"
                            @click="guardarCantidad"
                            >
                            Guardar
                          </button>
                          <button type="button" 
                            class="btn btn-warning mr-1"
                            @click="cerrarModal">SALIR
                           </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>
  
<script setup>
    import { ref } from 'vue'
    import { sicodeStore } from '@/stores/sicodes'
    const dataStore = sicodeStore();
    const adicionarSi=ref(false)
    const cantidad=ref(1)

    const cerrarModal = ()=>{
        adicionarSi.value=false
        dataStore.modal_limite=false
        cantidad.value=1
    }

    const MuestreSi = () =>{
      adicionarSi.value=true
    }

    const guardarCantidad=()=>{
    if (cantidad.value<1){
      alert("La cantidad debe ser mayor de 0")
      cantidad.value=1
      return
    }
    dataStore.mult_GuardarAdcional(cantidad.value)
    cerrarModal()
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
  width: 30rem;
}
</style>
