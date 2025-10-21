import { configureStore } from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import authReducer from "../store/slices/auth";
import taskReducer from "../store/slices/tasks";
import taskPriorityReducer from "../store/slices/taskPriorities";
import taskTypeReducer from "../store/slices/taskTypes";
import taskStatusReducer from "../store/slices/taskStatus";
import contactStatusReducer from "../store/slices/contactStatus";
import interactionPhaseReducer from "../store/slices/interactionPhase";
import interestLevelReducer from "../store/slices/interestLevel";
import housingSectorReducer from "../store/slices/housingSector";
import interestInNewServiceReducer from "../store/slices/interestInNewService";
import preferredPlanReducer from "../store/slices/preferredPlan";
import areasForImprovementReducer from "../store/slices/areasForImprovement";
import serviceSatisfactionReducer from "../store/slices/serviceSatisfaction";
import serviceDurationReducer from "../store/slices/serviceDuration";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    taskPriorities: taskPriorityReducer,
    taskTypes: taskTypeReducer,
    taskStatus: taskStatusReducer,
    contactStatus: contactStatusReducer,
    interactionPhases: interactionPhaseReducer,
    interestLevels: interestLevelReducer,
    housingSectors: housingSectorReducer,
    interestInNewServices: interestInNewServiceReducer,
    preferredPlans: preferredPlanReducer,
    areasForImprovement: areasForImprovementReducer,
    serviceSatisfactions: serviceSatisfactionReducer,
    serviceDurations: serviceDurationReducer,
  },
});
