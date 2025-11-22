import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../hooks/AuthContext";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await signIn(email, senha);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível entrar. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Talency</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button
        title={loading ? "Entrando..." : "Entrar"}
        onPress={handleLogin}
      />

      <Link href="/sobre" style={styles.link}>
        Ver sobre o app
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#050816" },
  title: { fontSize: 32, fontWeight: "bold", color: "#ffffff", marginBottom: 24, textAlign: "center" },
  input: {
    backgroundColor: "#111827",
    borderRadius: 8,
    padding: 12,
    color: "#ffffff",
    marginBottom: 12,
  },
  link: { marginTop: 16, color: "#60a5fa", textAlign: "center" },
});
