import type { ClientDTO } from "../../../core/application/dtos/clients/ClientDTO";
import type { ContactDTO } from "../../../core/application/dtos/contact/ContactDTO";
import type { HistoryDTO } from "../../../core/application/dtos/contact/HistoryDTO";
import type {
  FilterClientsParams,
  IClientRepository,
} from "../../../core/domain/repositories/IClientRepository";
import { ClientMapper } from "../../http/mappers/ClientMapper";
import { ContactMapper } from "../../http/mappers/ContactMapper";
import { clientMocks } from "../data/clientMock";
import { contactActivity } from "../data/contactActivity";

export class MockClientRepository implements IClientRepository {
  private clients: ContactDTO[] = [];

  constructor() {
    // Initialize with mock data
    const data = clientMocks.map((client) => ({ ...client, type: "CLIENT" }));
    this.clients = data.map(ContactMapper.fromApiToDto);
  }

  async saveHistory(history: HistoryDTO): Promise<HistoryDTO> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    contactActivity.push(history);
    return history;
  }

  async getHistoryById(id: string): Promise<HistoryDTO[]> {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const data = contactActivity.filter(
      (activity) => activity.idContact === id
    );
    return data;
  }

  async getAll({
    page,
    limit,
    advisorId,
  }: FilterClientsParams): Promise<ContactDTO[]> {
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
        const response = this.clients.find((client) => client.id === id);
        if (!response) throw new Error("Cliente no encontrado");

        const client = response;

        resolve(ClientMapper.fromApiToDto(client));
      }, 1500);
    });
  }

  async save(client: ContactDTO): Promise<ClientDTO> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Generate a unique ID if not provided
        // const clientWithId = {
        //   ...client,
        //   id:
        //     client.id ||
        //     `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        // };

        // Add the new client to the persistent array
        this.clients.push(client);

        console.log("Total de clientes en repositorio:", this.clients.length);
        resolve(client);
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
