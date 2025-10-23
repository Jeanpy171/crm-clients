import type { HistoryDTO } from "../../../core/application/dtos/contact/HistoryDTO";
import { InteractionPhase } from "../../../core/domain/value-objects/contact";

export const contactActivity: HistoryDTO[] = [
  {
    id: "lkasnflksdnflkdsnflksd",
    idContact: "sl;fmdfksmd;lvsm;dvksmd;kvs",
    type: "CLIENT",
    pastInteractionPhase: null,
    newInteractionPhase: InteractionPhase.DEVELOP,
    createdAt: new Date("22-10-2025"),
  },
  {
    id: "kmnoinubhububbubjabsda",
    idContact: "sl;fmdfksmd;lvsm;dvksmd;kvs",
    type: "LEAD",
    pastInteractionPhase: InteractionPhase.GRADE,
    newInteractionPhase: InteractionPhase.DEVELOP,
    createdAt: new Date(),
  },
];
