import {createBrowserRouter, Navigate} from "react-router-dom";
import {Suspense, lazy} from "react";
import { RingSuspense } from "@/components/UI/Suspense.styled.tsx"

/* Clients */
const ClientsLayout = lazy(() => import("@/pages/Clients/index"));
const AllClients = lazy(() => import("@/pages/Clients/AllClients"));
const NeedProgramming = lazy(() => import("@/pages/Clients/NeedProgramming"));
// const Metrics = lazy(() => import("@/pages/Clients/Client/Metrics"));
// const Overview = lazy(() => import("@/pages/Clients/Client/Overview"));
// const Settings = lazy(() => import("@/pages/Clients/Client/Settings"));
// const Tasks = lazy(() => import("@/pages/Clients/Client/Tasks"));
// const Training = lazy(() => import("@/pages/Clients/Client/Training"));

/* Library */
const LibraryLayout = lazy(() => import("@/pages/Library/index"));
const Exercises = lazy(() => import("@/pages/Library/Exercises"));
const Workouts = lazy(() => import("@/pages/Library/Workouts"));
const Sections = lazy(() => import("@/pages/Library/Sections"));
const Programs = lazy(() => import("@/pages/Library/Programs"));
const Tasks = lazy(() => import("@/pages/Library/Tasks"));
const MetricGroups = lazy(() => import("@/pages/Library/MetricGroups"));

/* Settings */
const SettingsLayout = lazy(() => import("@/pages/Settings/index"));

/* Settings → WorkSpace */
const CustomBranding = lazy(() => import("@/pages/Settings/WorkSpace/CustomBranding"));
const TeamSettings = lazy(() => import("@/pages/Settings/WorkSpace/TeamSettings"));

/* Settings → YourAccount */
const AccountDetails = lazy(() => import("@/pages/Settings/YourAccount/AccountDetails"));
const Integration = lazy(() => import("@/pages/Settings/YourAccount/Integration"));
const Notifications = lazy(() => import("@/pages/Settings/YourAccount/Notifications"));

const NotFound = () => <div className="p-6">Not Found</div>;


export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    element: <Navigate to="/clients" replace/>,
    loader: async () => {},
    children: [

      // Clients
      {
        path: 'clients',
        element:
          <Suspense fallback={<RingSuspense/>}>
            <ClientsLayout/>
          </Suspense>,
        children: [
          // Cтраница по умолчанию (/clients)
          {
            index: true,
            element:
              <Suspense fallback={<RingSuspense/>}>
                <AllClients/>
              </Suspense>
          },

          // Явные подстраницы
          {
            path: "all",
            element:
              <Suspense fallback={<RingSuspense/>}>
                <AllClients/>
              </Suspense>
          },
          {
            path: "need-programming",
            element:
              <Suspense fallback={<RingSuspense/>}>
                <NeedProgramming/>
              </Suspense>
          },
        ],
      },

// Library
      {
        path: "library",
        element: (
          <Suspense fallback={<RingSuspense/>}>
            <LibraryLayout/>
          </Suspense>
        ),
        children: [
          // index → по умолчанию открывается Exercises
          {
            index: true,
            element:
              <Suspense fallback={<RingSuspense/>}>
                <Exercises/>
              </Suspense>
          },

          {
            path: "exercises",
            element:
              <Suspense fallback={<RingSuspense/>}>
                <Exercises/>
              </Suspense>
          },
          {
            path: "workouts",
            element:
              <Suspense fallback={<RingSuspense/>}>
                <Workouts/>
              </Suspense>
          },
          {
            path: "sections",
            element:
              <Suspense fallback={<RingSuspense/>}>
                <Sections/>
              </Suspense>
          },
          {
            path: "programs",
            element:
              <Suspense fallback={<RingSuspense/>}>
                <Programs/>
              </Suspense>
          },
          {
            path: "tasks",
            element:
              <Suspense fallback={<RingSuspense/>}>
                <Tasks/>
              </Suspense>
          },
          {
            path: "metric-groups",
            element:
              <Suspense fallback={<RingSuspense/>}>
                <MetricGroups/>
              </Suspense>
          },
        ],
      },

// Settings
      {
        path: "settings",
        element: (
          <Suspense fallback={<RingSuspense/>}>
            <SettingsLayout/>
          </Suspense>
        ),
        children: [
          // index → открывается TeamSettings
          {
            index: true,
            element:
              <Suspense fallback={<RingSuspense/>}>
                <TeamSettings/>
              </Suspense>
          },

          /* WorkSpace */
          {
            path: "workspace",
            children: [
              {
                index: true,
                element:
                  <Suspense fallback={<RingSuspense/>}>
                    <TeamSettings/>
                  </Suspense>
              },
              {
                path: "branding",
                element:
                  <Suspense fallback={<RingSuspense/>}>
                    <CustomBranding/>
                  </Suspense>
              },
              {
                path: "team",
                element:
                  <Suspense fallback={<RingSuspense/>}>
                    <TeamSettings/>
                  </Suspense>
              },
            ],
          },

          /* YourAccount */
          {
            path: "your-account",
            children: [
              {
                index: true,
                element:
                  <Suspense fallback={<RingSuspense/>}>
                    <AccountDetails/>
                  </Suspense>
              },
              {
                path: "account-details",
                element:
                  <Suspense fallback={<RingSuspense/>}>
                    <AccountDetails/>
                  </Suspense>
              },
              {
                path: "integration",
                element:
                  <Suspense fallback={<RingSuspense/>}>
                    <Integration/>
                  </Suspense>
              },
              {
                path: "notifications",
                element:
                  <Suspense fallback={<RingSuspense/>}>
                    <Notifications/>
                  </Suspense>
              },
            ],
          },
        ],
      }
    ]
  },

  /* Catch-all: 404 */
  {
    path: "*",
    element:
      <NotFound/>
  },
])
