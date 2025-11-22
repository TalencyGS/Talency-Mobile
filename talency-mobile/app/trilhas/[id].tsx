import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { api } from "../../constants/api";

type Etapa = {
  idEtapa: number;
  titulo: string;
  descricao: string;
  ordem: number;
};

export default function TrilhaDetalheScreen() {
  const { id, roadmapId } = useLocalSearchParams<{ id: string; roadmapId: string }>();
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.get(`/trilhas/${id}/etapas`).then(resp => setEtapas(resp.data));
  }, [id]);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#020617" }}>
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 8 }}>
        Etapas da trilha
      </Text>

      <FlatList
        data={etapas}
        keyExtractor={e => String(e.idEtapa)}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              marginBottom: 8,
              borderRadius: 10,
              backgroundColor: "#111827",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              {item.ordem}. {item.titulo}
            </Text>
            <Text style={{ color: "#9ca3af" }}>{item.descricao}</Text>
          </View>
        )}
      />

      <Button
        title="Ver metas do roadmap"
        onPress={() =>
          router.push({
            pathname: "/roadmap/[roadmapId]",
            params: { roadmapId },
          })
        }
      />
    </View>
  );
}
