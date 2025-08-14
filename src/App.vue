<script setup>
import HelloWorld from './components/HelloWorld.vue'
import DarePicker from 'primevue/datepicker'
import Select from 'primevue/select';
import PanelMenu from 'primevue/panelmenu';

</script>

<template>
  <div>
    <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Select a City" />
    <DarePicker/>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
