import type { Contact } from "../../../domain/entities/Contact";

export interface LeadDTO extends Contact {
  id: string;
}
