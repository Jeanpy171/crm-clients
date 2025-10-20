import React from "react";
import StatCard from "./components/StatCard";

interface StatsGridProps {
  stats: Array<{
    id: string;
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
  }>;
  columns?: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, columns = 3 }) => {
  const gridCols = `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`;

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {stats.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          changeType={stat.changeType}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsGrid;
