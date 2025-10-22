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
    console.log("handleGetClients llamado con advisorId:", advisorId);
    dispatch(getClients({ page: 1, limit: 20, advisorId }));
  };

  const handleSaveClient = async (client: ClientDTO) => {
    try {
      const resultAction = await dispatch(saveClient(client));
      console.log("Resultado del saveClient:", resultAction);
      
      if (saveClient.fulfilled.match(resultAction)) {
        const newClient = resultAction.payload;
        console.log("Nuevo cliente guardado exitosamente:", newClient);
        
        addToast({
          title: "Cliente creado exitosamente",
          description: `El cliente ${newClient.name} ha sido creado`,
          color: "success",
          timeout: 2500,
        });
      } else if (saveClient.rejected.match(resultAction)) {
        console.error("Error al guardar el cliente:", resultAction.error);
        addToast({
          title: "Error al registrar el cliente",
          description: resultAction.error.message || "Error in save client",
          color: "danger",
          timeout: 2500,
        });
      }
    } catch (error) {
      console.error("Error inesperado al guardar el cliente:", error);
      addToast({
        title: "Error al registrar el cliente",
        description: "Error inesperado al guardar el cliente",
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
