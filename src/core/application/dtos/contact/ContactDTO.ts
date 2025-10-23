import type {
  ContactStatus,
  InteractionPhase,
  InterestLevel,
} from "../../../domain/value-objects/contact";
import type { HistoryDTO } from "./HistoryDTO";

export interface ContactDTO {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  interactionPhase: InteractionPhase;
  interestLevel: InterestLevel;
  status: ContactStatus;
  createdAt: string;
  lastActivity: string;
  followUpNotes: string;
  history: HistoryDTO[];
  advisor?: string;
}
