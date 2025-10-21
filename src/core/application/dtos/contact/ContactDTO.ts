import type {
  ContactStatus,
  InteractionPhase,
  InterestLevel,
} from "../../../domain/value-objects/contact";

export interface ContactDTO {
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

  advisor?: string;
}
