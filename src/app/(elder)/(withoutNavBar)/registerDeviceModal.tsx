import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { tintColorLightBlue } from "@/constants/Colors";
import { Button } from "@/components/button";

export default function RegisterDeviceModal() {
  // useState para guardar o valor do ID
  // +
  // função no onPress -> Fetch para API

  // FALTA FINALIZAR O CLOSE DO MODAL
  // AJEITAR

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Modal>
        <View style={styles.container}>
          <View style={styles.box}>
            <MaterialCommunityIcons
              name="heart-pulse"
              size={82}
              color={tintColorLightBlue}
            />
            <Text style={styles.title}>Registrar Dispositivo</Text>
            <View style={{ height: 20 }}></View>
            <Text style={styles.text}>
              Por favor, digite o ID provido pelo seu dispositivo
            </Text>
            <View style={{ height: 20 }}></View>

            <TextInput
              style={styles.input}
              placeholder="Código do dispositivo"
              placeholderTextColor="#a49d9dff"
            />

            <View style={{ height: 40 }}></View>
            <Button title="Registrar" />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#afbcc8ff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    borderRadius: 20,
    padding: 40,
    backgroundColor: "#fff",
    height: 400,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "#000",
  },
  input: {
    width: "100%",
    backgroundColor: "#f2f8fbff",
    borderRadius: 10,
    padding: 12,
    height: 52,
    fontSize: 16,
  },
});
