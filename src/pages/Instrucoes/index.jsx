// Hooks / Libs:
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CONSTANTES:
import { APP_CONSTANTS } from "../../config/appConstants";

// API:
import WeighingService from "../../api/weighingService";

// Contexts:
// import UserContext from "../../contexts/userContext";

// Components:
import { toast } from "react-toastify";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

// Assets:
// import imgLogo from '../../assets/images/LOGO-BIZSYS_preto.png';

// Estilo:
import './style.css';



export default function Instrucoes() {
    const navigate = useNavigate();
    // Estados do componente:
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    // Logica UI:




    useEffect(()=> {
        function initializePage() {
            console.log('Effect /Instrucoes');
        } 
        initializePage();
    }, []);

    

    // SUBMIT API:
    async function handleSubmitStart() {
        setLoadingSubmit(true);
        // const startTime = performance.now();


        // VALIDAÇÕES:
        const idUser = Cookies.get(APP_CONSTANTS.COOKIE_ID_USER_NAME);
        if(!idUser) {
            console.warn('SEM ID_USER');
            setLoadingSubmit(false);
            return;
        }


        // REQUEST:
        try {
            const response = await WeighingService.Start(idUser);
            console.log(response);
            
            if(response.success) {
                const idParticipation = response.data.id_participation;
                Cookies.set(APP_CONSTANTS.COOKIE_ID_PARTICIPATION_NAME, idParticipation, { 
                    secure: true,
                    sameSite: 'Strict'
                });
                toast.success('Pesagem liberada');

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
                
                    case 'error':
                        toast.error('Ops, houve um erro');
                        break;
                    default:
                        toast.warn(response.message);
                }
            }
            else {
                toast.error('Erro inesperado');
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
        <div className="Page Instrucoes grid">
            <Header />

            <main className='mainPage Instrucoes'>
                <h2 className="txt_emphasis">Como funciona</h2>    

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
                    <li className="item">
                        <span>{'>>'}</span>
                        <p>
                            Step 3
                        </p>
                    </li>
                    <li className="item">
                        <span>{'>>'}</span>
                        <p>
                            Step 4
                        </p>
                    </li>
                </ul>


                <div className="container_btn">
                    <button className="btn primary" onClick={handleSubmitStart} disabled={loadingSubmit}>
                        {loadingSubmit ? (
                            <span>Iniciando...</span>
                        ) : (
                            <span>Iniciar</span>
                        )}
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}