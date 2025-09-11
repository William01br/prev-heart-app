import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: false,
    shouldShowList: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  console.log("platform: ", Platform.OS);
  console.log("Os version: ", Device.osVersion);
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    // Request permissions if not already granted
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    // Check if permissions are granted
    if (finalStatus !== "granted")
      throw new Error(
        "Permission not granted to get push token for push notification!"
      );

    const projectId = Constants.expoConfig?.extra?.eas?.projectId;

    if (!projectId)
      throw new Error("No project ID found. Please configure in app.json");

    // Get Expo Push Token
    try {
      const expoToken = (
        await Notifications.getExpoPushTokenAsync({
          projectId: projectId,
        })
      ).data;

      console.log("Expo Push Token:", expoToken);

      return {
        expoToken: expoToken,
        platform: Platform.OS,
        osVersion: Device.osVersion,
      };
    } catch (err: unknown) {
      throw new Error(`${err}`);
    }
  } else {
    throw new Error("Must use physical device for push notifications");
  }
}
