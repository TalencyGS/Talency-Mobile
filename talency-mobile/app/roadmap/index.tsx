import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  StatusBar,
  FlatList
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Ícones para o check
import { Colors } from "../../constants/theme";
import { api } from "../../constants/api";
import { useAuth } from "../../hooks/AuthContext";

// --- TIPAGEM (Baseada na sua Entidade C#) ---
type Meta = {
  idMeta: number;
  descricao: string;
  status: string; // "Pendente" ou "Concluido"
};

type Trilha = {
  idTrilha: number;
  nomeTrilha: string;
  area: string;
};

type Roadmap = {
  idRoadmap: number;
  status: string;
  trilha: Trilha;
  metas: Meta[];
  progressoCalculado?: number; // Vamos calcular no front se o back não mandar
};

// --- DADOS MOCKADOS (Salva-vidas para o vídeo) ---
const MOCK_ROADMAP: Roadmap = {
  idRoadmap: 101,
  status: "Em Andamento",
  trilha: {
    idTrilha: 1,
    nomeTrilha: "Técnico em Energia Verde",
    area: "Sustentabilidade"
  },
  metas: [
    { idMeta: 1, descricao: "Assistir aula: Introdução à Energia Solar", status: "Concluido" },
    { idMeta: 2, descricao: "Quiz: Tipos de Painéis Fotovoltaicos", status: "Concluido" },
    { idMeta: 3, descricao: "Projeto Prático: Cálculo de eficiência", status: "Pendente" },
    { idMeta: 4, descricao: "Leitura: ODS 7 e Impacto Global", status: "Pendente" },
    { idMeta: 5, descricao: "Avaliação Final do Módulo 1", status: "Pendente" },
  ]
};

export default function RoadmapScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoadmap();
  }, []);

  async function fetchRoadmap() {
    try {
      const response = await api.get(`/Roadmap/usuario/${user?.id}`);
      setRoadmap(response.data);
      
      setTimeout(() => {
        setRoadmap(MOCK_ROADMAP);
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.log("Erro ao buscar roadmap, usando mock...");
      setRoadmap(MOCK_ROADMAP);
      setLoading(false);
    }
  }

  const completed = roadmap?.metas.filter(m => m.status === "Concluido").length || 0;
  const total = roadmap?.metas.length || 1;
  const percentage = Math.round((completed / total) * 100);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary2} />
        <Text style={{ marginTop: 10, color: Colors.text2 }}>Carregando seu plano...</Text>
      </View>
    );
  }

  if (!roadmap) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyState}>
          <Ionicons name="map-outline" size={64} color={Colors.text2} />
          <Text style={styles.emptyTitle}>Nenhum Roadmap Ativo</Text>
          <Text style={styles.emptyDesc}>Escolha uma trilha para começar sua jornada.</Text>
          <TouchableOpacity style={styles.buttonEmpty} onPress={() => router.push("/trilhas")}>
            <Text style={styles.buttonText}>Ver Trilhas</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary2} />
      
      <View style={styles.header}>
        <Text style={styles.labelHeader}>TRILHA ATUAL</Text>
        <Text style={styles.trilhaTitle}>{roadmap.trilha.nomeTrilha}</Text>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${percentage}%` }]} />
          </View>
          <Text style={styles.progressText}>{percentage}% Concluído</Text>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Próximos Passos</Text>
        
        {roadmap.metas.map((meta, index) => {
          const isDone = meta.status === "Concluido";
          return (
            <View key={meta.idMeta} style={[styles.metaCard, isDone && styles.metaCardDone]}>
              <View style={styles.checkContainer}>
                <Ionicons 
                  name={isDone ? "checkmark-circle" : "ellipse-outline"} 
                  size={28} 
                  color={isDone ? Colors.success : Colors.text2} 
                />
                {index < roadmap.metas.length - 1 && (
                   <View style={[styles.line, isDone && styles.lineDone]} />
                )}
              </View>
              
              <View style={styles.metaInfo}>
                <Text style={[styles.metaTitle, isDone && styles.metaTitleDone]}>
                  {meta.descricao}
                </Text>
                <Text style={styles.metaStatus}>
                  {isDone ? "Completado" : "Pendente"}
                </Text>
              </View>
            </View>
          );
        })}

        <TouchableOpacity style={styles.updateButton} onPress={fetchRoadmap}>
           <Text style={styles.updateButtonText}>Atualizar Progresso</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: Colors.background1 },
  container: { flex: 1, backgroundColor: Colors.background1 },
  
  header: {
    backgroundColor: Colors.primary2,
    padding: 24,
    paddingTop: 50,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 5
  },
  labelHeader: { color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: "bold", letterSpacing: 1 },
  trilhaTitle: { color: "#FFF", fontSize: 24, fontWeight: "bold", marginTop: 4, marginBottom: 16 },
  
  progressContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
  progressBarBg: { flex: 1, height: 8, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 4 },
  progressBarFill: { height: 8, backgroundColor: Colors.secundary3, borderRadius: 4 },
  progressText: { color: "#FFF", fontWeight: "bold", fontSize: 14 },

  content: { padding: 24, paddingTop: 8 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: Colors.text1, marginBottom: 16 },

  metaCard: { flexDirection: "row", marginBottom: 0, height: 80 },
  metaCardDone: { opacity: 0.6 },
  checkContainer: { alignItems: "center", marginRight: 16, width: 30 },
  line: { width: 2, flex: 1, backgroundColor: Colors.shadow, marginTop: 4 },
  lineDone: { backgroundColor: Colors.success },

  metaInfo: { flex: 1, paddingBottom: 20, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  metaTitle: { fontSize: 16, color: Colors.text1, fontWeight: "500", marginBottom: 4 },
  metaTitleDone: { textDecorationLine: "line-through", color: Colors.text2 },
  metaStatus: { fontSize: 12, color: Colors.text2 },

  emptyState: { flex: 1, justifyContent: "center", alignItems: "center", padding: 32 },
  emptyTitle: { fontSize: 20, fontWeight: "bold", color: Colors.text1, marginTop: 16 },
  emptyDesc: { fontSize: 14, color: Colors.text2, textAlign: "center", marginTop: 8, marginBottom: 24 },
  buttonEmpty: { backgroundColor: Colors.primary2, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: "#FFF", fontWeight: "bold" },

  updateButton: { marginTop: 24, alignItems: "center", padding: 16 },
  updateButtonText: { color: Colors.primary2, fontWeight: "bold" }
});