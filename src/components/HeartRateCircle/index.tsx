import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { tintColorLightGray } from "@/constants/Colors";

type HeartRateCircleProps = {
  bpm: number;
  size?: number;
  ringWidth?: number; // thickness
  ringColor?: string;
  iconColor?: string;
  pulse?: boolean;
};

export default function HeartRateCircle({
  bpm,
  size = 256,
  ringWidth = 6,
  ringColor = "#ef4444",
  iconColor = "#ef4444",
  pulse = true,
}: HeartRateCircleProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.04,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1.0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [pulse, scale]);

  return (
    <Animated.View
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: ringWidth,
          borderColor: ringColor,
          transform: [{ scale }],
        },
      ]}
    >
      <FontAwesome
        name="heart"
        size={36}
        color={iconColor}
        style={{ marginBottom: 8 }}
      />
      <Text style={styles.value}>{bpm}</Text>
      <Text style={styles.unit}>BPM</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  circle: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 64,
    fontWeight: "700",
    lineHeight: 72,
    color: "#111827",
  },
  unit: {
    marginTop: 2,
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 2,
    color: tintColorLightGray,
  },
});
