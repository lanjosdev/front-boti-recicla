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
import { LoadingScreen } from "../../components/ui/LoadingScreen/LoadingScreen";

// Assets:
import iconSeta from '../../assets/icons/sinal.webp';
import imgBg from '../../assets/images/elementos-Totem.webp';

// Estilo:
import './style.css';



export default function ConfirmaPesagem() {
    // Constantes do componente
    const configsApp = JSON.parse(Cookies.get(APP_CONSTANTS.COOKIE_CONFIG_NAME) || null);
    const cookiesExpires = configsApp?.COOKIES_EXPIRES || 7;
    const navigate = useNavigate();

    // Estados do componente:
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingResults, setLoadingResults] = useState(false);

    // Logica UI:
    const defaultAlert = {
        open: false,
        title: 'Aviso',
        text: null
    };
    const [alert, setAlert] = useState(defaultAlert);
    



    useEffect(()=> {
        function initializePage() {
            console.log('Effect /ConfirmaPesagem');

            const idParticipationCookie = Cookies.get(APP_CONSTANTS.COOKIE_ID_PARTICIPATION_NAME);
            if(!idParticipationCookie) {
                navigate('/instrucoes');
            }

            window.scrollTo({ top: 0, behavior: 'smooth' });
        } 
        initializePage();
    }, [navigate]);

    


    async function getResults(idUser) {
        setLoadingResults(true);
        console.log('function getResults')

        const clearIntervalGetResults = (interval)=> {
            clearInterval(interval);
            setLoadingResults(false);
        };

        const intervalId = setInterval(async ()=> {
            console.log('INICIA SETINTERVAL')

            try {
                const response = await ResultService.GetResults(idUser);
                console.log(response);
    
                if(response.success) {
                    if(response.data.credits != null) {
                        // console.log('=====================PEGOU RESULTADOS========================');
                        
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
                        clearIntervalGetResults(intervalId);
                        
                        navigate('/resultados');
                    }
                }
                else if(response.success == false) {
                    console.warn('Success False:', response.message);
                    clearIntervalGetResults(intervalId);

                    if(response.message == 'error') {
                        // toast.error('Ops, houve um erro');
                        setAlert({
                            open: true,
                            title: 'Ops, houve um erro',
                            text: 'Tente novamente'
                        });
                        return;
                    }
                    // toast.warn(response.message);
                    setAlert({
                        open: true,
                        title: 'Ops, houve uma falha',
                        text: 'Tente novamente'
                    });

                    // switch(response.message) {

                    //     case 'Nenhuma participação encontrada para o id informado. Por favor, verifique.':
                    //     case 'Nenhum usuário encontrado com id informado. Por favor, verifique.':
                    //         clearInterval(intervalId);
                    //         toast.error(response.message);
                    //         break;
                    //     case 'error':
                    //         clearInterval(intervalId);
                    //         toast.error('Ops, houve um erro');
                    //         break;
                    //     default:
                    //         console.warn(response.message);
                    // }
                }
                else {
                    console.error('Erro inesperado');
                    clearIntervalGetResults(intervalId);
                    toast.error('Erro inesperado');
                }
            }
            catch(error) {
                console.error('DETALHES DO ERRO:', error);
                clearIntervalGetResults(intervalId);
                // toast.error('Ops, houve um erro');
                setAlert({
                    open: true,
                    title: 'Ops, houve um erro',
                    text: 'Tente novamente'
                });
            }
        }, 1500);
    }


    // SUBMIT API:
    async function handleSubmitFinish() {
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
        if(!idParticipationCookie) {
            console.warn('SEM ID_PARTICIPATION');
            setLoadingSubmit(false);
            toast.warn('Necessário iniciar a pesagem');
            navigate('/instrucoes');
            return;
        }



        // REQUEST:
        try {
            const response = await WeighingService.Finish(idUserCookie);
            console.log(response);
            
            if(response.success) {
                // {
                //     "success": true,
                //     "message": "Pesagem finalizada com sucesso."
                // }
                getResults(idUserCookie);
            }
            else if(response.success == false) {
                console.warn('Success False Message:', response.message);

                switch(response.message) {
                    // {
                    //     "success": false,
                    //     "message": "A pesagem desse usuário já foi finalizada."
                    // }

                    // {
                    //     "success": false,
                    //     "message": "Usuário informado não tem nenhuma pesagem para finalizar."
                    // }

                    // { REMOVER COOKIES???
                    //     "success": false,
                    //     "message": "Nenhum resultado encontrado para o id informado. Por favor, verifique."
                    // }

                    case 'Nenhum usuário encontrado para o id informado. Por favor, verifique.':
                        // console.error('APAGAAA TUDDDOOOO COOKIES??????')
                        setAlert({
                            open: true,
                            title: 'Aviso',
                            text: response?.message
                        });
                        break;
                    case 'Usuário informado não tem nenhuma pesagem para finalizar.':
                        toast.warn('Necessário iniciar a pesagem');
                        navigate('/instrucoes');
                        break;
                    case 'A pesagem desse usuário já foi finalizada.':
                        getResults(idUserCookie);
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
                            title: 'Ops, houve uma falha',
                            text: 'Tente novamente'
                        });
                }
            }
            else {
                toast.error('Erro inesperado.');
            }
        }
        catch(error) {
            console.error('DETALHES DO ERRO:', error);
            
            if(error.response?.status === 401) {
                toast.warn('Sessão expirada por tempo esgotado');
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
        <div className="Page ConfirmaPesagem grid">
            <Header />

            <main className='mainPage ConfirmaPesagem Instrucoes'>
                <ul className="instructions">
                    <li className="item">
                        <img className="icon" src={iconSeta} alt="" />
                        <p>
                            Agora deposite suas embalagens <br />
                            na máquina.
                        </p>
                    </li>
                    <li className="item">
                        <img className="icon" src={iconSeta} alt="" />
                        <p>
                            Quando terminar, toque em Converter.
                        </p>
                    </li>
                </ul>


                <div className="container_btn">
                    <Button onClick={handleSubmitFinish} disabled={loadingSubmit || loadingResults}>
                        {loadingSubmit ? (
                            <span>Convertendo...</span>
                        ) : (
                            <span>Converter</span>
                        )}
                    </Button>
                </div>
                

                <div className={`bg_imgBlock ${loadingSubmit || loadingResults ? 'loading' : ''}`}>
                    <p>
                        <span>20</span>
                        <span>25</span>
                    </p>
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
                        
            {loadingSubmit && (
                <LoadingScreen textFeedback='Calculando peso' />
            )}
            {loadingResults && (
                <LoadingScreen textFeedback='Gerando créditos' />
            )}
        </div>
    );
}