import { tintColorLightGray } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: tintColorLightGray,
    padding: 12,
    fontSize: 16,
  },
  containerInput: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: tintColorLightGray,
    borderRadius: 10,
    padding: 12,
    height: 52,
  },
  inputPassword: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    position: "absolute",
    right: 15,
  },
});
