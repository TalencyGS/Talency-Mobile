import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { api } from "../../constants/api";
import { useRouter } from "expo-router";

type Trilha = {
  idTrilha: number;
  nomeTrilha: string;
  descricao: string;
  percentual: number;
  idRoadmap: number;
};

export default function MinhasTrilhasScreen() {
  const [trilhas, setTrilhas] = useState<Trilha[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get("/trilhas/minhas").then(resp => setTrilhas(resp.data));
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#020617" }}>
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
