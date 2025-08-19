import { TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";
import { tintColorLightGray } from "@/constants/Colors";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={tintColorLightGray}
      {...rest}
    />
  );
}
