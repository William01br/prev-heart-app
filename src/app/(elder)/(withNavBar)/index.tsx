import React from "react";
import { StyleSheet, View } from "react-native";

import { Title } from "@/components/title";
import HeartRateCircle from "@/components/HeartRateCircle";
import RegisterDevice from "../(withoutNavBar)";

export default function Index() {
  const bpm = null; // via fetch para a API + React Query para renderizar
  let message = "";

  if (bpm === null) return <RegisterDevice />;

  if (bpm > 100) message = "Frequência alta";
  else if (bpm > 60) message = "Frequência normal";
  else message = "Frequência baixa";

  return (
    <View style={styles.container}>
      <Title>{message}</Title>
      <View style={{ height: 20 }}></View>
      <HeartRateCircle bpm={bpm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
