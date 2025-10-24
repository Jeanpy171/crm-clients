import type {
  ContactStatus,
  InteractionPhase,
} from "../../../domain/value-objects/contact";

export interface HistoryDTO {
  id: string;
  idContact: string;
  type: "CLIENT" | "LEAD";
  action: "CREATE" | "UPDATE";
  status: ContactStatus;
  //   pastInteractionPhase: InteractionPhase | null;
  interactionPhase: InteractionPhase | null;
  createdAt: Date;
}
