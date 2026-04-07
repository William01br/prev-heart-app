import { Text, TextProps } from "react-native";
import { styles } from "./styles";
import React from "react";

type Props = TextProps & {
  children: React.ReactNode;
};

export function Title({ children, ...rest }: Props) {
  return (
    <Text style={styles.title} {...rest}>
      {children}
    </Text>
  );
}
