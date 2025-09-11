import { tintColorLightGray } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";

type Credentials = {
  label: string;
  value: string;
};

export default function Field({ label, value }: Credentials) {
  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{label}</Text>
      <Text style={styles.textValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "100%",
    height: 60,
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
    borderColor: tintColorLightGray,
    borderWidth: 1,
  },
  textLabel: {
    fontSize: 12,
    color: tintColorLightGray,
    fontWeight: "bold",
  },
  textValue: {
    fontSize: 16,
  },
});
