import type { InteractionPhase } from "../../../domain/value-objects/contact";

export interface HistoryDTO {
  id: string;
  idContact: string;
  type: "CLIENT" | "LEAD";
  action: "CREATE" | "UPDATE";
  pastInteractionPhase: InteractionPhase | null;
  newInteractionPhase: InteractionPhase | null;
  createdAt: Date;
}
