<template>
  <div style="height:300px; width:600px">
    <LineChart :data="chartData" :options="chartOptions"></LineChart>
    <!-- <LineChart :chart-data="chartData" :chart-options="chartOptions" ></LineChart> -->

  </div>
</template>

<script>
/* eslint-disable */
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { Line as LineChart } from 'vue-chartjs'
// import LineChart from './LineChart.vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  components: {
    LineChart
  },
  setup() {
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: 'Data',
          backgroundColor: '#f87979',
          data: []
        }
      ]
    });

    let eventSource; // Declare the eventSource variable

    onMounted(() => {
      eventSource = new EventSource(process.env.VUE_APP_API_HOST_URL+'/api/sensor');

      eventSource.onmessage = event => {
        const receivedData = JSON.parse(event.data);

        // chartData.value.labels.push(new Date().toLocaleTimeString());
        // chartData.value.datasets[0].data.push(receivedData.data);

        // if (chartData.value.labels.length > 50) {
        //   chartData.value.labels.shift();
        //   chartData.value.datasets[0].data.shift();
        // }

          chartData.value = {
            labels: [...chartData.value.labels, new Date().toLocaleTimeString()].slice(-50),
            datasets: [
              {
                ...chartData.value.datasets[0],
                data: [...chartData.value.datasets[0].data, receivedData.data].slice(-50)
              }
            ]
          }

        // console.log("chartData", chartData)
      };
    });

    onUnmounted(() => {
      if (eventSource) {
        eventSource.close();
      }
    });

    return {
      chartData,
      chartOptions: {
        // Add your chart options here
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 0,
            max: 0.3
          }
        },
        layout: {
          padding: {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
          },
        },
      }
    };
  }
};
</script>
