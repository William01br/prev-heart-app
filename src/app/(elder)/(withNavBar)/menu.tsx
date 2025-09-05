import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@/contexts/AuthContext";
import HorizontalLine from "@/components/horizontalLine";
import { ButtonMenu } from "@/components/button/buttonMenu";
import DatabaseIcon from "@/components/icons/database";
import ArrowForwardIcon from "@/components/icons/arrowForward";
import DeviceIcon from "@/components/icons/device";
import PersonIcon from "@/components/icons/person";
import ArrowBackIcon from "@/components/icons/arrowBack";

export default function Menu() {
  const { signOut } = useAuth();

  async function logout() {
    signOut();
    router.replace("/(auth)/Login");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Menu</Text>
        <ButtonMenu
          iconStart={<DatabaseIcon />}
          title="Meus dados"
          iconEnd={<ArrowForwardIcon />}
        ></ButtonMenu>
        <HorizontalLine />
        <ButtonMenu
          iconStart={<DeviceIcon />}
          title="Dispositivo"
          iconEnd={<ArrowForwardIcon />}
        />
        <HorizontalLine />
        <ButtonMenu
          iconStart={<PersonIcon />}
          title="Cuidador"
          iconEnd={<ArrowForwardIcon />}
        />
        <HorizontalLine />
        <ButtonMenu
          iconStart={<ArrowBackIcon />}
          title="Sair"
          onPress={logout}
        />
      </View>
    </View>
  );
}

// arrow-right-to-bracket --> ICON para o logout

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  title: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
