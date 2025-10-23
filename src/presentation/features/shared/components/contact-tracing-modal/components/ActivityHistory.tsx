import { useEffect } from "react";
import type { HistoryDTO } from "../../../../../../core/application/dtos/contact/HistoryDTO";
import { useContactHistory } from "../../../hooks/useContactHistory";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@heroui/react";
import { formatDateWithTime } from "../../../helpers/date";

export const ActivityHistory = ({
  idContact,
  history,
  onSetHistory,
}: {
  idContact: string | null;
  history: HistoryDTO[];
  onSetHistory: (arg0: HistoryDTO[]) => void;
}) => {
  const {
    history: updatedHistory,
    isLoading,
    error,
  } = useContactHistory(idContact, history);

  useEffect(() => {
    if (updatedHistory.length) {
      onSetHistory(updatedHistory);
    }
  }, [updatedHistory, history, onSetHistory]);

  return (
    <Card className="w-full">
      <CardHeader className="font-bold">Historial de Actividades</CardHeader>
      <Divider />
      <CardBody>
        {error && <p className="text-red-500">{error}</p>}
        {isLoading ? (
          <p>Cargando...</p>
        ) : updatedHistory.length ? (
          <ul className="relative flex flex-col gap-6 pl-6 before:absolute before:left-3 before:top-0 before:h-full before:w-[2px] before:bg-gray-300">
            {updatedHistory.map((h) => (
              <li key={h.id} className="relative flex flex-col gap-2">
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-blue-800 border-2 border-white"></div>

                <div className="bg-white border-l-4 border-l-gray-600 shadow-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-1">
                    <Chip
                      color={h.action === "CREATE" ? "success" : "warning"}
                      size="sm"
                    >
                      {h.action === "CREATE"
                        ? "Contacto creado"
                        : "Contacto actualizado"}
                    </Chip>
                    <span className="text-xs text-gray-500">
                      {formatDateWithTime(new Date(h.createdAt))}
                    </span>
                  </div>

                  <p className="text-sm text-gray-700">
                    {h.action === "UPDATE"
                      ? `Se cambió de etapa ${h.pastInteractionPhase} → ${h.newInteractionPhase}`
                      : "Se creó el contacto en el sistema."}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aún no hay historial de actividades registrado.</p>
        )}
      </CardBody>
      <Divider />
      <CardFooter className="flex flex-col gap-2">
        <div className="w-full flex justify-between items-center">
          <p>Análisis de IA</p>
          <Button>Analizar</Button>
        </div>
        <em>
          Haz click en "Analizar" para obtener insights de IA sobre este lead.
        </em>
      </CardFooter>
    </Card>
  );
};
