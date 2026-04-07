import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/features/auth/hooks/useAuth";
import HorizontalLine from "@/shared/components/horizontalLine";
import { ButtonMenu } from "@/shared/components/button/buttonMenu";
import DatabaseIcon from "@/shared/components/icons/database";
import ArrowForwardIcon from "@/shared/components/icons/arrowForward";
import DeviceIcon from "@/shared/components/icons/device";
import PersonIcon from "@/shared/components/icons/person";
import ArrowBackIcon from "@/shared/components/icons/arrowBack";

export default function Menu() {
  const { signOut } = useAuth();

  async function logout() {
    await signOut();
    router.replace("/(auth)/Login");
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Menu</Text>
        <ButtonMenu
          onPress={() =>
            router.navigate(
              "/(elder)/(withoutNavBar)/(menuOptions)/personalInformationScreen"
            )
          }
          iconStart={<DatabaseIcon />}
          title="Meus dados"
          iconEnd={<ArrowForwardIcon />}
        ></ButtonMenu>
        <HorizontalLine />
        <ButtonMenu
          onPress={() =>
            router.navigate("/(elder)/(withoutNavBar)/(menuOptions)/(device)")
          }
          iconStart={<DeviceIcon />}
          title="Dispositivo"
          iconEnd={<ArrowForwardIcon />}
        />
        <HorizontalLine />
        <ButtonMenu
          onPress={() =>
            router.navigate(
              "/(elder)/(withoutNavBar)/(menuOptions)/(caregiver)"
            )
          }
          iconStart={<PersonIcon />}
          title="Cuidador"
          iconEnd={<ArrowForwardIcon />}
        />
        <HorizontalLine />
        <ButtonMenu
          iconStart={<ArrowBackIcon />}
          title="Sair"
          onPress={async () => await logout()}
        />
      </View>
    </View>
  );
}

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
