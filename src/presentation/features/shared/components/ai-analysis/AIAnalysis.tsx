import React from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface AIAnalysisSectionProps {
  title: string;
  onGenerateAnalysis: () => void;
  isLoading?: boolean;
  analysisContent?: string | null;
}

const AIAnalysis: React.FC<AIAnalysisSectionProps> = ({
  title,
  onGenerateAnalysis,
  isLoading = false,
  analysisContent = null,
}) => {
  return (
    <Card className="w-full mt-6">
      <CardBody className="p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Icon icon="lucide:brain-circuit" className="text-primary-500" />
            {title}
          </h3>
          <Button
            color="primary"
            variant="flat"
            onPress={onGenerateAnalysis}
            isLoading={isLoading}
            startContent={<Icon icon="lucide:sparkles" />}
          >
            Generar Análisis
          </Button>
        </div>

        {analysisContent ? (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700 whitespace-pre-line">
              {analysisContent}
            </p>
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
            <div className="mb-3 text-3xl">🤖</div>
            <h4 className="text-lg font-medium mb-2">
              Análisis de IA Disponible
            </h4>
            <p className="text-gray-600">
              Haz click en "Generar Análisis" para obtener insights inteligentes
              sobre el rendimiento del equipo, tendencias de ventas y
              recomendaciones estratégicas.
            </p>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default AIAnalysis;
