import type { HistoryDTO } from "../../../core/application/dtos/contact/HistoryDTO";
import { InteractionPhase } from "../../../core/domain/value-objects/contact";

export const contactActivity: HistoryDTO[] = [
  {
    id: "lkasnflksdnflkdsnflksd",
    idContact: "sl;fmdfksmd;lvsm;dvksmd;kvs",
    type: "CLIENT",
    action: "CREATE",
    pastInteractionPhase: null,
    newInteractionPhase: InteractionPhase.DEVELOP,
    createdAt: new Date("22-10-2025"),
  },
  {
    id: "kmnoinubhububbubjabsda",
    idContact: "sl;fmdfksmd;lvsm;dvksmd;kvs",
    type: "CLIENT",
    action: "UPDATE",
    pastInteractionPhase: InteractionPhase.GRADE,
    newInteractionPhase: InteractionPhase.DEVELOP,
    createdAt: new Date(),
  },
  {
    id: "kr[pe[rpkg[perkg[perkg[pekrp",
    idContact: "sl;fmdfksmd;lvsm;dvksmd;kvs",
    type: "CLIENT",
    action: "UPDATE",
    pastInteractionPhase: InteractionPhase.DEVELOP,
    newInteractionPhase: InteractionPhase.CLOSING,
    createdAt: new Date(),
  },
];
