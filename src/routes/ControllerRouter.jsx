// Hooks / Libs:
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { Navigate } from 'react-router';

// CONSTANTS:
import { APP_CONSTANTS } from "../config/appConstants";

// API:

// Contexts:

// Components:
import { LoadingScreen } from "../components/ui/LoadingScreen/LoadingScreen";

// Utils:

// Assets:


export default function ControllerRouter({ children }) {
    // const [loading, setLoading] = useState(true);

    // const [registerOk, setRegisterOk] = useState(false);
    // const [resultsOk, setResultsOk] = useState(false);



    const tokenCookie = Cookies.get(APP_CONSTANTS.COOKIE_AUTH_TOKEN_NAME);
    const idUserCookie = Cookies.get(APP_CONSTANTS.COOKIE_ID_USER_NAME);
    const resultsCookie = Cookies.get(APP_CONSTANTS.COOKIE_RESULTS_NAME);

    // Verifica validade do token sempre que acessar rotas privadas SE SIM alimenta profileDetails:
    useEffect(()=> {
        async function validateCookies() {
            console.log('Effect ControllerRouter');

            // if(tokenCookie && idUserCookie) {
            //     console.warn('rgister OK')
            //     setRegisterOk(true);

            //     if(resultsCookie) {
            //         setResultsOk(true);
            //     }
            // }

            // setLoading(false);
        }
        validateCookies();
    }, [tokenCookie, idUserCookie, resultsCookie]);

    


    
    return (
        tokenCookie && idUserCookie ? (

            resultsCookie ? <Navigate to='/resultados' /> : children

        ) : (

            <Navigate to='/' />

        )        
    )        
    // return (
    //     <>
    //     {loading ? (

    //         <LoadingScreen />

    //     ) : (
            
    //         registerOk ? (

    //             resultsOk ? <Navigate to='/resultados' /> : children

    //         ) : (

    //             <Navigate to='/' />

    //         )
        
    //     )}
    //     </>
    // )        
}