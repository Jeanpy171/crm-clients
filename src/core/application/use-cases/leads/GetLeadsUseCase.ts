import type {
  FilterLeadsParams,
  ILeadRepository,
} from "../../../domain/repositories/ILeadRepository";
import type { LeadDTO } from "../../dtos/leads/LeadDTO";

export class GetLeadsUseCase {
  private repository: ILeadRepository;

  constructor(repository: ILeadRepository) {
    this.repository = repository;
  }

  async execute(params: FilterLeadsParams): Promise<LeadDTO[]> {
    return await this.repository.getAll(params);
  }
}
