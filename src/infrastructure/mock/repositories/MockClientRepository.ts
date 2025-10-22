import type { ClientDTO } from "../../../core/application/dtos/clients/ClientDTO";
import type {
  FilterClientsParams,
  IClientRepository,
} from "../../../core/domain/repositories/IClientRepository";
import { ClientMapper } from "../../http/mappers/ClientMapper";
import { clientMocks } from "../data/clientMock";

export class MockClientRepository implements IClientRepository {
  async getAll({
    page,
    limit,
    advisorId,
  }: FilterClientsParams): Promise<ClientDTO[]> {
    console.warn("ADVISOR ID: ", advisorId);
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = clientMocks as any[];
        let clients = data.map(ClientMapper.fromApiToDto);

        if (advisorId) {
          clients = clients.filter((client) => client.advisor === advisorId);
          //   console.warn("CLIENTES FILTRADOS: ", clients);
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
    // const dto = TaskMapper.toDomain(task);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(client);
      }, 1500);
    });
    // await this.http.post(`/api/tasks/`, JSON.stringify(dto));
  }

  async delete(id: string): Promise<void> {
    // await this.http.delete(`/api/tasks/${id}`);
  }

  async patch(id: string, updates: Partial<ClientDTO>): Promise<void> {
    // await this.http.patch(`/api/tasks/${id}`, JSON.stringify(updates));
  }
}
