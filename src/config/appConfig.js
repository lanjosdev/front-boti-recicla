// Funcionalidades / Libs:
import axios from "axios";
import Cookies from "js-cookie";
 
// CONSTANTES:
import { APP_CONSTANTS } from "./appConstants";


// SCRIPTS:
async function getConfigApp() {
    console.log('CALL FUNCTION GET CONFIG');

    try {
        const response = await axios.get(`${APP_CONSTANTS.BASE_URL}/configApp.json`);
        console.log(response.data);
        // return response.data;

        const configsApp = response.data;
        Cookies.set(APP_CONSTANTS.COOKIE_CONFIG_NAME, JSON.stringify(configsApp), {
            secure: true,
            sameSite: 'Strict'
        });
    }
    catch (error) {
        console.error('ERRO AO CARREGAR CONFIGURAÇÕES DO APP', error);
        Cookies.remove(APP_CONSTANTS.COOKIE_CONFIG_NAME);
    }
}
getConfigApp();