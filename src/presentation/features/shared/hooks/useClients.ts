import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { addToast } from "@heroui/react";
import {
  getClients,
  saveClient,
} from "../../../../infrastructure/store/slices/clients";
import type { ClientDTO } from "../../../../core/application/dtos/clients/ClientDTO";
import { ClientMapper } from "../../../../infrastructure/http/mappers/ClientMapper";

export const useClients = () => {
  const { clients, isLoading, error } = useSelector(
    (state: RootState) => state.clients
  );
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   if (!clients.length) {
  //     handleGetClients();
  //   }
  // }, [clients]);

  const handleGetClients = (advisorId: string) => {
    dispatch(getClients({ page: 1, limit: 20, advisorId }));
  };

  const handleSaveClient = async (client: ClientDTO) => {
    const resultAction = await dispatch(saveClient(client));
    console.error(resultAction);
    if (saveClient.fulfilled.match(resultAction)) {
      const newClient = resultAction.payload;
      console.log("Nuevo cliente guardado:", newClient);
    } else {
      console.error("Error al guardar el cliente");
      addToast({
        title: "Error al registrar el cliente",
        description: error || "Error in save client",
        color: "danger",
        timeout: 2500,
      });
    }
  };

  return {
    clients: clients ? clients?.map(ClientMapper.toDomain) : [],
    isLoading,
    error,
    handleGetClients,
    handleSaveClient,
  };
};
