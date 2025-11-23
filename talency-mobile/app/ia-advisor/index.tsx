import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  StatusBar,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import { api } from "../../constants/api";
import { useAuth } from "../../hooks/AuthContext";

const OPTIONS = [
  { id: "MOTIVACAO", label: "Motivação", icon: "flame" as const, desc: "Receba um incentivo personalizado." },
  { id: "SUGESTAO_ESTUDO", label: "Dica de Estudo", icon: "school" as const, desc: "O que devo estudar agora?" },
  { id: "RESUMO_CONTEUDO", label: "Tendências", icon: "trending-up" as const, desc: "Resumo da sua área de interesse." },
];

export default function IAAdvisorScreen() {
  const { user } = useAuth();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [responseIA, setResponseIA] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleConsultar() {
    if (!selectedOption) {
      return Alert.alert("Selecione uma opção", "Diga o que você precisa da IA.");
    }

    if (!user?.id) {
        return Alert.alert("Erro", "Usuário não identificado.");
    }

    setLoading(true);
    setResponseIA("");

    try {
      const response = await api.post("/ia/solicitar", {
        usuarioId: user.id,
        tipoSolicitacao: selectedOption
      });

      setResponseIA(response.data);

    } catch (error) {
      console.log("Erro na API Java/IA. Usando Mock...", error);
      
      await new Promise(resolve => setTimeout(resolve, 8000));

      let mockResponse = "";
      switch (selectedOption) {
        case "MOTIVACAO":
          mockResponse = `Olá ${user.nome}! Lembre-se que a constância é a chave. Sua jornada em ${user.areaInteresse || "Tecnologia"} está apenas começando. Continue firme! 🚀`;
          break;
        case "SUGESTAO_ESTUDO":
          mockResponse = `Baseado no seu perfil de ${user.areaInteresse || "TI"}, sugiro focar agora em Arquitetura de Microsserviços e práticas de Clean Code.`;
          break;
        case "RESUMO_CONTEUDO":
          mockResponse = "As tendências atuais apontam para um crescimento massivo no uso de IA Generativa integrada a processos de desenvolvimento (DevOps e Low-code).";
          break;
      }
      setResponseIA(mockResponse);

    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background1} />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="hardware-chip" size={40} color={Colors.primary2} />
          </View>
          <Text style={styles.title}>IA Advisor</Text>
          <Text style={styles.subtitle}>
            Inteligência Artificial conectada ao seu perfil para acelerar sua carreira.
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Como posso ajudar hoje?</Text>
        <View style={styles.grid}>
          {OPTIONS.map((opt) => {
            const isSelected = selectedOption === opt.id;
            return (
              <TouchableOpacity
                key={opt.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setSelectedOption(opt.id)}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name={opt.icon} 
                  size={32} 
                  color={isSelected ? "#FFF" : Colors.primary2} 
                  style={{ marginBottom: 8 }}
                />
                <Text style={[styles.cardTitle, isSelected && styles.textSelected]}>
                  {opt.label}
                </Text>
                <Text style={[styles.cardDesc, isSelected && styles.textSelected]}>
                  {opt.desc}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={[styles.button, !selectedOption && styles.buttonDisabled]}
          onPress={handleConsultar}
          disabled={loading || !selectedOption}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Consultar IA</Text>
          )}
        </TouchableOpacity>

        {responseIA ? (
          <View style={styles.responseContainer}>
            <View style={styles.responseHeader}>
              <Ionicons name="chatbox-ellipses" size={24} color={Colors.secundary2} />
              <Text style={styles.responseTitle}>Talency AI diz:</Text>
            </View>
            <Text style={styles.responseText}>{responseIA}</Text>
          </View>
        ) : null}

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background1 },
  content: { padding: 24, paddingBottom: 40 },
  
  header: { alignItems: "center", marginBottom: 32, marginTop: 16 },
  iconContainer: { 
    width: 80, height: 80, borderRadius: 40, 
    backgroundColor: Colors.background3, 
    alignItems: "center", justifyContent: "center", marginBottom: 16 
  },
  title: { fontSize: 32, fontWeight: "bold", color: Colors.primary2 },
  subtitle: { fontSize: 16, color: Colors.text2, textAlign: "center", marginTop: 8, paddingHorizontal: 20 },

  sectionTitle: { fontSize: 18, fontWeight: "bold", color: Colors.text1, marginBottom: 16 },
  grid: { gap: 12 },
  card: {
    backgroundColor: Colors.background3,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 16
  },
  cardSelected: {
    backgroundColor: Colors.primary2,
    borderColor: Colors.primary2,
    shadowColor: Colors.primary2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 4
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: Colors.text1 },
  cardDesc: { fontSize: 12, color: Colors.text2, flex: 1 },
  textSelected: { color: "#FFF" },

  button: {
    backgroundColor: Colors.secundary2,
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
    shadowColor: Colors.secundary2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 3
  },
  buttonDisabled: { backgroundColor: Colors.text2, opacity: 0.5 },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },

  responseContainer: {
    backgroundColor: "#FFF",
    padding: 24,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secundary2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    elevation: 2
  },
  responseHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
  responseTitle: { fontSize: 16, fontWeight: "bold", color: Colors.secundary2 },
  responseText: { fontSize: 16, color: Colors.text1, lineHeight: 24 }
});