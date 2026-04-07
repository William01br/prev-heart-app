import { View, ViewProps } from "react-native";

import { styles } from "./styles";

export function AuthContainer({ ...rest }: ViewProps) {
  return <View style={styles.container} {...rest}></View>;
}
