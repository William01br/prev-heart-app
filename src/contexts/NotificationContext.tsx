import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationAsync";
import { EventSubscription } from "expo-modules-core";

type NotificationContextType = {
  expoPushToken: string | null;
  platform: string | null;
  osVersion: string | null;
  notification: Notifications.Notification | null;
  error: Error | null;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined)
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  return context;
};

type NotificationProviderProps = {
  children: ReactNode;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [osVersion, setOsVersion] = useState<string | null>(null);
  const [notification, setNotification] =
    useState<Notifications.Notification | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const notificationListener = useRef<EventSubscription>(null);
  const responseListener = useRef<EventSubscription>(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (obj) => {
        setExpoPushToken(obj.expoToken);
        setPlatform(obj.platform);
        setOsVersion(obj.osVersion);
      },
      (err) => setError(err)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification Received: ", notification);
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification Response", JSON.stringify(response, null, 2)),
          JSON.stringify(response.notification.request.content.data, null, 2);
        // Handle the notification response here
      });

    return () => {
      if (notificationListener.current) notificationListener.current.remove();

      if (responseListener.current) responseListener.current.remove();
    };
  }, []);

  return (
    <NotificationContext.Provider
      value={{ expoPushToken, platform, osVersion, notification, error }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
