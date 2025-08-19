import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

import { styles } from "./styles";

export function BackButton({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity activeOpacity={0.5} {...rest}>
      <Text style={styles.textButton}>Voltar</Text>
    </TouchableOpacity>
  );
}
