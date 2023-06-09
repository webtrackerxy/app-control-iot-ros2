import React, { useState } from "react";
import { ButtonGroup } from "react-native-elements";

const LedControl: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const buttons = ["On", "Off"];

  const updateLedState = async (selectedIndex: number) => {
    console.log("updateLedState", selectedIndex);
    setSelectedIndex(selectedIndex);
    const newState = buttons[selectedIndex].toLowerCase();

    try {
      const response = await fetch(
        "https://70db-2a00-23c7-f832-3b01-f093-32dc-fad-e535.eu.ngrok.io/api/led",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ state: newState }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ButtonGroup
      onPress={updateLedState}
      selectedIndex={selectedIndex}
      buttons={buttons}
    />
  );
};

export default LedControl;
