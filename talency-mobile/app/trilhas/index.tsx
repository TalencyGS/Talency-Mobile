import React, { useEffect, useState } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  StatusBar
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/theme";
import { api } from "../../constants/api";

type Trilha = {
  id: number;
  nome: string;
  area: string;
  descricao: string;
  nivel?: string;
};

const MOCK_TRILHAS: Trilha[] = [
  { id: 1, nome: "Técnico em Energia Verde", area: "Sustentabilidade", descricao: "Aprenda sobre painéis solares e eficiência energética.", nivel: "Iniciante" },
  { id: 2, nome: "Desenvolvedor Fullstack", area: "Tecnologia", descricao: "Domine React, Java e Bancos de Dados.", nivel: "Avançado" },
  { id: 3, nome: "Analista de Dados (ESG)", area: "Dados", descricao: "Como usar dados para gerar impacto social e ambiental.", nivel: "Intermediário" },
  { id: 4, nome: "UX Designer", area: "Design", descricao: "Crie experiências de usuário incríveis e acessíveis.", nivel: "Iniciante" },
];

export default function TrilhasScreen() {
  const router = useRouter();
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrilhas();
  }, []);

  async function fetchTrilhas() {
    try {
      const response = await api.get("/Trilha");
      setTrilhas(response.data);

    } catch (error) {
      console.log("Erro ao buscar trilhas, usando backup...");
      setTrilhas(MOCK_TRILHAS);
    } finally {
      setLoading(false);
    }
  }

  const renderItem = ({ item }: { item: Trilha }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push(`/trilhas/${item.id}`)}
      activeOpacity={0.9}
    >
      <View style={styles.cardHeader}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.area}</Text>
        </View>
        <Text style={styles.nivelText}>{item.nivel}</Text>
      </View>
      
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>{item.descricao}</Text>
      
      <View style={styles.cardFooter}>
        <Text style={styles.linkText}>Ver detalhes</Text>
        <Ionicons name="arrow-forward" size={16} color={Colors.primary2} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.headerContainer}>
        <View style={styles.titleRow}>
            <View style={styles.iconBox}>
                <Ionicons name="layers" size={24} color={Colors.primary2} />
            </View>
            <Text style={styles.headerTitle}>Trilhas Disponíveis</Text>
        </View>
        <Text style={styles.headerSubtitle}>
            Explore nossos cursos e prepare-se para as profissões do futuro.
        </Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary2} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={trilhas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background1 },
  
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: Colors.background1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.background3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTitle: { 
    fontSize: 26,
    fontWeight: "bold", 
    color: Colors.text1,
    flex: 1 
  },
  headerSubtitle: { 
    fontSize: 16, 
    color: Colors.text2, 
    lineHeight: 22 
  },

  listContent: { padding: 24, paddingTop: 0, gap: 16 },
  
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20, 
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6"
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  badge: { backgroundColor: Colors.primary1, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  badgeText: { fontSize: 12, fontWeight: "bold", color: Colors.text1 },
  nivelText: { fontSize: 12, color: Colors.text2, fontStyle: 'italic', marginTop: 4 },
  
  cardTitle: { fontSize: 20, fontWeight: "bold", color: Colors.text1, marginBottom: 8 },
  cardDesc: { fontSize: 14, color: Colors.text2, lineHeight: 22 },
  
  cardFooter: { 
    marginTop: 20, 
    flexDirection: 'row', 
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8
  },
  linkText: { color: Colors.primary2, fontWeight: "bold", fontSize: 14 }
});