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
import { LoadingScreen } from "../../components/ui/LoadingScreen/LoadingScreen";

// Assets:
// import imgLogo from '../../assets/images/LOGO-BIZSYS_preto.png';

// Estilo:
import './style.css';



export default function ConfirmaPesagem() {
    const navigate = useNavigate();
    // Estados do componente:
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [loadingResults, setLoadingResults] = useState(false);

    // Logica UI:

    const idUser = Cookies.get(APP_CONSTANTS.COOKIE_ID_USER_NAME);
    



    useEffect(()=> {
        function initializePage() {
            console.log('Effect /ConfirmaPesagem');
        } 
        initializePage();
    }, []);

    


    async function getResults() {
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
                    if(
                        response.data.finished_interaction && 
                        response.data.credits && response.data.weight
                    ) {
                        // console.log('SALVA COOKIE + PARA INTERVAL + NAVIGATE')
                        const dataResults = {
                            name: response.data.name || null,
                            weight: response.data.weight || 0, 
                            credits: response.data.credits || 0 
                        };
                        Cookies.set(APP_CONSTANTS.COOKIE_RESULTS_NAME, JSON.stringify(dataResults), { 
                            secure: true,
                            sameSite: 'Strict'
                        });
                        clearIntervalGetResults(intervalId);
                        
                        navigate('/resultados');
                    }
                }
                else if(response.success == false) {
                    console.warn('Success False:', response.message);
                    clearIntervalGetResults(intervalId);

                    if(response.message == 'error') {
                        toast.error('Ops, houve um erro');
                        return;
                    }
                    toast.warn(response.message);

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
                toast.error('Ops, houve um erro');
            }
        }, 1500);
    }


    // SUBMIT API:
    async function handleSubmitFinish() {
        setLoadingSubmit(true);
        // const startTime = performance.now();


        // VALIDAÇÕES:
        if(!idUser) {
            console.warn('SEM ID_USER');
            setLoadingSubmit(false);
            return;
        }


        // REQUEST:
        try {
            const response = await WeighingService.Finish(idUser);
            console.log(response);
            
            if(response.success) {
                // {
                //     "success": true,
                //     "message": "Pesagem finalizada com sucesso."
                // }
                getResults();
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

                    case 'A pesagem desse usuário já foi finalizada.':
                        getResults();
                        break;
                    case 'error':
                        toast.error('Ops, houve um erro');
                        break;
                    default:
                        toast.warn(response.message);
                }
            }
            else {
                toast.error('Erro inesperado.');
            }
        }
        catch(error) {
            console.error('DETALHES DO ERRO:', error);
            toast.error('Ops, houve um erro');
        }

        
        // const endTime = performance.now();
        // const seconds = ((endTime - startTime) / 1000).toFixed(2);
        setLoadingSubmit(false);
    }

  
    return (
        <div className="Page ConfirmaPesagem grid">
            <Header />

            <main className='mainPage ConfirmaPesagem'>
                <ul className="instructions">
                    <li className="item">
                        <span>{'>>'}</span>
                        <p>
                            Step 1
                        </p>
                    </li>
                    <li className="item">
                        <span>{'>>'}</span>
                        <p>
                            Step 2
                        </p>
                    </li>
                </ul>


                <div className="container_btn">
                    <button className="btn primary" onClick={handleSubmitFinish} disabled={loadingSubmit}>
                        {loadingSubmit ? (
                            <span>Convertendo...</span>
                        ) : (
                            <span>Converter</span>
                        )}
                    </button>
                </div>
            </main>

            <Footer />
                        
            {loadingResults && (
                <LoadingScreen textFeedback='Convertendo em créditos...' />
            )}
        </div>
    );
}