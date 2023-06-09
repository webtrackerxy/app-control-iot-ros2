<template>
  <div>
    LED Control:
    <input type="radio" id="on" value="on" v-model="ledState" @change="updateLedState">
    <label for="on">On</label>
    <input type="radio" id="off" value="off" v-model="ledState" @change="updateLedState">
    <label for="off">Off</label>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ledState: 'off',
    }
  },
  methods: {
    async updateLedState() {
      try {
        const response = await axios.post(process.env.VUE_APP_API_HOST_URL + '/api/led', { state: this.ledState });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
