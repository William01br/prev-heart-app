import Field from "@/components/fieldInformation";
import { StyleSheet, View, Text } from "react-native";

type PersonalCredentials = {
  name: string;
  cpf: string;
  email: string;
  phone: string;
};

export default function PersonalInformationModel({
  name,
  cpf,
  email,
  phone,
}: PersonalCredentials) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus dados</Text>
      </View>
      <View style={styles.content}>
        <Field label="Nome" value={name} />
        <View style={{ height: 20 }}></View>

        <Field label="CPF" value={cpf} />
        <View style={{ height: 20 }}></View>

        <Field label="E-mail" value={email} />
        <View style={{ height: 20 }}></View>

        <Field label="Telefone" value={phone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    height: 40,
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
