import React from "react";
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../hooks/AuthContext";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.replace("/login");
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#020617" }}>
      <Text style={{ color: "#fff", fontSize: 22, marginBottom: 4 }}>
        Olá, {user?.nome}
      </Text>

      <Text style={{ color: "#9ca3af", marginBottom: 24 }}>
        Bem vindo ao Talency
      </Text>

      <View style={{ marginBottom: 12 }}>
        <Button title="Minhas trilhas" onPress={() => router.push("/trilhas")} />
      </View>

      <View style={{ marginBottom: 12 }}>
        <Button title="Dashboard / Roadmap" onPress={() => router.push("/trilhas")} />
      </View>

      <View style={{ marginBottom: 12 }}>
        <Button title="Sobre o app" onPress={() => router.push("/sobre")} />
      </View>

      <View style={{ marginTop: 24 }}>
        <Button title="Sair" onPress={handleLogout} color="#f97373" />
      </View>
    </View>
  );
}
