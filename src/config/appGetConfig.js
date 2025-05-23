// Funcionalidades / Libs:
import axios from "axios";
import Cookies from "js-cookie";
 
// CONSTANTES:
import { APP_CONSTANTS } from "./appConstants";


// SCRIPT:
export async function getConfigApp() {
    console.log('CALL FUNCTION GET CONFIG');

    try {
        const response = await axios.get(`${APP_CONSTANTS.BASE_URL}/configApp.json`, {
            timeout: 3000 // tempo limite em milissegundos (3 segundos)
        });
        console.log(response.data);
        // return response.data;

        const configsApp = response.data;
        Cookies.set(APP_CONSTANTS.COOKIE_CONFIG_NAME, JSON.stringify(configsApp), {
            secure: true,
            sameSite: 'Strict',
            expires: 7
        });
    }
    catch (error) {
        console.error('ERRO AO CARREGAR CONFIGURAÇÕES DO APP', error);
        // Cookies.remove(APP_CONSTANTS.COOKIE_CONFIG_NAME);
    }
}
// getConfigApp();