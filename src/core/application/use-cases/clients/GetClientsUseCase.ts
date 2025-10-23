import type {
  FilterClientsParams,
  IClientRepository,
} from "../../../domain/repositories/IClientRepository";
import type { ContactDTO } from "../../dtos/contact/ContactDTO";

export class GetClientsUseCase {
  private repository: IClientRepository;

  constructor(repository: IClientRepository) {
    this.repository = repository;
  }

  async execute(params: FilterClientsParams): Promise<ContactDTO[]> {
    return await this.repository.getAll(params);
  }
}
