import { StyleSheet, Text, View } from "react-native";

import Field from "@/components/fieldInformation";

type ResponsibleCredentials = {
  name: string;
  phone: string;
  ownerData: "Cuidador" | "Idoso";
};

export default function ResponsibleInformationModel({
  name,
  phone,
  ownerData,
}: ResponsibleCredentials) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dados do {ownerData}</Text>
      </View>
      <View style={styles.content}>
        <Field label="Nome" value={name} />
        <View style={{ height: 20 }}></View>

        <Field label="Telefone" value={phone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  header: {
    height: 60,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000000",
  },
});
