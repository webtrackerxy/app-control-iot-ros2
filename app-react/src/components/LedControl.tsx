import React, { useState } from "react";
import axios from "axios";
// import { config } from "dotenv";

// config();
const LedControl: React.FC = () => {
  const [ledState, setLedState] = useState<"on" | "off">("off");

  const updateLedState = async (newState: "on" | "off") => {
    setLedState(newState);
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_HOST_URL + "/api/led",
        {
          state: newState,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      LED Control:
      <input
        type="radio"
        id="on"
        value="on"
        checked={ledState === "on"}
        onChange={() => updateLedState("on")}
      />
      <label htmlFor="on">On</label>
      <input
        type="radio"
        id="off"
        value="off"
        checked={ledState === "off"}
        onChange={() => updateLedState("off")}
      />
      <label htmlFor="off">Off</label>
    </div>
  );
};

export default LedControl;
