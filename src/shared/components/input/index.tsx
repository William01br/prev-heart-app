import { TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";
import { tintColorLightGray } from "@/shared/theme/colors";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={tintColorLightGray}
      {...rest}
    />
  );
}
