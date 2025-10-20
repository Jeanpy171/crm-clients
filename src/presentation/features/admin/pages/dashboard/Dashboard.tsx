import React from "react";
import { Card, CardBody, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import AIAnalysis from "../../../shared/components/ai-analysis/AIAnalysis";

// Mock data for the dashboard
const mockManagerStats = [
  {
    id: "1",
    name: "Juan Pérez",
    team: "Ventas Norte",
    leads: 45,
    conversions: 18,
    rate: "40%",
    advisors: 5,
    lastActivity: "2023-05-15",
  },
  {
    id: "2",
    name: "María López",
    team: "Ventas Sur",
    leads: 38,
    conversions: 12,
    rate: "32%",
    advisors: 4,
    lastActivity: "2023-05-16",
  },
  {
    id: "3",
    name: "Carlos Rodríguez",
    team: "Ventas Este",
    leads: 52,
    conversions: 22,
    rate: "42%",
    advisors: 6,
    lastActivity: "2023-05-14",
  },
];

// Mock data for KPIs
const mockKPIs = [
  {
    id: "1",
    name: "Meta de Ventas Mensual",
    target: 20,
    current: 15,
    percentage: 75,
    type: "sales",
  },
  {
    id: "2",
    name: "Llamadas Diarias",
    target: 30,
    current: 28,
    percentage: 93,
    type: "activity",
  },
  {
    id: "3",
    name: "Tasa de Conversión",
    target: 35,
    current: 32,
    percentage: 91,
    type: "quality",
  },
  {
    id: "4",
    name: "Clientes Nuevos",
    target: 15,
    current: 8,
    percentage: 53,
    type: "sales",
  },
];

interface DashboardTabProps {
  selectedManager: string;
  onManagerChange: (manager: string) => void;
  aiAnalysis: string | null;
  isLoadingAnalysis: boolean;
  onGenerateAnalysis: () => void;
}

const Dashboard: React.FC<DashboardTabProps> = ({
  selectedManager,
  onManagerChange,
  aiAnalysis,
  isLoadingAnalysis,
  onGenerateAnalysis,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Dashboard Administrativo
        </h2>
        <Select
          label="Filtrar por Gerente"
          selectedKeys={[selectedManager]}
          onSelectionChange={(keys) => {
            if (keys !== "all" && keys.size > 0) {
              onManagerChange(Array.from(keys)[0].toString());
            }
          }}
          className="w-64"
        >
          <SelectItem key="all">Todos los Gerentes</SelectItem>
          <SelectItem key="1">Juan Pérez</SelectItem>
          <SelectItem key="2">María López</SelectItem>
          <SelectItem key="3">Carlos Rodríguez</SelectItem>
        </Select>
      </div>

      {/* Managers Dashboard */}
      <Card>
        <CardBody className="p-5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon icon="lucide:trending-up" className="text-primary-500" />
            Rendimiento por Gerente de Ventas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockManagerStats.map((manager) => (
              <Card
                key={manager.id}
                shadow="sm"
                className="border border-gray-200"
              >
                <CardBody className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{manager.name}</h4>
                      <p className="text-xs text-gray-500">{manager.team}</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                      {manager.advisors} asesores
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Leads</p>
                      <p className="font-medium">{manager.leads}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Conversiones</p>
                      <p className="font-medium">{manager.conversions}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Tasa</p>
                      <p className="font-medium">{manager.rate}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs text-gray-500">Última actividad</p>
                      <p className="font-medium">
                        {new Date(manager.lastActivity).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* KPIs Summary Section */}
      <Card>
        <CardBody className="p-5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Icon icon="lucide:bar-chart-2" className="text-primary-500" />
            Resumen de Cumplimiento de KPIs
          </h3>

          <div className="grid grid-cols-4 gap-4">
            {mockKPIs.map((kpi) => (
              <Card key={kpi.id} shadow="sm" className="border border-gray-200">
                <CardBody className="p-4">
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-medium">{kpi.name}</h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          kpi.percentage >= 90
                            ? "bg-green-100 text-green-800"
                            : kpi.percentage >= 70
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {kpi.percentage}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>Meta: {kpi.target}</span>
                      <span>Actual: {kpi.current}</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          kpi.percentage >= 90
                            ? "bg-green-500"
                            : kpi.percentage >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${kpi.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>

      <AIAnalysis
        title="Análisis de IA del Equipo"
        onGenerateAnalysis={onGenerateAnalysis}
        isLoading={isLoadingAnalysis}
        analysisContent={aiAnalysis}
      />
    </div>
  );
};

export default Dashboard;
