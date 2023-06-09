<template>
  <div id="app">
    <AppHeader/>
    <LedControl/>
    <RosData />
    <RealTimeChart  />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppHeader from "./components/AppHeader.vue"
import RosData from "./components/RosData.vue";
import RealTimeChart from './components/RealTimeChart.vue';
import LedControl from './components/LedControl.vue';

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    RosData,
    LedControl,
    RealTimeChart,
  },

});
</script>
