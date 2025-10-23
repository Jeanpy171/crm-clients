import type { IClientRepository } from "../../../domain/repositories/IClientRepository";
import type { ClientDTO } from "../../dtos/clients/ClientDTO";

export class SaveClientUseCase {
  private repository: IClientRepository;

  constructor(repository: IClientRepository) {
    this.repository = repository;
  }
  async execute(client: Omit<ClientDTO, "history" | "type">) {
    return this.repository.save(client);
  }
}
