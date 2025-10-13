import {createBrowserRouter, Navigate} from 'react-router-dom';
import {Suspense, lazy} from 'react';
import {RingSuspense} from '@/components/UI/Suspense.styled.tsx';
import SignIn from '@/pages/Auth/SignIn';
import SignUp from '@/pages/Auth/SignUp';
import SignUpInvitation from '@/pages/Auth/SignUpInvitation';
import InviteUser from '@/pages/Auth/InviteUser';
import RequireAuth from '@/components/Auth/RequireAuth';
import TestPage from "@/pages/TestPage.tsx";


// Clients
const AllClients = lazy(() => import('@/pages/Clients/AllClients'));


// Library
const Exercises = lazy(() => import('@/pages/Library/Exercises'));
const Workouts = lazy(() => import('@/pages/Library/Workouts'));
const Sections = lazy(() => import('@/pages/Library/Sections'));
const Programs = lazy(() => import('@/pages/Library/Programs'));
const Tasks = lazy(() => import('@/pages/Library/Tasks'));
const MetricGroups = lazy(() => import('@/pages/Library/MetricGroups'));

// Settings
const SettingsLayout = lazy(() => import('@/pages/Settings/index'));

// Settings - WorkSpace
const CustomBranding = lazy(() => import('@/pages/Settings/WorkSpace/CustomBranding'));
const TeamSettings = lazy(() => import('@/pages/Settings/WorkSpace/TeamSettings'));

// Settings - YourAccount
const AccountDetails = lazy(() => import('@/pages/Settings/YourAccount/AccountDetails'));
const Integration = lazy(() => import('@/pages/Settings/YourAccount/Integration'));
const Notifications = lazy(() => import('@/pages/Settings/YourAccount/Notifications'));

const NotFound = () => <div className="p-6">Not Found</div>;

const router = createBrowserRouter([
    {
      id: 'root',
      path: '/',
      element:
        <RequireAuth>
          <Navigate to='/clients' replace/>
        </RequireAuth>
      ,
      loader: async () => {
      },
      children: [

        {
          path: 'test',
          element: <TestPage/>
        },

        {
          path: 'login',
          element: <SignIn/>
        },
        {
          path: 'signup',
          element: <SignUp/>
        },
        {
          path: 'invitation/:token',
          element: <SignUpInvitation/>
        },
        {
          path: 'invite',
          element:
            <RequireAuth>
              <InviteUser/>
            </RequireAuth>
        },

        // Clients
        {
          path: 'clients',
          element:
            <Navigate to='/clients/all' replace/>
          ,
          loader: async () => {
          },
          children: [

            // Явные подстраницы
            {
              path: 'all',
              element:
                <Suspense fallback={<RingSuspense/>}>
                  <AllClients/>
                </Suspense>
            },
          ],
        },

        // Library
        {
          path: 'library',
          element: <Navigate to='exercises' replace/>,
          children: [
            {
              index: true,
              path: 'exercises',
              loader: async () => {
              },
              element:
                <Suspense fallback={<RingSuspense/>}>
                  <Exercises/>
                </Suspense>,
            },
            {
              path: 'workouts',
              loader: async () => {
              },
              element:
                <Suspense fallback={<RingSuspense/>}>
                  <Workouts/>
                </Suspense>,
            },
            {
              path: 'sections',
              loader: async () => {
              },
              element:
                <Suspense fallback={<RingSuspense/>}>
                  <Sections/>
                </Suspense>,
            },
            {
              path: 'programs',
              loader: async () => {
              },
              element:
                <Suspense fallback={<RingSuspense/>}>
                  <Programs/>
                </Suspense>,
            },
            {
              path: 'tasks',
              loader: async () => {
              },
              element:
                <Suspense fallback={<RingSuspense/>}>
                  <Tasks/>
                </Suspense>,
            },
            {
              path: 'metrics',
              loader: async () => {
              },
              element:
                <Suspense fallback={<RingSuspense/>}>
                  <MetricGroups/>
                </Suspense>,
            },
          ],
        },

        // Settings
        {
          path: 'settings',
          element: (
            <Suspense fallback={<RingSuspense/>}>
              <SettingsLayout/>
            </Suspense>
          ),
          children: [
            {
              path: 'account',
              element: <Navigate to='details' replace/>,
              loader: async () => {
              },
              children: [
                {
                  index: true,
                  path: 'details',
                  element:
                    <Suspense fallback={<RingSuspense/>}>
                      <AccountDetails/>
                    </Suspense>,
                },
                {
                  path: 'integration',
                  element:
                    <Suspense fallback={<RingSuspense/>}>
                      <Integration/>
                    </Suspense>,
                },
                {
                  path: 'notifications',
                  element:
                    <Suspense fallback={<RingSuspense/>}>
                      <Notifications/>
                    </Suspense>,
                },
              ],
            },
            {
              path: 'branding',
              element:
                <Suspense fallback={<RingSuspense/>}>
                  <CustomBranding/>
                </Suspense>,
            },
            {
              path: 'team',
              element:
                <Suspense fallback={<RingSuspense/>}>
                  <TeamSettings/>
                </Suspense>,
              children: [],
            },
          ],
        },
      ],
    },

    /* Catch-all: 404 */
    {
      path: '*',
      element:
        <NotFound/>,
    }
    ,
  ])
;


export default router;
