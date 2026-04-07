import React, { useEffect, useRef, useState } from "react";
import { AppState, StyleSheet, View, TouchableOpacity } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { FontAwesome6 } from "@expo/vector-icons";

import { Title } from "@/shared/components/title";
import HeartRateCircle from "@/shared/components/HeartRateCircle";
import RegisterDeviceEntryScreen from "./RegisterDeviceEntryScreen";
import { useAuth } from "@/features/auth/hooks/useAuth";
import ErrorScreen from "@/shared/components/errorScreen";
import LoadingIcon from "@/shared/components/icons/loading";
import { getHeartBeat } from "@/features/elder/api/getHeartBeat";
import { sendBpm } from "@/features/elder/api/sendBpm";
import { tintColorLightBlue, tintColorLightGray } from "@/shared/theme/colors";

export default function HomeScreen() {
  const [off, setOff] = useState(false);

  const { user } = useAuth();
  if (!user) throw new Error("user not stored");

  const handleUpdateBpm = async (increase: boolean) => {
    const bpm = increase
      ? Math.floor(Math.random() * (150 - 121 + 1)) + 121
      : Math.floor(Math.random() * (110 - 50 + 1)) + 50;
    const result = await sendBpm({ bpm, token: user.token });
    if (!increase) return;
    if (result) setOff(true);
    setTimeout(() => {
      setOff(false);
    }, 45000);
  };

  // control the interval dynamically for pause in background
  const POLL_INTERVAL_MS = 5000;
  const [refetchInterval, setRefetchInterval] = useState<number | false>(
    POLL_INTERVAL_MS
  );
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      )
        setRefetchInterval(false);

      setRefetchInterval(POLL_INTERVAL_MS);
    });
    return () => subscription.remove();
  }, []);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["bpm", user.id],
    queryFn: () => getHeartBeat(user.token),
    enabled: !!user,
    // polling and behavior
    refetchInterval,
    refetchIntervalInBackground: true,
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
  });

  if (isError) return <ErrorScreen />;

  if (!data || isLoading || (data.deviceId && data.bpm === null))
    return <LoadingIcon />;

  const [bpm, deviceId] = [data.bpm, data.deviceId];

  // console.log(bpm, deviceId);
  if (deviceId === null || bpm === null) return <RegisterDeviceEntryScreen />;

  let message = "";

  if (bpm > 100) message = "Frequência alta";
  else if (bpm > 60) message = "Frequência normal";
  else message = "Frequência baixa";

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Title>{message}</Title>
        <View style={{ height: 20 }}></View>
        <HeartRateCircle bpm={bpm} />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: tintColorLightBlue,
              borderColor: tintColorLightBlue,
            },
          ]}
          activeOpacity={0.9}
          onPress={() => handleUpdateBpm(false)}
        >
          <FontAwesome6 name="heart-circle-minus" size={36} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={
            off
              ? [
                  styles.button,
                  {
                    backgroundColor: tintColorLightGray,
                    borderColor: tintColorLightGray,
                  },
                ]
              : styles.button
          }
          activeOpacity={0.9}
          onPress={off ? () => {} : () => handleUpdateBpm(true)}
        >
          <FontAwesome6 name="heart-circle-plus" size={36} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: 50,
    // backgroundColor: "#000",
  },
  button: {
    backgroundColor: "#ef4444",
    alignItems: "center",
    justifyContent: "center",
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    borderWidth: 6,
    borderColor: "#ef4444",
  },
});
