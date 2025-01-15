<template>
    <div>
      <div  class="modal">
        <div class="modal-content">
            <div class="card border-primary mb-3">
                <div class="card-header text-center">
            <h5>Ubicaciones Adicionales para:{{dataStore.item_actual.desc}}</h5>
                </div>
                <div class="card-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Bodega</th>
                        <th>Piso</th>
                        <th>Zona</th>
                        <th>Fila</th>
                        <th>Prof</th>
                        <th>Alt</th>
                        <th>Descr</th>
                      </tr>
                    </thead>
                    <tbody> 
                      <tr v-for="item in dataStore.lst_otra"
                          :key="item.id">
                          <td>{{item.bodega}}</td>
                          <td>{{item.piso}}</td>
                          <td>{{item.zona}}</td>
                          <td>{{item.fila}}</td>
                          <td>{{item.prof}}</td>
                          <td>{{item.alt}}</td>
                          <td>{{item.desc}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-footer bg-transparent border-success ">
                    <div class="d-flex justify-content-end">
                        <div class="btn-group" role="group" aria-label="botones">
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

    const cerrarModal = ()=>{
        dataStore.modal_otra_ub=false
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
