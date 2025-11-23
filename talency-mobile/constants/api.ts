import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "http://talency-webapp-gs.azurewebsites.net/api",
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem("@talency:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
