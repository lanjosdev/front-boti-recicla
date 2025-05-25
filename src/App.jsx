// Hooks / Libs:
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Configs App:
import { getConfigApp } from './config/appGetConfig';

// Contexts Providers:
// import { UserProvider } from './contexts/userContext';

// Components:
import { LoadingScreen } from './components/ui/LoadingScreen/LoadingScreen';
import AppRoutes from './routes/AppRoutes'; //Config de rotas

// Estilo Global e Classes customizadas:
import './styles/global.css';
import './styles/customClasses.css';



export default function App() {
  const [loading, setLoading] = useState(true);
  
  useEffect(()=> {
    async function getConfigs() {
      await getConfigApp();
      // console.log('await')

      // console.log('fim')
      setLoading(false);
    }
    getConfigs();
  }, []);
  

  return (
    <BrowserRouter>  

      {loading ? (
        <LoadingScreen/>
      ) : (
        <AppRoutes/>
      )}

      <ToastContainer autoClose={3000} limit={1} closeOnClick />
        
    </BrowserRouter>
  )
}