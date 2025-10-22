// utils/mapValueToChipColor.ts

import {
  ContactStatus,
  InteractionPhase,
  InterestLevel,
} from "../../../../core/domain/value-objects/contact";
import { TaskStatus } from "../../../../core/domain/value-objects/task";

type ColorClass = string;

type ChipColorMap = Record<string, Record<string, ColorClass>>;

const chipColorMap: ChipColorMap = {
  taskStatus: {
    [TaskStatus.OPENED]: "bg-amber-100 text-amber-700",
    [TaskStatus.PROGRAMED]: "bg-blue-100 text-blue-700",
    [TaskStatus.COMPLETED]: "bg-green-100 text-green-700",
    [TaskStatus.CLOSED]: "bg-red-100 text-red-700",
  },
  interestLevel: {
    [InterestLevel.VERY_INTERESTED]: "bg-green-100 text-green-700",
    [InterestLevel.INTEREST]: "bg-yellow-100 text-yellow-700",
    [InterestLevel.NOT_VERY_INTERESTED]: "bg-red-100 text-red-700",
  },
  contactStatus: {
    [ContactStatus.LOYAL]: "bg-green-100 text-green-700",
    [ContactStatus.PROSPECT]: "bg-gray-100 text-gray-700",
    [ContactStatus.LOST]: "bg-red-100 text-red-700",
  },
  interactionPhase: {
    [InteractionPhase.GRADE]: "bg-blue-100 text-blue-700",
    [InteractionPhase.DEVELOP]: "bg-orange-100 text-orange-700",
    [InteractionPhase.PROPOSE]: "bg-purple-100 text-purple-700",
    [InteractionPhase.CLOSING]: "bg-green-100 text-green-700",
  },
};

export const mapValueToChipColor = (
  value: string,
  category: keyof typeof chipColorMap
): ColorClass => {
  const colorMap = chipColorMap[category];

  return colorMap?.[value] || "bg-default-100 text-default-700";
};
