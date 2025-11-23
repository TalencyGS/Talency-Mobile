import React from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar } from "react-native";
import { Colors } from "../constants/theme";

const COMMIT_HASH = "e7b89f2"; 

export default function SobreAppScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.header}>
          <Text style={styles.appName}>Talency</Text>
          <Text style={styles.tagline}>O Futuro do Trabalho começa aqui.</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Projeto</Text>
          <Text style={styles.text}>
            O Talency é uma plataforma integrada focada na preparação para as carreiras do futuro. 
            Combinamos trilhas de aprendizado, roadmaps personalizados e inteligência artificial 
            para criar uma jornada única de evolução profissional.
          </Text>
          
          <View style={styles.badgeContainer}>
            <View style={styles.badge}><Text style={styles.badgeText}>ODS 4</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>ODS 8</Text></View>
            <View style={styles.badge}><Text style={styles.badgeText}>ODS 10</Text></View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que oferecemos</Text>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>🚀 Trilhas Profissionais</Text>
            <Text style={styles.text}>
              Caminhos estruturados para carreiras como Fullstack, Data Science, UX e Energia Verde.
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>🗺️ Roadmap Inteligente</Text>
            <Text style={styles.text}>
              Defina suas metas e receba uma ordem de estudos com checklist visual de progresso.
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>🤖 IA Copiloto</Text>
            <Text style={styles.text}>
              Um assistente que oferece resumos, sugestões de estudo e motivação personalizada (IoB).
            </Text>
          </View>

          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>🏆 Dashboard & Gamification</Text>
            <Text style={styles.text}>
              Acompanhe horas investidas, conquistas e badges de evolução.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipe de Desenvolvimento</Text>
          <View style={styles.teamCard}>
            <Text style={styles.member}>Felipe Menezes Prometti</Text>
            <Text style={styles.rm}>RM558976 - 2TDSPM</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.member}>Maria Eduarda Pires Vieira</Text>
            <Text style={styles.rm}>RM55514 - 2TDSPZ</Text>

            <View style={styles.divider} />
            
            <Text style={styles.member}>Samuel Damasceno Silva</Text>
            <Text style={styles.rm}>RM558876 - 2TDSPM</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Informações Técnicas</Text>
          <Text style={styles.footerText}>Versão 1.0.0 (Global Solution)</Text>
          <Text style={styles.footerText}>Commit de Referência:</Text>
          <Text style={styles.hash}>{COMMIT_HASH}</Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background1,
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary2,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: Colors.text2,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text1,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.secundary2,
    paddingLeft: 12,
  },
  text: {
    fontSize: 15,
    color: Colors.text2,
    lineHeight: 22,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  badge: {
    backgroundColor: Colors.primary1,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text1,
  },
  featureItem: {
    backgroundColor: Colors.background3,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.shadow,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary2,
    marginBottom: 4,
  },
  teamCard: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  member: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text1,
  },
  rm: {
    fontSize: 14,
    color: Colors.text2,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.shadow,
    marginVertical: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: Colors.shadow,
  },
  footerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text2,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    color: Colors.text2,
  },
  hash: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: Colors.primary2,
    backgroundColor: Colors.background3,
    padding: 4,
    borderRadius: 4,
    marginTop: 4,
  }
});