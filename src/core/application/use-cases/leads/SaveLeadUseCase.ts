import type { ILeadRepository } from "../../../domain/repositories/ILeadRepository";
import type { LeadDTO } from "../../dtos/leads/LeadDTO";

export class SaveLeadUseCase {
  private repository: ILeadRepository;

  constructor(repository: ILeadRepository) {
    this.repository = repository;
  }
  async execute(lead: LeadDTO) {
    return this.repository.save(lead);
  }
}
