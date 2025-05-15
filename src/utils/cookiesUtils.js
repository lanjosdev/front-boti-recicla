// Libs:
import Cookies from 'js-cookie';

// CONSTANTES:
import { APP_CONSTANTS } from '../config/appConstants';


const RemoveAll = async () => {
    Cookies.remove(APP_CONSTANTS.COOKIE_AUTH_TOKEN_NAME);
    Cookies.remove(APP_CONSTANTS.COOKIE_ID_USER_NAME);
    Cookies.remove(APP_CONSTANTS.COOKIE_ID_PARTICIPATION_NAME);
    Cookies.remove(APP_CONSTANTS.COOKIE_RESULTS_NAME);
};

const RemoveParticipation = async () => {
    Cookies.remove(APP_CONSTANTS.COOKIE_ID_PARTICIPATION_NAME);
    Cookies.remove(APP_CONSTANTS.COOKIE_RESULTS_NAME);
};


const CookiesUtils = {

    // Metodos
    RemoveAll,
    RemoveParticipation
};

export default CookiesUtils;