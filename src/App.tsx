import './css/App.css';
import Home from './pages/Home.tsx';
import { useRoutes } from 'react-router-dom';
import { AllClients } from './pages/Clients/AllClients.tsx';


function App() {

  return useRoutes([
    {
      path: '/',
      element: <Home/>,
    },
    {
      path: 'clients',
      element: <Home/>,
    },
    {
      path: 'library',
      element: <Home/>,
    },
  ]);
}

export default App;
