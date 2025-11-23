import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../constants/api";
import { Alert } from "react-native";

type User = {
  id: number;
  nome: string;
  email: string;
};

type RegisterData = {
  nome: string;
  email: string;
  senha: string;
  areaInteresse: string;
};

type AuthContextData = {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signUp: (dados: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.multiGet(["@talency:token", "@talency:user"]).then(
      ([tokenItem, userItem]) => {
        const storedToken = tokenItem[1];
        const storedUser = userItem[1];

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      }
    );
  }, []);

  async function signIn(email: string, senha: string) {
    const response = await api.post("/auth/login", { email, senha });
    const { token: jwt, usuario } = response.data;

    setToken(jwt);
    setUser(usuario);

    api.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    await AsyncStorage.setItem("@talency:token", jwt);
    await AsyncStorage.setItem("@talency:user", JSON.stringify(usuario));
  }

  async function signUp({ nome, email, senha, areaInteresse }: RegisterData) {
    try {
      await api.post("/Usuario/register", { 
        nome, 
        email, 
        senha, 
        areaInteresse 
      });
      
      Alert.alert("Sucesso", "Conta criada! Faça login para continuar.");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function signOut() {
    setToken(null);
    setUser(null);
    await AsyncStorage.multiRemove(["@talency:token", "@talency:user"]);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}