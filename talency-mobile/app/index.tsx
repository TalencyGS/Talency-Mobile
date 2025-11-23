import React from "react";
import { Redirect } from "expo-router";
import { useAuth } from "../hooks/AuthContext";
import { View, ActivityIndicator } from "react-native";
import { Colors } from "../constants/theme";

export default function Index() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background1 }}>
        <ActivityIndicator size="large" color={Colors.primary2} />
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/home" />;
}