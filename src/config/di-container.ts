import { GetTasksUseCase } from "../core/application/use-cases/tasks/GetTaskUseCase";
import { SaveTaskUseCase } from "../core/application/use-cases/tasks/SaveTaskUseCase";
import { GetTaskPriorityCatalogUseCase } from "../core/application/use-cases/tasks/GetTaskPriorityCatalogUseCase";
import { GetTaskStatusCatalogUseCase } from "../core/application/use-cases/tasks/GetTaskStatusCatalogUseCase";
import { GetTaskTypeCatalogUseCase } from "../core/application/use-cases/tasks/GetTaskTypeCatalogUseCase";
import { SignInUseCase } from "../core/application/use-cases/users/SignInUseCase";
import { SignOutUseCase } from "../core/application/use-cases/users/SignOutUseCase";
// import { HttpTaskRepository } from "../infrastructure/http/repositories/HttpTaskRepository";
import { MockTaskRepository } from "../infrastructure/mock/repositories/MockTaskRepository";
// import { HttpUserRepository } from "../infrastructure/http/repositories/HttpUserRepository";
import { MockUserRepository } from "../infrastructure/mock/repositories/MockUserRepository";
import { MockContactRepository } from "../infrastructure/mock/repositories/MockContactRepository";
import { GetContactStatusCatalogUseCase } from "../core/application/use-cases/contact/GetContactStatusCatalogUseCase";
import { GetInteractionPhaseCatalogUseCase } from "../core/application/use-cases/contact/GetInteractionPhaseCatalogUseCase";
import { GetInterestLevelCatalogUseCase } from "../core/application/use-cases/contact/GetInterestLevelCatalogUseCase";
import { GetHousingSectorCatalogUseCase } from "../core/application/use-cases/contact/GetHousingSectorCatalogUseCase";
import { GetInterestInNewServiceCatalogUseCase } from "../core/application/use-cases/contact/GetInterestInNewServiceCatalogUseCase";
import { GetPreferredPlanCatalogUseCase } from "../core/application/use-cases/contact/GetPreferredPlanCatalogUseCase";
import { GetAreasForImprovementCatalogUseCase } from "../core/application/use-cases/contact/GetAreasForImprovementCatalogUseCase";
import { GetServiceSatisfactionCatalogUseCase } from "../core/application/use-cases/contact/GetServiceSatisfactionCatalogUseCase";
import { GetServiceDurationCatalogUseCase } from "../core/application/use-cases/contact/GetServiceDurationCatalogUseCase";

class DIContainer {
  // ============ MOCK REPOSITORIES ============
  private taskRepository = new MockTaskRepository();
  private userRepository = new MockUserRepository();
  private contactStatusRepository = new MockContactRepository();
  // ============ HTTP REPOSITORIES ============
  // private leadRepository = new HttpLeadRepository();
  // private clientRepository = new HttpClientRepository();
  // private taskRepository = new HttpTaskRepository();
  // private userRepository = new HttpUserRepository();

  // ============ USE CASES - AUTH ============
  signInUseCase = new SignInUseCase(this.userRepository);
  signOutUseCase = new SignOutUseCase(this.userRepository);

  // ============ USE CASES - CONTACT ============
  getContactStatusUseCase = new GetContactStatusCatalogUseCase(
    this.contactStatusRepository
  );
  getInteractionPhaseUseCase = new GetInteractionPhaseCatalogUseCase(
    this.contactStatusRepository
  );
  getInterestLevelUseCase = new GetInterestLevelCatalogUseCase(
    this.contactStatusRepository
  );
  getHousingSectorUseCase = new GetHousingSectorCatalogUseCase(
    this.contactStatusRepository
  );
  getInterestInNewServiceUseCase = new GetInterestInNewServiceCatalogUseCase(
    this.contactStatusRepository
  );
  getPreferredPlanUseCase = new GetPreferredPlanCatalogUseCase(
    this.contactStatusRepository
  );
  getAreasForImprovementUseCase = new GetAreasForImprovementCatalogUseCase(
    this.contactStatusRepository
  );
  getServiceSatisfactionUseCase = new GetServiceSatisfactionCatalogUseCase(
    this.contactStatusRepository
  );
  getServiceDurationUseCase = new GetServiceDurationCatalogUseCase(
    this.contactStatusRepository
  );

  // ============ USE CASES - LEADS ============
  // createLeadUseCase = new CreateLeadUseCase(this.leadRepository);
  // updateLeadUseCase = new UpdateLeadUseCase(this.leadRepository);
  // updateLeadStatusUseCase = new UpdateLeadStatusUseCase(this.leadRepository);
  // assignLeadUseCase = new AssignLeadUseCase(this.leadRepository);
  // reassignLeadsBulkUseCase = new ReassignLeadsBulkUseCase(this.leadRepository);
  // getLeadsByStatusUseCase = new GetLeadsByStatusUseCase(this.leadRepository);
  // deleteLeadUseCase = new DeleteLeadUseCase(this.leadRepository);

  // ============ USE CASES - CLIENTS ============
  // convertLeadToClientUseCase = new ConvertLeadToClientUseCase(
  //   this.leadRepository,
  //   this.clientRepository
  // );
  // getClientStatsUseCase = new GetClientStatsUseCase(this.clientRepository);

  // ============ USE CASES - TASKS ============
  getTasksUseCase = new GetTasksUseCase(this.taskRepository);
  getTaskPriorityCatalog = new GetTaskPriorityCatalogUseCase(
    this.taskRepository
  );
  getTaskTypeCatalog = new GetTaskTypeCatalogUseCase(this.taskRepository);
  getTaskStatusCatalog = new GetTaskStatusCatalogUseCase(this.taskRepository);
  saveTaskUseCase = new SaveTaskUseCase(this.taskRepository);
  // createTaskUseCase = new CreateTaskUseCase(this.taskRepository);
  // completeTaskUseCase = new CompleteTaskUseCase(this.taskRepository);

  // ============ USE CASES -// ============ USE CASES - DASHBOARD ============
  // getDashboardStatsUseCase = new GetDashboardStatsUseCase(
  //   this.leadRepository,
  //   this.clientRepository,
  //   this.taskRepository
  // );
  // getTeamPerformanceUseCase = new GetTeamPerformanceUseCase(
  //   this.leadRepository,
  //   this.userRepository
  // );
  // getPersonalMetricsUseCase = new GetPersonalMetricsUseCase(
  //   this.leadRepository,
  //   this.taskRepository
  // );

  // ============ USE CASES - ANALYTICS ============
  // analyzeLeadEfficiencyUseCase = new AnalyzeLeadEfficiencyUseCase(
  //   this.leadRepository
  // );
  // predictLeadConversionUseCase = new PredictLeadConversionUseCase(
  //   this.leadRepository
  // );

  // ============ SERVICES ============
  // authService = new AuthService(this.userRepository);
  // permissionService = new PermissionService();
  // notificationService = new NotificationService();
}

export const container = new DIContainer();
