import type { ClientDTO } from "../../../core/application/dtos/clients/ClientDTO";
import type {
  FilterClientsParams,
  IClientRepository,
} from "../../../core/domain/repositories/IClientRepository";
import { ClientMapper } from "../../http/mappers/ClientMapper";
import { clientMocks } from "../data/clientMock";

export class MockClientRepository implements IClientRepository {
  private clients: ClientDTO[] = [];

  constructor() {
    // Initialize with mock data
    this.clients = clientMocks.map(ClientMapper.fromApiToDto);
  }
  async getAll({
    page,
    limit,
    advisorId,
  }: FilterClientsParams): Promise<ClientDTO[]> {
    console.warn("ADVISOR ID: ", advisorId);
    return new Promise((resolve) => {
      setTimeout(() => {
        let clients = [...this.clients]; // Use the persistent clients array

        if (advisorId) {
          console.log("Filtrando clientes por advisorId:", advisorId);
          console.log("Total de clientes antes del filtro:", clients.length);
          clients = clients.filter((client) => client.advisor === advisorId);
          console.warn("CLIENTES FILTRADOS: ", clients);
          console.log("Total de clientes después del filtro:", clients.length);
        }

        resolve(clients);
      }, 1500);
    });
  }

  //   async getAllByAdvisorId(id: string): Promise<ClientDTO[]> {
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         const data = clientMocks as any[];
  //         const clients = data.map(ClientMapper.fromApiToDto);
  //         const filteredClients = clients.filter(
  //           (client) => client.advisor === id
  //         );
  //         resolve(filteredClients);
  //       }, 1500);
  //     });
  //   }

  async getById(id: string): Promise<ClientDTO | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = clientMocks.find((client) => client.id === id);
        if (!response) throw new Error("Cliente no encontrado");

        const client = response;

        resolve(ClientMapper.fromApiToDto(client));
      }, 1500);
    });
  }

  async save(client: ClientDTO): Promise<ClientDTO> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a unique ID if not provided
        const clientWithId = {
          ...client,
          id: client.id || `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        
        // Add the new client to the persistent array
        this.clients.push(clientWithId);
        
        console.log("Cliente guardado en mock repository:", clientWithId);
        console.log("Total de clientes en repositorio:", this.clients.length);
        resolve(clientWithId);
      }, 1500);
    });
  }

  async delete(id: string): Promise<void> {
    // await this.http.delete(`/api/tasks/${id}`);
  }

  async patch(id: string, updates: Partial<ClientDTO>): Promise<void> {
    // await this.http.patch(`/api/tasks/${id}`, JSON.stringify(updates));
  }
}
