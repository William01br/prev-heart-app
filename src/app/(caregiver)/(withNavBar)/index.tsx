import { AppState, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import LinkDevice from "../(withoutNavBar)";
import { useAuth } from "@/contexts/AuthContext";
import { getElderLinked } from "@/utils/http/getElderLinked";
import ErrorScreen from "@/components/errorScreen";
import LoadingIcon from "@/components/icons/loading";

export default function Index() {
  const { user } = useAuth();
  if (!user) throw new Error("Euser not stored");

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
    queryKey: ["myElderData", user.id],
    queryFn: () => getElderLinked(user.token),
    enabled: !!user,
    // polling and behavior
    refetchInterval,
    refetchIntervalInBackground: true,
    staleTime: 0,
    refetchOnWindowFocus: false,
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 3000),
  });

  if (isError) return <ErrorScreen />;

  if (!data || isLoading) return <LoadingIcon />;

  if (data.deviceId === null || data.bpm === null) return <LinkDevice />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        O último registro do batimento cardíaco do idoso(a) {data.name} foi:
      </Text>
      <View style={{ height: 40 }}></View>
      <Text style={styles.value}>{data.bpm}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
  },
  value: {
    fontSize: 80,
    fontWeight: "700",
  },
});
