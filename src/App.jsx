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

  
  // console.log(defaultConfigApp)

  useEffect(()=> {
    async function checkConfigApp() {
      await getConfigApp();
      // console.log('await')

      // const defaultConfigApp = {
      //     "CODIGOS": [
      //         "botimedina",
      //         "botialok"
      //     ],
      //     "COOKIES_EXPIRES": 7,
      //     "CPF_BLOCK": true
      // };

      // try {
      //   await getConfigApp();
      // }
      // catch(error) {
      //   console.log(error);
      //   Cookies.set(APP_CONSTANTS.COOKIE_CONFIG_NAME, JSON.stringify(defaultConfigApp), {
      //       secure: true,
      //       sameSite: 'Strict',
      //       expires: 7
      //   });
      // }

      // console.log('fim')
      setLoading(false);
    }
    checkConfigApp();
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