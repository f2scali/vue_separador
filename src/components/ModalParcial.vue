<template>
    <div>
      <div  class="modal">
        <div class="modal-content">
            <div class="card border-primary mb-3">
                <div class="card-header">
                    <h2>Contenedor Lleno ??</h2>
                </div>
                <div class="card-body">
                    <p>Esto cierra el contendor actual, y la cantidad restante queda pendiente por separar</p>
                </div>
                <div class="card-footer bg-transparent border-success ">
                    <div class="d-flex justify-content-end">
                        <div class="btn-group" role="group" aria-label="botones">
                            <button type="button" 
                                class="btn btn-danger mr-1"
                                @click="ParcialSi">SI
                            </button>
                            <button type="button" 
                                class="btn btn-primary mr-1"
                                @click="ParcialNo">NO
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
    import { ref } from 'vue';
    import { sicodeStore } from '@/stores/sicodes';
    const dataStore = sicodeStore();
    const activar=ref(false)
    const ParcialSi = () =>{
        dataStore.Guardar(true)
        dataStore.parcial=false
    }
    const ParcialNo = () =>{
        dataStore.Guardar(false, 1)
        dataStore.parcial=false
    } 
    

    const cerrarModal = ()=>{
        dataStore.parcial=false
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
  ./ModalGrupoTotal.vue