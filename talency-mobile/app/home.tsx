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
import { useAuth } from "../hooks/AuthContext";
import { Colors } from "../constants/theme";

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.replace("/login");
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View>
            <Text style={styles.greeting}>Olá, {user?.nome?.split(' ')[0]}</Text>
            <Text style={styles.subtitle}>O que vamos aprender hoje?</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity 
            style={[styles.card, styles.cardPrimary]} 
            onPress={() => router.push("/trilhas")}
            activeOpacity={0.9}
        >
            <Text style={styles.cardTitleWhite}>Minhas Trilhas</Text>
            <Text style={styles.cardDescWhite}>Continue de onde parou e veja seu progresso.</Text>
        </TouchableOpacity>

        <View style={styles.grid}>
            
            <TouchableOpacity 
                style={styles.cardSmall} 
                // onPress={() => router.push("/roadmap")}
            >
                <Text style={styles.cardTitle}>Roadmap</Text>
                <Text style={styles.cardDesc}>Seu plano de carreira</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.cardSmall} 
                // onPress={() => router.push("/ia-advisor")}
            >
                <Text style={styles.cardTitle}>IA Advisor</Text>
                <Text style={styles.cardDesc}>Peça dicas à IA</Text>
            </TouchableOpacity>

        </View>

        <TouchableOpacity 
            style={[styles.card, styles.cardOutline]} 
            onPress={() => router.push("/sobre")}
        >
            <Text style={styles.cardTitle}>Sobre o App</Text>
            <Text style={styles.cardDesc}>Versão 1.0.0 - Global Solution</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background1 
  },
  header: {
    padding: 24,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text1,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text2,
    marginTop: 4
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: Colors.error,
    fontWeight: '600',
    fontSize: 16
  },
  content: {
    padding: 24,
    gap: 16
  },
  card: {
    borderRadius: 16,
    padding: 24,
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8
  },
  cardPrimary: {
    backgroundColor: Colors.primary2,
    height: 140,
  },
  cardOutline: {
    backgroundColor: Colors.background1,
    borderWidth: 1,
    borderColor: Colors.shadow,
  },
  cardTitleWhite: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8
  },
  cardDescWhite: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text1,
    marginBottom: 4
  },
  cardDesc: {
    color: Colors.text2,
    fontSize: 12
  },
  grid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8
  },
  cardSmall: {
    flex: 1,
    backgroundColor: Colors.background3,
    borderRadius: 16,
    padding: 20,
    height: 120,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.shadow
  }
});