// Libs:
import api from './config/axiosConfig';
// import Cookies from 'js-cookie';

// CONSTANTES:
// import { APP_CONSTANTS } from './config/constants';


const Start = async (idUser, value=1) => {
    console.log('CALL FUNCTION API');

    const bodyReq = {
        started_weighing: value
    }
    console.log(idUser)
    console.log(bodyReq)
    const response = await api.post(`/start-weighing/${idUser}`, bodyReq);

    // console.log(response.data);
    return response.data;
};

const Finish = async (idUser, value=1) => {
    console.log('CALL FUNCTION API');

    const bodyReq = {
        finished_weighing: value
    }
    console.log(idUser)
    console.log(bodyReq)
    const response = await api.post(`/finish-weighing/${idUser}`, bodyReq);

    // console.log(response.data);
    return response.data;
};


const WeighingService = {

    // Metodos
    Start,
    Finish
};

export default WeighingService;