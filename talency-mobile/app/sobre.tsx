import React from "react";
import { View, Text } from "react-native";

const COMMIT_HASH = "abc1234";

export default function SobreAppScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>Talency Mobile</Text>
      <Text style={{ marginTop: 12 }}>
        Trilhas profissionais do futuro e roadmap personalizado
      </Text>
      <Text style={{ marginTop: 24 }}>Commit de referência</Text>
      <Text style={{ fontFamily: "monospace" }}>{COMMIT_HASH}</Text>
    </View>
  );
}
