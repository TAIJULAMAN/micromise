import { createBrowserRouter } from "react-router-dom";
import SignInPage from "../pages/auth/SignInPage";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import Policy from "../pages/settings/policy";
import TermsConditionPage from "../pages/settings/TermsConditionPage";
import ProfilePage from "../pages/profile/ProfilePage";
import NotificationPage from "../pages/notification/NotificationPage";
import UserManagementPage from "../pages/user-management/UserManagementPage";
import ManagementPage from "../pages/job-request-management/ManagementPage";
import InvoicePage from "../pages/invoice/InvoicePage";
import AddServicePage from "../pages/add-service-catagory/AddServicePage";
import MakeAdminPage from "../pages/make-admin/MakeAdminPage";
import Settings from "../pages/settings/Settings";
import Technician from "../pages/user-management/Technician";
import AdminClient from "../pages/user-management/AdminClient";
import ClientSupervisor from "../pages/user-management/ClientSupervisor";

const router = createBrowserRouter([
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },

    
      {
        path: "/request-management",
        element: <ManagementPage />,
      },
      {
        path: "/invoice",
        element: <InvoicePage />,
      },
      {
        path: "/add-service",
        element: <AddServicePage />,
      },
      {
        path: "/make-admin",
        element: <MakeAdminPage />,
      },

      
        // user management
        {
          path: "/user-management",
          element: <UserManagementPage />,
        },
        {
          path: "/technician",
          element: <Technician />,
        },
        {
          path: "/admin-client",
          element: <AdminClient />,
        },
        {
          path: "/client-supervisor",
          element: <ClientSupervisor />,
        },
  

      // settings
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/privacy-policy",
        element: <Policy />,
      },
      {
        path: "/terms-and-condition",
        element: <TermsConditionPage />,
      },

      // header nav

      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/notification",
        element: <NotificationPage />,
      },
    ],
  },

  //   {
  //     path: "/",
  //     element: <PrivateRoute> <MainLayout /></PrivateRoute>,
  //     children: [
  //       {
  //         path: "/",
  //         element: <DashboardPage />,
  //       },
  //       {
  //         path: "/user-management",
  //         element: <UserManagementPage />,
  //       },
  //       {
  //         path: "/manage-property",
  //         element: <ManagePropertyPage />,
  //       },
  //       {
  //         path: "/instant-quote-data",
  //         element: <QuoteDataPage />,
  //       },
  //       {
  //         path: "/call-management",
  //         element: <CallManagementPage />,
  //       },
  //       {
  //         path: "/project",
  //         element: <ProjectPage />,
  //       },
  //       {
  //         path: "/project/:id",
  //         element: <ProjectSinglePage />,
  //       },
  //       {
  //         path: "/blog",
  //         element: <BlogPage />,
  //       },
  //       {
  //         path: "/blog/create",
  //         element: <BlogCreatePage />,
  //       },
  //       {
  //         path: "/blog/edit/:id",
  //         element: <BlogEditPage />,
  //       },
  //       {
  //         path: "/make-admin",
  //         element: <MakeAdminPage />,
  //       },

  //       // settings

  //       {
  //         path: "/privacy-policy",
  //         element: <PrivacyPolicyPage />,
  //       },
  //       {
  //         path: "/terms-and-condition",
  //         element: <TermsConditionPage />,
  //       },

  //       {
  //         path: "/notification",
  //         element: <NotificationPage />,
  //       },
  //       {
  //         path: "/profile",
  //         element: <EditProfilePage />,
  //       },
  //       {
  //         path: "/profile/change-password",
  //         element: <ChangePassPage />,
  //       },
  //     ],
  //   },
]);

export default router;
