import { GetTasksUseCase } from "../core/application/use-cases/tasks/GetTaskUseCase";
import { HttpTaskRepository } from "../infrastructure/http/repositories/HttpTaskRepository";

class DIContainer {
  // ============ REPOSITORIES ============
  // private leadRepository = new HttpLeadRepository();
  // private clientRepository = new HttpClientRepository();
  private taskRepository = new HttpTaskRepository();
  // private userRepository = new HttpUserRepository();

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
