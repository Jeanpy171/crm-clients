import axios, { type AxiosInstance } from "axios";

export class HttpClient {
  private static instance: HttpClient;
  private client: AxiosInstance;

  private constructor() {
    this.client = axios.create({
      baseURL: "https://api.midominio.com",
      headers: { "Content-Type": "application/json" },
    });
  }

  static getInstance() {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  setToken(token: string | null) {
    if (token) {
      this.client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.client.defaults.headers.common["Authorization"];
    }
  }

  get<T>(url: string) {
    return this.client.get<T>(url).then((r) => r.data);
  }

  post<T>(url: string, body: any) {
    return this.client.post<T>(url, body).then((r) => r.data);
  }

  patch<T>(url: string, body: any) {
    return this.client.patch<T>(url, body).then((r) => r.data);
  }

  delete<T>(url: string) {
    return this.client.delete<T>(url).then((r) => r.data);
  }
}
