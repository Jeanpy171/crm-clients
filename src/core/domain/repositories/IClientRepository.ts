export interface IClientRepository {
  getAll(): Promise<any[]>;
  getById(id: string): Promise<any | null>;
  save(client: any): Promise<void>;
  delete(id: string): Promise<void>;
  patch(id: string, updates: Partial<any>): Promise<void>;
}
