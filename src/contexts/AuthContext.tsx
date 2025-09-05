import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Credentials = {
  cpf: string;
  password: string;
};
type Role = "caregiver" | "elder" | "admin";
type User = { id: number; name: string; role: Role; token: string } | null;

type AuthCtx = {
  user: User;
  isInitializing: boolean;
  signIn: (creds: Credentials) => Promise<Role>;
  signOut: () => void;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isInitializing, setIsInitializing] = useState(true);

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

  async function signIn({ cpf, password }: Credentials): Promise<Role> {
    console.log(process.env.PARTIAL_URL);
    const res = await fetch(`http://192.168.1.20:3000/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpf, password }),
    });
    if (!res.ok) throw new Error("Invalid Credentials");

    const json = await res.json();
    const newUser: User = {
      id: json.id,
      name: json.name,
      role: json.role,
      token: json.accessToken,
    };
    setUser(newUser);
    await AsyncStorage.setItem("@myapp:user", JSON.stringify(newUser));

    return newUser.role;
  }

  function signOut() {
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
