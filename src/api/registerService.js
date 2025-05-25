// Libs:
import api from './config/axiosConfig';
// import Cookies from 'js-cookie';

// CONSTANTES:
// import { APP_CONSTANTS } from './config/constants';


const Register = async (bodyReq) => {
    console.log('CALL FUNCTION API');

    // const bodyReq = {
    //     name: name,
    //     email: email,
    //     cpf: cpf
    // }
    // console.log(bodyReq)
    const response = await api.post('/register', bodyReq);

    // console.log(response.data);
    return response.data;
};


const RegisterService = {

    // Metodos
    Register,
};

export default RegisterService;