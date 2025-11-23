import React from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  StatusBar 
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; 
import { useAuth } from "../hooks/AuthContext";
import { Colors } from "../constants/theme";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.replace("/login");
  }

  const primeiroNome = user?.nome?.split(' ')[0] || "Visitante";

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background1} />
      
      <View style={styles.header}>
        <View>
            <Text style={styles.greeting}>Olá, {primeiroNome}</Text>
            <Text style={styles.subtitle}>Vamos evoluir sua carreira hoje?</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color={Colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity 
            style={[styles.card, styles.cardPrimary]} 
            onPress={() => router.push("/trilhas")}
            activeOpacity={0.9}
        >
            <View style={styles.cardIconLarge}>
               <Ionicons name="rocket" size={40} color="#FFF" />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.cardTitleWhite}>Minhas Trilhas</Text>
              <Text style={styles.cardDescWhite}>
                Acesse seus cursos, continue seu progresso e conquiste certificações.
              </Text>
            </View>
            <View style={{ justifyContent: 'center', paddingLeft: 8 }}>
               <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.5)" />
            </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Ferramentas Inteligentes</Text>

        <View style={styles.grid}>
            
            <TouchableOpacity 
                style={styles.cardSmall} 
                onPress={() => router.push("/roadmap")} 
            >
                <View style={[styles.iconCircle, { backgroundColor: "#E0F2FE" }]}>
                  <Ionicons name="map" size={28} color={Colors.primary2} />
                </View>
                <View style={styles.cardContentBottom}>
                  <Text style={styles.cardTitle}>Roadmap</Text>
                  <Text style={styles.cardDesc}>Visualize seu plano de carreira passo a passo.</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.cardSmall} 
                onPress={() => router.push("/ia-advisor" as any)} 
            >
                <View style={[styles.iconCircle, { backgroundColor: "#FDF4FF" }]}>
                  <Ionicons name="hardware-chip" size={28} color="#D946EF" />
                </View>
                <View style={styles.cardContentBottom}>
                  <Text style={styles.cardTitle}>IA Advisor</Text>
                  <Text style={styles.cardDesc}>Receba dicas e motivação personalizada.</Text>
                </View>
            </TouchableOpacity>

        </View>

        <Text style={styles.sectionTitle}>Informações</Text>

        <TouchableOpacity 
            style={[styles.card, styles.cardOutline]} 
            onPress={() => router.push("/sobre")}
        >
            <View style={styles.iconCircleSmall}>
               <Ionicons name="information" size={24} color={Colors.text2} />
            </View>
            <View>
              <Text style={styles.cardTitle}>Sobre o App</Text>
              <Text style={styles.cardDesc}>Versão 1.0.0 • Equipe • Hash</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
               <Ionicons name="chevron-forward" size={20} color={Colors.text2} />
            </View>
        </TouchableOpacity>

        <View style={{ height: 40 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background1 },
  header: {
    padding: 24,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10
  },
  greeting: { fontSize: 28, fontWeight: 'bold', color: Colors.text1 },
  subtitle: { fontSize: 16, color: Colors.text2, marginTop: 4 },
  logoutButton: { padding: 10, backgroundColor: Colors.background3, borderRadius: 12 },
  
  content: { padding: 24, paddingTop: 10, gap: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.text1, marginTop: 8, marginBottom: -8 },

  card: {
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  cardPrimary: { 
    backgroundColor: Colors.primary2, 
    height: 160,
  },
  cardIconLarge: { 
    marginRight: 20, 
    backgroundColor: 'rgba(255,255,255,0.2)', 
    padding: 16, 
    borderRadius: 16,
    height: 72,
    width: 72,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardTitleWhite: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  cardDescWhite: { color: 'rgba(255,255,255,0.9)', fontSize: 14, marginTop: 6, lineHeight: 20 },
  
  grid: { flexDirection: 'row', gap: 16 },
  cardSmall: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    height: 200,
    justifyContent: 'space-between',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6'
  },
  iconCircle: { 
    width: 56, 
    height: 56, 
    borderRadius: 18, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cardContentBottom: {
    gap: 4
  },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text1 },
  cardDesc: { color: Colors.text2, fontSize: 13, lineHeight: 18 },

  cardOutline: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.shadow,
    paddingVertical: 20,
    height: 90
  },
  iconCircleSmall: {
    width: 40, height: 40, backgroundColor: Colors.background3,
    borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 16
  }
});