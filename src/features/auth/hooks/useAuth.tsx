import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  deletePushTokenRequest,
  loginRequest,
  registerPushTokenRequest,
} from "@/features/auth/api/authApi";
import {
  getStoredUser,
  removeStoredUser,
  setStoredUser,
} from "@/features/auth/services/authStorage";
import { ErrorMessage } from "@/features/auth/types/ErrorMessage";
import { Role } from "@/features/auth/types/Role";
import { useNotification } from "@/features/notifications/hooks/useNotifications";

type Credentials = {
  cpf?: string;
  email?: string;
  password: string;
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
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const { expoPushToken, platform, osVersion } = useNotification();

  useEffect(() => {
    const init = async () => {
      try {
        const raw = await getStoredUser();
        if (raw) {
          const parsed = JSON.parse(raw);
          setUser(parsed);
        } else {
          console.log(raw);
          setUser(null);
        }
      } catch (err) {
        setUser(null);
        console.error("Failed to load user from storage", err);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  async function signIn({
    cpf,
    email,
    password,
  }: Credentials): Promise<Role | ErrorMessage> {
    try {
      const res = await loginRequest({ cpf, email, password });
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
        const res = await registerPushTokenRequest({
          token: newUser.token,
          expoPushToken,
          platform,
          osVersion,
        });
        if (!res.ok) throw new Error("Internal Server Error");
      }

      setUser(newUser);
      await setStoredUser(JSON.stringify(newUser));

      return newUser.role;
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  async function signOut() {
    const [token, role] = [user?.token, user?.role];
    if (role === "caregiver" && token) {
      const res = await deletePushTokenRequest(token);
      if (!res) throw new Error("Request for delete expo token failed");
    }

    setUser(null);
    removeStoredUser().catch(() => {});
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
