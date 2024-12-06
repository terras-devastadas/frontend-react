import axios from "axios";

class AuthService {
  API_URL = import.meta.env.VITE_API_URL;

  // Instância do axios para fazer as requisições
  axiosInstance = axios.create({
    baseURL: this.API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  async login(username: string, password: string) {
    try {
      const response = await this.axiosInstance.post("/login", { username, password });
      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        return response.data;
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao fazer login.");
    }
  }

  logout() {
    localStorage.removeItem("authToken");
  }

  isAuthenticated() {
    return localStorage.getItem("authToken") !== null;
  }

  async register(username: string, password: string) {
    try {
      const response = await this.axiosInstance.post("/register", { username, password });

      if (response.status === 201) {
        return response.data;
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Erro ao registrar usuário.");
    }
  }

  getToken() {
    return localStorage.getItem("authToken");
  }
}

export default new AuthService();
