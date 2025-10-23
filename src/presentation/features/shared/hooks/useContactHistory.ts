import { useEffect, useState, useMemo, useRef } from "react";
import type { HistoryDTO } from "../../../../core/application/dtos/contact/HistoryDTO";
import { container } from "../../../../config/di-container";

export const useContactHistory = (
  id: string | null,
  initialHistory: HistoryDTO[] = []
) => {
  const [remoteHistory, setRemoteHistory] = useState<HistoryDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasFetchedRemote = useRef(false);

  useEffect(() => {
    if (!id || hasFetchedRemote.current) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await container.getHistoryUseCase.execute(id);
        setRemoteHistory(data);
        hasFetchedRemote.current = true;
      } catch (e: any) {
        setError(e.message || "Error al cargar historial");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const history = useMemo(() => {
    const map = new Map<string, HistoryDTO>();
    [...remoteHistory, ...initialHistory].forEach((h) => {
      map.set(h.id, h);
    });
    return Array.from(map.values());
  }, [remoteHistory, initialHistory]);

  return { history, isLoading, error, setRemoteHistory };
};
