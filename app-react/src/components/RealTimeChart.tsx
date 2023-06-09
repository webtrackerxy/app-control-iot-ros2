import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

interface ChartData {
  time: string;
  value: number;
}

const RealTimeChart: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      process.env.REACT_APP_API_HOST_URL + "/api/sensor"
    );

    eventSource.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);

      setData((prevData) => {
        const newData = [
          ...prevData,
          { time: new Date().toLocaleTimeString(), value: receivedData.data },
        ];

        // If the length of newData is greater than 100, only keep the last 50 elements
        if (newData.length > 100) {
          return newData.slice(-100);
        }

        // Otherwise, return the whole array
        return newData;
      });
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
    </LineChart>
  );
};

export default RealTimeChart;
