import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  color = "default",
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case "positive":
        return "text-emerald-600";
      case "negative":
        return "text-red-600";
      case "neutral":
      default:
        return "text-gray-500";
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case "positive":
        return "lucide:trending-up";
      case "negative":
        return "lucide:trending-down";
      case "neutral":
      default:
        return "";
    }
  };

  return (
    <Card shadow="sm" className="overflow-visible">
      <CardBody className="p-4">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            {icon && <Icon icon={icon} className="text-xl text-gray-400" />}
          </div>
          <div className="text-2xl font-bold mb-1">{value}</div>
          {change && (
            <div
              className={`text-xs flex items-center gap-1 ${getChangeColor()}`}
            >
              {getChangeIcon() && (
                <Icon icon={getChangeIcon()} className="text-sm" />
              )}
              <span>{change}</span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};

export default StatCard;
