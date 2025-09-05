import React from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
  View,
} from "react-native";

type ButtonTouchableOpacityProps = TouchableOpacityProps & {
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
  title: string;
};

export function ButtonMenu({
  iconStart,
  title,
  iconEnd,
  ...rest
}: ButtonTouchableOpacityProps) {
  return (
    <>
      <TouchableOpacity activeOpacity={0.5} {...rest} style={styles.container}>
        <View style={styles.containerView}>
          {iconStart}
          <Text style={styles.textButton}>{title}</Text>
          {iconEnd}
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  textButton: {
    color: "#000",
    fontSize: 16,
    paddingLeft: 10,
  },
});
