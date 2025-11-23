import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  Alert, 
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../hooks/AuthContext";
import { Colors } from "../constants/theme";

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
      console.log("Erro inesperado no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Talency</Text>
        <Text style={styles.subtitle}>Sua trilha para o futuro.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor={Colors.text2}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor={Colors.text2}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
            <Link href="/cadastro" style={styles.link}>
            Não tem conta? <Text style={styles.linkBold}>Cadastre-se</Text>
            </Link>
            
            <Link href="/sobre" style={styles.linkSmall}>
            Sobre o app
            </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 24, 
    backgroundColor: Colors.background1
  },
  header: {
    marginBottom: 40,
    alignItems: 'center'
  },
  title: { 
    fontSize: 40, 
    fontWeight: "bold", 
    color: Colors.primary2,
    marginBottom: 8, 
    textAlign: "center" 
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text2,
  },
  form: {
    width: '100%',
  },
  label: {
    color: Colors.text1,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    marginLeft: 4
  },
  input: {
    backgroundColor: Colors.background3,
    borderRadius: 12,
    padding: 16,
    color: Colors.text1,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.shadow,
  },
  button: {
    backgroundColor: Colors.primary2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: Colors.primary2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
    gap: 16
  },
  link: { 
    color: Colors.text1, 
    textAlign: "center",
    fontSize: 16
  },
  linkBold: {
    color: Colors.secundary2,
    fontWeight: 'bold'
  },
  linkSmall: {
    color: Colors.text2,
    fontSize: 14
  }
});