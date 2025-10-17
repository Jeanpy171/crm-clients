export class HttpClient {
  private static instance: HttpClient;
  private baseUrl: string = "";
  private headers: Record<string, string> = {};

  // constructor(baseUrl: string, token?: string) {
  //   this.baseUrl = baseUrl;
  //   this.headers = {
  //     "Content-Type": "application/json",
  //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //   };
  // }

  private constructor() {}

  static getInstance() {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  setToken(token: string) {
    this.headers["Authorization"] = `Bearer ${token}`;
  }

  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
    });
    if (!res.ok) throw new Error("Error en GET " + endpoint);
    return res.json();
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Error en POST " + endpoint);
    return res.json();
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Error en PUT " + endpoint);
    return res.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: this.headers,
    });
    if (!res.ok) throw new Error("Error en DELETE " + endpoint);
    return res.json();
  }
}
