import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "https://SUA-API-AQUI/api/v1",
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("@talency:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
