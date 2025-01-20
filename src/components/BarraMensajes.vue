<template>
  <div  class="alert alert-warning alert-dismissible fade show" role="alert">
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    {{dataStore.lst_mensajes}}
  </div>
</template>

<script setup>
  import { sicodeStore } from '@/stores/sicodes';
  const dataStore = sicodeStore();
</script>
