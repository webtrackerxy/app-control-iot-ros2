import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import RealTimeChart from "./components/RealTimeChart";
import LedControl from "./components/LedControl";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <LedControl />
      <RealTimeChart />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
});
