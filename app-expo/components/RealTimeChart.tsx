import React, { useState, useEffect } from "react";
import { ScrollView, StatusBar, Dimensions, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import "babel-polyfill";
import EventSource, { EventSourceListener } from "react-native-sse";

// in Expo - swipe left to see the following styling, or create your own
const chartConfigs = [
  {
    backgroundColor: "#000000",
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  },
];

interface ReceivedData {
  data: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

const sample = {
  labels: [],
  datasets: [
    {
      data: [0],
    },
  ],
};

const RealTimeChart = () => {
  const [chartData, setChartData] = useState<ChartData>(sample);

  // const min = 0;
  // const max = 2;

  useEffect(() => {
    console.log("Connect to EventSource");
    const es = new EventSource(
      "https://70db-2a00-23c7-f832-3b01-f093-32dc-fad-e535.eu.ngrok.io/api/ros"
    );

    const listener: EventSourceListener = (event) => {
      if (event.type === "open") {
        console.log("Open SSE connection.");
      } else if (event.type === "message") {
        const receivedData: ReceivedData = JSON.parse(event.data);

        // setChartData((prevData) => {
        //   // console.log("event.type === message", receivedData);
        //   const labels = [...prevData.labels, prevData.labels.length];
        //   const data = [...prevData.datasets[0].data, receivedData.data];

        //   // Ensure we're not keeping too much data in memory for performance purposes
        //   if (labels.length > 50) {
        //     labels.shift();
        //     data.shift();
        //   }

        //   return {
        //     labels,
        //     datasets: [
        //       { data },
        //       // {
        //       //   data: [min, max],
        //       //   color: () => "transparent",
        //       //   strokeWidth: 0,
        //       //   withDots: false,
        //       // },
        //     ],
        //   };
        // });
      } else if (event.type === "error") {
        console.error("Connection error:", event.message);
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
    };

    es.addEventListener("open", listener);
    es.addEventListener("message", listener);
    es.addEventListener("error", listener);

    return () => {
      console.log("return");
      es.removeAllEventListeners();
      es.close();
    };
  }, []);

  const width = Dimensions.get("window").width;
  const height = 220;
  const graphStyle = {
    marginVertical: 8,
    ...chartConfigs[0].style,
  };
  return (
    <View>
      <Text>Hello </Text>
      <LineChart
        data={chartData}
        width={width}
        height={height}
        chartConfig={chartConfigs[0]}
        bezier
        style={graphStyle}
        fromZero={true}
      />
    </View>
  );
};

export default RealTimeChart;
