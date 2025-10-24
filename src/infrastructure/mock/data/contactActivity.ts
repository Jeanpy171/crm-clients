import type { HistoryDTO } from "../../../core/application/dtos/contact/HistoryDTO";
import {
  ContactStatus,
  InteractionPhase,
} from "../../../core/domain/value-objects/contact";

export const contactActivity: HistoryDTO[] = [
  {
    id: "lkasnflksdnflkdsnflksd",
    idContact: "sl;fmdfksmd;lvsm;dvksmd;kvs",
    type: "CLIENT",
    action: "CREATE",
    status: ContactStatus.PROSPECT,
    // pastInteractionPhase: null,
    interactionPhase: null,
    // newInteractionPhase: InteractionPhase.DEVELOP,
    createdAt: new Date("22-10-2025"),
  },
  {
    id: "kmnoinubhububbubjabsda",
    idContact: "sl;fmdfksmd;lvsm;dvksmd;kvs",
    type: "CLIENT",
    action: "UPDATE",
    status: ContactStatus.PROSPECT,
    // pastInteractionPhase: InteractionPhase.GRADE,
    interactionPhase: InteractionPhase.GRADE,
    // newInteractionPhase: InteractionPhase.DEVELOP,
    createdAt: new Date(),
  },
  {
    id: "kr[pe[rpkg[perkg[perkg[pekrp",
    idContact: "sl;fmdfksmd;lvsm;dvksmd;kvs",
    type: "CLIENT",
    action: "UPDATE",
    status: ContactStatus.PROSPECT,
    interactionPhase: InteractionPhase.DEVELOP,
    // pastInteractionPhase: InteractionPhase.DEVELOP,
    // newInteractionPhase: InteractionPhase.CLOSING,
    createdAt: new Date(),
  },
];
