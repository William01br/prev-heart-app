import { tintColorLightBlue } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 54,
    backgroundColor: tintColorLightBlue,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    textTransform: "none",
  },
});
