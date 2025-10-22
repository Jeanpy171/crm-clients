import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type {
  AppDispatch,
  RootState,
} from "../../../../infrastructure/store/store";
import { getLeads } from "../../../../infrastructure/store/slices/leads";
import { LeadMapper } from "../../../../infrastructure/http/mappers/LeadMapper";
import { useAuth } from "./useAuth";

export const useLeads = () => {
  const { leads, isLoading, error } = useSelector(
    (state: RootState) => state.leads
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleGetLeads = (advisorId: string) => {
    dispatch(getLeads({ page: 1, limit: 20, advisorId: advisorId }));
  };

  // const handleSaveLead = async (lead: LeadDTO) => {
  //   const resultAction = await dispatch(saveLead(lead));
  //   console.error(resultAction);
  //   if (saveTask.fulfilled.match(resultAction)) {
  //     const newLead = resultAction.payload;
  //     console.log("Nuevo task guardado:", newLead);
  //   } else {
  //     console.error("Error al guardar el task");
  //     addToast({
  //       title: "Error al registrar la tarea",
  //       description: error || "Error in save task",
  //       color: "danger",
  //       timeout: 2500,
  //     });
  //   }
  // };

  const mappedLeads = useMemo(
    () => (leads ? leads.map(LeadMapper.toDomain) : []),
    [leads]
  );

  return {
    leads: mappedLeads,
    isLoading,
    error,
    handleGetLeads,
  };
};
