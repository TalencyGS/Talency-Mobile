import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { api } from "../../constants/api";

type Meta = {
  idMeta: number;
  descricao: string;
  status: string;
};

export default function MetasScreen() {
  const { roadmapId } = useLocalSearchParams<{ roadmapId: string }>();
  const [metas, setMetas] = useState<Meta[]>([]);
  const [novaMeta, setNovaMeta] = useState("");

  async function carregarMetas() {
    const resp = await api.get(`/roadmaps/${roadmapId}/metas`);
    setMetas(resp.data);
  }

  useEffect(() => {
    carregarMetas();
  }, [roadmapId]);

  async function criarMeta() {
    if (!novaMeta.trim()) return;

    await api.post(`/roadmaps/${roadmapId}/metas`, {
      descricao: novaMeta,
      status: "Pendente",
    });

    setNovaMeta("");
    carregarMetas();
  }

  async function alternarStatus(meta: Meta) {
    const novoStatus = meta.status === "Pendente" ? "Concluida" : "Pendente";
    await api.put(`/metas/${meta.idMeta}`, {
      descricao: meta.descricao,
      status: novoStatus,
    });
    carregarMetas();
  }

  async function excluirMeta(idMeta: number) {
    Alert.alert("Excluir meta", "Deseja excluir esta meta?", [
      { text: "Cancelar" },
      {
        text: "Excluir",
        onPress: async () => {
          await api.delete(`/metas/${idMeta}`);
          carregarMetas();
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#020617" }}>
      <Text style={{ color: "#fff", fontSize: 20, marginBottom: 12 }}>
        Metas do roadmap
      </Text>

      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: "#111827",
            color: "#fff",
            borderRadius: 8,
            padding: 8,
            marginRight: 8,
          }}
          placeholder="Nova meta"
          placeholderTextColor="#6b7280"
          value={novaMeta}
          onChangeText={setNovaMeta}
        />
        <Button title="Adicionar" onPress={criarMeta} />
      </View>

      <FlatList
        data={metas}
        keyExtractor={m => String(m.idMeta)}
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
              {item.descricao}
            </Text>
            <Text style={{ color: "#60a5fa", marginTop: 4 }}>
              Status {item.status}
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => alternarStatus(item)}>
                <Text style={{ color: "#a5b4fc" }}>
                  Marcar como {item.status === "Pendente" ? "concluída" : "pendente"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirMeta(item.idMeta)}>
                <Text style={{ color: "#f97373" }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
