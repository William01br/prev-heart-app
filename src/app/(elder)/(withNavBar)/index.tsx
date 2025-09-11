import React, { useEffect, useRef, useState } from "react";
import { AppState, StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";

import { Title } from "@/components/title";
import HeartRateCircle from "@/components/HeartRateCircle";
import RegisterDevice from "../(withoutNavBar)";
import { useAuth } from "@/contexts/AuthContext";
import ErrorScreen from "@/components/errorScreen";
import LoadingIcon from "@/components/icons/loading";
import { getHeartBeat } from "@/utils/http/getHeartBeat";

export default function Index() {
  const { user } = useAuth();
  if (!user) throw new Error("user not stored");

  // control the interval dynamically for pause in background
  const POLL_INTERVAL_MS = 5000;
  const [refetchInterval, setRefetchInterval] = useState<number | false>(
    POLL_INTERVAL_MS
  );
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      console.log(appState.current);
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      )
        setRefetchInterval(false);

      // console.log(appState.current);
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
  if (deviceId === null || bpm === null) return <RegisterDevice />;

  let message = "";

  if (bpm > 100) message = "Frequência alta";
  else if (bpm > 60) message = "Frequência normal";
  else message = "Frequência baixa";

  return (
    <View style={styles.container}>
      <Title>{message}</Title>
      <View style={{ height: 20 }}></View>
      <HeartRateCircle bpm={bpm} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
