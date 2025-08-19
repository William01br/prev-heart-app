import { useState } from "react";
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { styles } from "./styles";
import { tintColorLightGray } from "@/constants/Colors";

export function PasswordInput({ ...rest }: TextInputProps) {
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.containerInput}>
      <TextInput
        key={hidePassword ? "secure" : "plain"}
        style={styles.inputPassword}
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        placeholderTextColor={tintColorLightGray}
        secureTextEntry={hidePassword}
        {...rest}
      />

      <TouchableOpacity
        style={styles.icon}
        onPress={() => setHidePassword(!hidePassword)}
      >
        <Ionicons
          name={hidePassword ? "eye-off" : "eye"}
          size={24}
          color={"gray"}
        />
      </TouchableOpacity>
    </View>
  );
}
