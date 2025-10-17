// // Import all page components
// import LoginPage from "../../pages/login";
// import ManagerDashboard from "../../pages/manager";
// import AdvisorDashboard from "../../pages/advisor";
// import ContractGeneratorDashboard from "../../pages/contract-generator";
// import ContractCreationPage from "../../pages/contract-creation";
// import AdminDashboard from "../../pages/admin";

// // Manager sub-pages
// import ManagerDashboardScreen from "../../pages/manager/screens/ManagerDashboardScreen";
// import TeamStatsScreen from "../../pages/manager/screens/TeamStatsScreen";
// import AdvisorManagementScreen from "../../pages/manager/screens/AdvisorManagementScreen";
// import SequencesScreen from "../../pages/manager/screens/SequencesScreen";
// import CalendarScreen from "../../pages/manager/screens/CalendarScreen";
// import LeadsScreen from "../../pages/manager/screens/LeadsScreen";
// import ClientsScreen from "../../pages/manager/screens/ClientsScreen";

// // Advisor sub-pages
// import AdvisorDashboardPage from "../../pages/advisor/dashboard";
// import Kanban from "../../pages/advisor/kanban";
// import Tasks from "../../pages/advisor/tasks";
// import AdvisorCalendar from "../../pages/advisor/calendar";
// import AdvisorLeads from "../../pages/advisor/leads";
// import AdvisorClients from "../../pages/advisor/clients";

// // Admin sub-pages
// import AdminDashboardTab from "../../pages/admin/dashboard";
// import GeneralTab from "../../pages/admin/general";
// import AdvisorsTab from "../../pages/admin/advisors";
// import AdminCalendarTab from "../../pages/admin/calendar";
// import AdminLeadsTab from "../../pages/admin/leads";
// import AdminClientsTab from "../../pages/admin/clients";
// import { path } from "framer-motion/client";
import { Navigate } from "react-router-dom";
import React from "react";
import SignInPage from "../../ui/auth/pages/signin/SignInPage";
import AdminDashboard from "../../ui/admin/pages/dashboard/Dashboard";
import AdvisorDashboard from "../../ui/advisor/pages/dashboard/Dashboard";
import { MainLayout } from "../../ui/shared/layouts/MainLayout";

export interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  role?: string;
  title?: string;
  exact?: boolean;
  children?: RouteConfig[];
}

export const Routes = {
  auth: {
    path: "/",
    layout: React.Fragment,
    routes: {
      redirect: {
        title: "",
        path: "",
        element: () => <Navigate to={"signin"} />,
      },
      signin: {
        title: "",
        path: "signin",
        element: SignInPage,
      },
    },
  },
  admin: {
    path: "admin",
    layout: MainLayout,
    routes: {
      dashboard: {
        title: "Dashboard",
        path: "",
        element: AdminDashboard,
      },
      general: {
        title: "General",
        path: "general",
        element: () => <div>General Page</div>,
      },
    },
  },
  manager: {
    path: "manager",
    layout: MainLayout,
    routes: {
      dashboard: {
        title: "Dashboard",
        path: "",
        element: AdminDashboard,
      },
    },
  },
  advisor: {
    path: "advisor",
    layout: MainLayout,
    routes: {
      dashboard: {
        title: "Dashboard",
        path: "",
        element: AdvisorDashboard,
      },
      kanban: {
        title: "Kanban Clientes",
        path: "kanban",
        element: AdvisorDashboard,
      },
      tasks: {
        title: "Tareas",
        path: "tasks",
        element: AdvisorDashboard,
      },
      schedule: {
        title: "Calendario",
        path: "schedule",
        element: AdvisorDashboard,
      },
      leads: {
        title: "Leads",
        path: "leads",
        element: AdvisorDashboard,
      },
      clients: {
        title: "clientes",
        path: "clients",
        element: AdvisorDashboard,
      },
    },
  },
};

// export const routes: RouteConfig[] = [
//   // Public routes
//   {
//     path: "/login",
//     component: LoginPage,
//     title: "Login",
//     exact: true,
//   },

//   // Manager routes
//   {
//     path: "/manager",
//     component: ManagerDashboard,
//     role: "manager",
//     title: "Manager Dashboard",
//     children: [
//       {
//         path: "",
//         component: ManagerDashboardScreen,
//         title: "Dashboard",
//         exact: true,
//       },
//       {
//         path: "team-stats",
//         component: TeamStatsScreen,
//         title: "Estadísticas",
//       },
//       {
//         path: "advisor-management",
//         component: AdvisorManagementScreen,
//         title: "Asesores",
//       },
//       {
//         path: "sequences",
//         component: SequencesScreen,
//         title: "Secuencias",
//       },
//       {
//         path: "calendar",
//         component: CalendarScreen,
//         title: "Calendario",
//       },
//       {
//         path: "leads",
//         component: LeadsScreen,
//         title: "Leads",
//       },
//       {
//         path: "clients",
//         component: ClientsScreen,
//         title: "Clientes",
//       },
//     ],
//   },

//   // Advisor routes
//   {
//     path: "/advisor",
//     component: AdvisorDashboard,
//     role: "advisor",
//     title: "Advisor Dashboard",
//     children: [
//       {
//         path: "",
//         component: AdvisorDashboardPage,
//         title: "Dashboard",
//         exact: true,
//       },
//       {
//         path: "kanban",
//         component: Kanban,
//         title: "Kanban clientes",
//       },
//       /*{
//         path: 'tasks',
//         component: Tasks,
//         title: 'Tareas',
//       },
//       {
//         path: 'calendar',
//         component: AdvisorCalendar,
//         title: 'Calendario',
//       },
//       {
//         path: 'leads',
//         component: AdvisorLeads,
//         title: 'Leads',
//       },
//       {
//         path: 'clients',
//         component: AdvisorClients,
//         title: 'Clientes',
//       },
//       */
//     ],
//   },

//   // Admin routes
//   {
//     path: "/admin",
//     component: AdminDashboard,
//     role: "admin",
//     title: "Admin Dashboard",
//     children: [
//       {
//         path: "",
//         component: AdminDashboardTab,
//         title: "Dashboard",
//         exact: true,
//       },
//       {
//         path: "general",
//         component: GeneralTab,
//         title: "General",
//       },
//       /*{
//         path: 'advisors',
//         component: AdvisorsTab,
//         title: 'Asesores',
//       },
//       {
//         path: 'calendar',
//         component: AdminCalendarTab,
//         title: 'Calendario',
//       },
//       {
//         path: 'leads',
//         component: AdminLeadsTab,
//         title: 'Leads',
//       },
//       {
//         path: 'clients',
//         component: AdminClientsTab,
//         title: 'Clientes',
//       },*/
//     ],
//   },

//   // Contract routes
//   /*{
//     path: '/contract-generator',
//     component: ContractGeneratorDashboard,
//     role: 'contract-generator',
//     title: 'Contract Generator',
//     exact: true,
//   },
//   {
//     path: '/contract-creation',
//     component: ContractCreationPage,
//     role: 'contract-generator',
//     title: 'Contract Creation',
//     exact: true,
//   },*/
// ];

//export default routes;
