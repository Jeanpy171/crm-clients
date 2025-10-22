import type {
  FilterClientsParams,
  IClientRepository,
} from "../../../domain/repositories/IClientRepository";
import type { ClientDTO } from "../../dtos/clients/ClientDTO";

export class GetClientsByAdvisorIdUseCase {
  private repository: IClientRepository;

  constructor(repository: IClientRepository) {
    this.repository = repository;
  }

  async execute(params: FilterClientsParams): Promise<ClientDTO[]> {
    return await this.repository.getAll(params);
  }
}
