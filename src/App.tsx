import './css/App.css';
import {RouterProvider} from 'react-router-dom';
import {router} from "@/routes";


export default function App() {

  return (
    <RouterProvider router={router}/>
  )

  // import {
//   createBrowserRouter,
//   RouterProvider,
//   useLoaderData,
// } from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/clients",
//     loader: async () => {
//       const r = await fetch("/api/clients");
//       return r.json();
//     },
//     element: <ClientsWithData />,
//   },
//   {
//     path: "/settings/:section?",
//     loader: async ({ params }) => {
//       const r = await fetch(`/api/settings?section=${params.section ?? ""}`);
//       return r.json();
//     },
//     element: <SettingsWithData />,
//   },
// ]);

// function ClientsWithData() {
//   const data = useLoaderData() as Client[];
//   return <List items={data} />;
// }

// export default function App() {
//   return <RouterProvider router={router} />;
// }
}
