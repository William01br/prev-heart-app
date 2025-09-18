import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useNotification } from "./NotificationContext";
import { API_URL } from "@/constants/url";

type Credentials = {
  cpf: string;
  password: string;
};
type Role = "caregiver" | "elder" | "admin";
type ErrorMessage = {
  status: number;
  error: string;
};
type User = { id: number; name: string; role: Role; token: string } | null;

type AuthCtx = {
  user: User;
  isInitializing: boolean;
  signIn: (creds: Credentials) => Promise<Role | ErrorMessage>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const { expoPushToken, platform, osVersion } = useNotification();

  useEffect(() => {
    const init = async () => {
      try {
        const raw = await AsyncStorage.getItem("@myapp:user");
        if (raw) {
          const parsed = JSON.parse(raw);
          setUser(parsed);
        }
      } catch (err) {
        console.warn("Failed to load user from storage", err);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  async function signIn({
    cpf,
    password,
  }: Credentials): Promise<Role | ErrorMessage> {
    try {
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cpf, password }),
      });
      if (!res.ok) {
        if (
          res.status === 404 ||
          res.status === 409 ||
          res.status === 400 ||
          res.status === 401
        ) {
          // the user always will receive the message error: "Invalid Credentials"
          return {
            status: res.status,
            error: "Credenciais inválidas",
          };
        }
        throw new Error("Internal Server Error");
      }

      const json = await res.json();
      const newUser: User = {
        id: json.id,
        name: json.name,
        role: json.role,
        token: json.accessToken,
      };

      if (newUser.role === "caregiver") {
        const res = await fetch(`${API_URL}/api/push-notification`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${newUser.token}`,
          },
          body: JSON.stringify({
            expoPushToken,
            platform,
            osVersion,
          }),
        });
        if (!res.ok) throw new Error("Internal Server Error");
      }

      setUser(newUser);
      await AsyncStorage.setItem("@myapp:user", JSON.stringify(newUser));

      return newUser.role;
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  async function signOut() {
    const [token, role] = [user?.token, user?.role];
    if (role === "caregiver") {
      const res = await fetch(`${API_URL}/api/push-notification`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res) throw new Error("Request for delete expo token failed");
    }

    setUser(null);
    AsyncStorage.removeItem("@myapp:user").catch(() => {});
  }

  return (
    <AuthContext.Provider value={{ user, isInitializing, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
