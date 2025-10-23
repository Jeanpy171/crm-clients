import { useEffect, useState } from "react";
import { container } from "../../../../config/di-container";
import type { HistoryDTO } from "../../../../core/application/dtos/contact/HistoryDTO";

export const useContactHistory = (
  id: string | null,
  initialHistory: HistoryDTO[] = []
) => {
  const [history, setHistory] = useState<HistoryDTO[]>(initialHistory);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    if (history.length) return;

    handleGetHistoryById(id);
  }, [id]);

  const handleGetHistoryById = async (id: string) => {
    try {
      setIsLoading(true);
      const data = await container.getHistoryUseCase.execute(id);
      setHistory(data);
    } catch (e: any) {
      setError(e.message || "Error al cargar historial");
    } finally {
      setIsLoading(false);
    }
  };

  return { history, setHistory, isLoading, error, handleGetHistoryById };
};
