import React from "react";
import Header from "./components/Header";
import RosData from "./components/RosData";
import RealTimeChart from "./components/RealTimeChart";
import LedControl from "./components/LedControl";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <LedControl />
      <RosData />
      <RealTimeChart />
    </div>
  );
};

export default App;
