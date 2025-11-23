import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StyleSheet, 
  ScrollView,
  ActivityIndicator 
} from "react-native";
import { useRouter, Link } from "expo-router";
import { useAuth } from "../hooks/AuthContext";
import { Colors } from "../constants/theme";

export default function CadastroScreen() {
  const { signUp } = useAuth();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [areaInteresse, setAreaInteresse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!nome || !email || !senha || !areaInteresse) {
      return Alert.alert("Atenção", "Preencha todos os campos.");
    }

    try {
      setLoading(true);
      await signUp({ nome, email, senha, areaInteresse });
      router.back(); 
    } catch (error) {
      Alert.alert("Erro", "Não foi possível criar a conta. Tente outro email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Junte-se ao Talency</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Samuel Silva"
          placeholderTextColor={Colors.text2}
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="seu@email.com"
          placeholderTextColor={Colors.text2}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Área de Interesse</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Dados, Energia Verde, Java..."
          placeholderTextColor={Colors.text2}
          value={areaInteresse}
          onChangeText={setAreaInteresse}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Crie uma senha segura"
          placeholderTextColor={Colors.text2}
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Cadastrar</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
            <Link href="/" style={styles.link}>
                Já tem conta? <Text style={styles.linkBold}>Fazer Login</Text>
            </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    justifyContent: "center", 
    padding: 24, 
    backgroundColor: Colors.background1 
  },
  header: {
    marginBottom: 32,
    alignItems: 'center'
  },
  title: { 
    fontSize: 32, 
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
    width: '100%'
  },
  label: { 
    color: Colors.text1, 
    marginBottom: 6, 
    marginLeft: 4,
    fontWeight: '600'
  },
  input: {
    backgroundColor: Colors.background3,
    borderRadius: 12,
    padding: 16,
    color: Colors.text1,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.shadow,
  },
  button: {
    backgroundColor: Colors.secundary2,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: Colors.secundary2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center'
  },
  link: { 
    marginTop: 24, 
    color: Colors.text1, 
    textAlign: "center", 
    fontSize: 16 
  },
  linkBold: {
    color: Colors.primary2,
    fontWeight: 'bold'
  }
});