// Hooks / Libs:
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CONSTANTES:
import { APP_CONSTANTS } from "../../config/appConstants";

// API:
import WeighingService from "../../api/weighingService";
import ResultService from "../../api/resultService";

// Contexts:
// import UserContext from "../../contexts/userContext";

// Components:
import { toast } from "react-toastify";
import { Header } from "../../components/layout/Header/Header";
import { Footer } from "../../components/layout/Footer/Footer";
import { Button } from "../../components/ui/Button/Button";
import { Alert } from "../../components/ui/Alert/Alert";

// Assets:
import iconSeta from '../../assets/icons/sinal.webp';
import imgBg from '../../assets/images/elementos-instrucoes.webp';

// Estilo:
import './style.css';



export default function Instrucoes() {
    // Constantes do componente
    const configsApp = JSON.parse(Cookies.get(APP_CONSTANTS.COOKIE_CONFIG_NAME) || null) || {
        "COOKIES_EXPIRES": 7
    };
    const cookiesExpires = configsApp.COOKIES_EXPIRES;
    const navigate = useNavigate();

    // Estados do componente:
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    // Logica UI:
    const defaultAlert = {
        open: false,
        title: 'Aviso',
        text: null
    };
    const [alert, setAlert] = useState(defaultAlert);




    useEffect(()=> {
        function initializePage() {
            console.log('Effect /Instrucoes');

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } 
        initializePage();
    }, []);

    

    
    async function getResultsAPI(idUser) {
        console.log('getResultsAPI')
        try {
            const response = await ResultService.GetResults(idUser);
            console.log(response);

            if(response.success) {
                if(response.data.finished_interaction) {
                    
                    const dataResults = {
                        name: response.data.name || null,
                        weight: response.data.weight, 
                        credits: response.data.credits 
                    };
                    Cookies.set(APP_CONSTANTS.COOKIE_RESULTS_NAME, JSON.stringify(dataResults), { 
                        secure: true,
                        sameSite: 'Strict',
                        expires: cookiesExpires
                    });
                    
                    navigate('/resultados');
                }
            }
            else if(response.success == false) {
                console.warn('Success False:', response.message);

                if(response.message == 'error') {
                    // toast.error('Ops, houve um erro');
                    setAlert({
                        open: true,
                        title: 'Ops, houve um erro',
                        text: 'Tente novamente'
                    });
                }
            }
            else {
                console.error('Erro inesperado');
                toast.error('Erro inesperado');
            }
        }
        catch(error) {
            console.error('DETALHES DO ERRO:', error);

            if(error.response?.status === 401) {
                toast.warn('Você não está autenticado');
                setLoadingSubmit(false);
                navigate('/');
                return;
            }
            // toast.error('Ops, houve um erro');
            setAlert({
                open: true,
                title: 'Ops, houve um erro',
                text: error.response?.message || 'Tente novamente'
            });
        }
    }

    // SUBMIT API:
    async function handleSubmitStart() {
        setLoadingSubmit(true);
        // const startTime = performance.now();


        // VALIDAÇÕES:
        const idUserCookie = Cookies.get(APP_CONSTANTS.COOKIE_ID_USER_NAME);
        if(!idUserCookie) {
            console.warn('SEM ID_USER');
            setLoadingSubmit(false);
            toast.warn('Necessário realizar o cadastro');
            navigate('/');
            return;
        }


        const idParticipationCookie = Cookies.get(APP_CONSTANTS.COOKIE_ID_PARTICIPATION_NAME);
        // REQUEST:
        try {
            const response = await WeighingService.Start(idUserCookie);
            console.log(response);
            
            if(response.success) {
                const idParticipation = response.data.id_participation;
                Cookies.set(APP_CONSTANTS.COOKIE_ID_PARTICIPATION_NAME, idParticipation, { 
                    secure: true,
                    sameSite: 'Strict',
                    expires: cookiesExpires
                });
                // toast.success('Pesagem liberada');

                navigate('/confirma-pesagem');
            }
            else if(response.success == false) {
                console.warn('Success False:', response.message);

                switch(response.message) {
                    // {
                    //     "success": false,
                    //     "message": "Participação em andamento."
                    // }
                    
                    // {
                    //     "success": false,
                    //     "message": "Nenhum resultado encontrado para o id informado. Por favor, verifique."
                    // }
                
                    case 'Usuário já participou':
                        await getResultsAPI(idUserCookie);
        
                        break;
                    case 'Participação em andamento.':
                        if(response.data.idParticipation == idParticipationCookie) {
                            navigate('/confirma-pesagem');
                        }
                        else {
                            // toast.warn(response.message);
                            setAlert({
                                open: true,
                                title: 'Aviso',
                                text: response.message
                            });
                        }
        
                        break;
                    case 'error':
                        // toast.error('Ops, houve um erro');
                        setAlert({
                            open: true,
                            title: 'Ops, houve um erro',
                            text: 'Tente novamente'
                        });
                        break;
                    default:
                        // toast.warn(response.message);
                        setAlert({
                            open: true,
                            title: 'Aviso',
                            text: response.message
                        });
                }
            }
            else {
                toast.error('Erro inesperado');
            }
        }
        catch(error) {
            console.error('DETALHES DO ERRO:', error);

            if(error.response?.status === 401) {
                toast.warn('Você não está autenticado');
                setLoadingSubmit(false);
                navigate('/');
                return;
            }
            // toast.error('Ops, houve um erro');
            setAlert({
                open: true,
                title: 'Ops, houve um erro',
                text: 'Tente novamente'
            });
        }

        
        // const endTime = performance.now();
        // const seconds = ((endTime - startTime) / 1000).toFixed(2);
        setLoadingSubmit(false);
    }

  
    return (
        <div className="Page Instrucoes grid animate__animated animate__fadeIn">
            <Header />

            <main className='mainPage Instrucoes'>
                <h2 className="txt_emphasis">
                    Como funciona
                </h2>    

                <ul className="instructions">
                    <li className="item">
                        <img className="icon" src={iconSeta} alt="" />
                        <p>
                            Clique no botão Iniciar.
                        </p>
                    </li>

                    <li className="item">
                        <img className="icon" src={iconSeta} alt="" />
                        <p>
                            Aguarde a liberação da pesagem na tela da máquina.
                        </p>
                    </li>

                    <li className="item">
                        <img className="icon" src={iconSeta} alt="" />
                        <p>
                            Deposite suas embalagens na máquina.
                            Quando terminar, toque em Converter, 
                            aqui no celular mesmo. Você precisa de
                            pelo menos 700g para participar.
                        </p>
                    </li>

                    <li className="item">
                        <img className="icon" src={iconSeta} alt="" />
                        <p>
                            Aguarde a pesagem <br /> 
                            e o cálculo dos seus créditos. 
                        </p>
                    </li>

                    <li className="item">
                        <img className="icon" src={iconSeta} alt="" />
                        <p>
                            Confira seu saldo <br />
                            e troque por produtos da loja.
                        </p>
                    </li>
                </ul>


                <div className="container_btn">
                    <Button onClick={handleSubmitStart} disabled={loadingSubmit}>
                        {loadingSubmit ? (
                            <span>Iniciando...</span>
                        ) : (
                            <span>Iniciar</span>
                        )}
                    </Button>
                </div>


                <div className="bg_imgBlock">
                    <img src={imgBg} alt="" />
                </div>


                {alert?.open && (
                    <Alert 
                    close={()=> setAlert(defaultAlert)}  
                    title={alert?.title || null}
                    text={alert?.text || null}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}