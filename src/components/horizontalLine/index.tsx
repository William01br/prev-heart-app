import { tintColorLightGray } from "@/constants/Colors";
import { StyleSheet, View } from "react-native";

export default function HorizontalLine() {
  return <View style={styles.line}></View>;
}

const styles = StyleSheet.create({
  line: {
    height: 2,
    width: "100%",
    backgroundColor: tintColorLightGray,
    marginVertical: 16,
  },
});
