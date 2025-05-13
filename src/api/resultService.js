// Libs:
import api from './config/axiosConfig';
// import Cookies from 'js-cookie';

// CONSTANTES:
// import { APP_CONSTANTS } from './config/constants';


const GetResults = async (idUser) => {
    console.log('CALL FUNCTION API');

    console.log(idUser)
    const response = await api.get(`/check-results/${idUser}`);

    // console.log(response.data);
    return response.data;
};

const ResultService = {

    // Metodos
    GetResults,
};

export default ResultService;