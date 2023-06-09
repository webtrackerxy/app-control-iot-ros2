<template>
    <div>
      <p>Message: {{ message }}</p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  
  export default defineComponent({
    name: 'RosData',
    setup() {
      const message = ref("");
      let eventSource: EventSource;
  
      onMounted(() => {
        eventSource = new EventSource(process.env.VUE_APP_HOST_URL + '/api/ros'); // replace with your Next.js API URL
  
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          message.value = data;
        };
      });
  
      onUnmounted(() => {
        eventSource.close();
      });
  
      return { message };
    }
  });
  </script>
  