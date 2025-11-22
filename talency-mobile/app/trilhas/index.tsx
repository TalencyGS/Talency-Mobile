import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { api } from "../../constants/api";

type Trilha = {
  idTrilha: number;
  nomeTrilha: string;
  descricao: string;
  percentual: number;
  idRoadmap: number;
};

export default function MinhasTrilhasScreen() {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function carregar() {
      try {
        const resp = await api.get("/trilhas/minhas");
        setTrilhas(resp.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#020617" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#020617" }}>
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>
        Minhas trilhas
      </Text>

      <FlatList
        data={trilhas}
        keyExtractor={t => String(t.idTrilha)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 16,
              marginBottom: 8,
              borderRadius: 12,
              backgroundColor: "#111827",
            }}
            onPress={() =>
              router.push({
                pathname: "/trilhas/[id]",
                params: { id: item.idTrilha, roadmapId: item.idRoadmap },
              })
            }
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {item.nomeTrilha}
            </Text>
            <Text style={{ color: "#9ca3af" }}>{item.descricao}</Text>
            <Text style={{ color: "#60a5fa", marginTop: 4 }}>
              Progresso {item.percentual} por cento
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
