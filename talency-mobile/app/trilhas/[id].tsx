import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator 
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "../../constants/theme";

const MOCK_DETALHES = {
  1: { steps: ["Introdução à Energia Solar", "Painéis Fotovoltaicos", "Instalação Prática", "Certificação"] },
  2: { steps: ["Lógica de Programação", "React Native Básico", "API Rest com Java", "Deploy na Nuvem"] },
  3: { steps: ["O que é ESG?", "Análise de Dados com Python", "Power BI para Sustentabilidade"] },
  4: { steps: ["Design Thinking", "Figma Básico", "Prototipação", "Testes de Usabilidade"] },
};

export default function TrilhaDetalhesScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // api.get(`/trilhas/${id}`)
  const trilhaId = Number(id);
  const steps = MOCK_DETALHES[trilhaId as keyof typeof MOCK_DETALHES]?.steps || ["Módulo 1", "Módulo 2", "Projeto Final"];

  function handleInscrever() {
    Alert.alert(
      "Sucesso!", 
      "Você iniciou esta trilha. Ela foi adicionada ao seu Dashboard.",
      [
        { text: "Ir para Roadmap", onPress: () => router.push("/home") }
      ]
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <Text style={styles.category}>TRILHA #{id}</Text>
        <Text style={styles.title}>Detalhes da Formação</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>O que você vai aprender:</Text>
        
        <View style={styles.stepsContainer}>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <View style={styles.stepCircle}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={handleInscrever}
        >
          <Text style={styles.buttonText}>Começar Agora</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background1 },
  header: { 
    backgroundColor: Colors.primary2, 
    padding: 32, 
    paddingTop: 60, 
    borderBottomRightRadius: 32 
  },
  category: { color: "rgba(255,255,255,0.7)", fontWeight: "bold", fontSize: 14 },
  title: { color: "#FFF", fontSize: 28, fontWeight: "bold", marginTop: 8 },
  content: { padding: 24 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: Colors.text1, marginBottom: 16 },
  
  stepsContainer: { gap: 16, marginBottom: 32 },
  stepItem: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFF", padding: 16, borderRadius: 12 },
  stepCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primary1, alignItems: "center", justifyContent: "center", marginRight: 12 },
  stepNumber: { fontWeight: "bold", color: Colors.text1 },
  stepText: { fontSize: 16, color: Colors.text1, flex: 1 },

  button: {
    backgroundColor: Colors.secundary2,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: Colors.secundary2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    elevation: 4
  },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" }
});