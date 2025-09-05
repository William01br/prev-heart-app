import { Tabs } from "expo-router";
import { FontAwesome, Octicons } from "@expo/vector-icons";

import { tintColorLightBlue } from "@/constants/Colors";

type NavBarProps = {
  pathHome: string;
  pathMenu: string;
};

export default function NavBar({ pathHome, pathMenu }: NavBarProps) {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name={pathHome}
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused, color, size }) => {
              if (focused)
                return (
                  <FontAwesome
                    name="home"
                    color={tintColorLightBlue}
                    size={size}
                  />
                );
              return <FontAwesome name="home" color={color} size={size} />;
            },
          }}
        />
        <Tabs.Screen
          name={pathMenu}
          options={{
            headerShown: false,
            title: "Menu",
            tabBarIcon: ({ focused, color, size }) => {
              if (focused)
                return (
                  <Octicons
                    name="three-bars"
                    color={tintColorLightBlue}
                    size={size}
                  />
                );
              return <Octicons name="three-bars" color={color} size={size} />;
            },
          }}
        />
      </Tabs>
    </>
  );
}
