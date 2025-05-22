// Hooks / Libs:
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CONSTANTES:
import { APP_CONSTANTS } from "../../config/appConstants";

// Components:
import { toast } from "react-toastify";
import { Header } from "../../components/layout/Header/Header";
import { Footer } from "../../components/layout/Footer/Footer";
import { Border } from "../../components/ui/Border/Border";
import { AnimateNums } from "../../components/features/animateNums/AnimateNums";
import { Underweight } from "../../components/ui/Underweight/Underweight";
import { LoadingScreen } from "../../components/ui/LoadingScreen/LoadingScreen";

// Assets:
// import imgLogo from '../../assets/images/LOGO-BIZSYS_preto.png';

// Estilo:
import './style.css';



export default function Resultados() {
    const navigate = useNavigate();
    // Estados do componente:
    const [loading, setLoading] = useState(true);

    // Logica UI:
    const [dataResults, setDataResults] = useState({
        name: '',
        weight: 0,
        credits: 0,
        carbon: 0
    });
    


    useEffect(()=> {
        function initializePage() {
            setLoading(true);
            console.log('Effect /Resultados');

            try {
                const configApp = JSON.parse(Cookies.get(APP_CONSTANTS.COOKIE_CONFIG_NAME) || null);
                console.log(configApp)
                const resultsCookie = JSON.parse(Cookies.get(APP_CONSTANTS.COOKIE_RESULTS_NAME) || null);
                // const resultsCookie = {
                //     name: 'Lucas Anjos botialok',
                //     weight: 80255,
                //     credits: 42000,
                // };

                if(resultsCookie) {
                    if(Array.isArray(configApp?.CODIGOS)) {
                        resultsCookie.name = resultsCookie.name
                            .replace(new RegExp(`\\b${configApp.CODIGOS[0]}\\b`, 'gi'), '')
                            .replace(new RegExp(`\\b${configApp.CODIGOS[1]}\\b`, 'gi'), '')
                            .replace(/\s{2,}/g, ' ')  // Remove espaços duplos
                            .trim(); // Remove espaços nas pontas
                    }
                    console.log(resultsCookie);

                    setDataResults(prev => ({
                        ...prev, 
                        ...resultsCookie,
                        carbon: resultsCookie.weight * 1.7
                    }));

                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
                else {
                    navigate('/instrucoes');
                }
            }
            catch(error) {
                console.error('DETALHES DO ERRO', error);
                toast.error('Ops, houve um erro');
            }

            setLoading(false);
        } 
        initializePage();
    }, [navigate]);





  
    return (
        <div className="Page Resultados grid animate__animated animate__fadeIn">
            <Header />
            
            {loading ? (
                <LoadingScreen textFeedback='Carregando resultados' />
            ) : (
                <main className='mainPage Resultados'>
                    {dataResults.weight < 700 ? (
                        <Underweight onclick={()=>navigate('/')} />
                    ) : (
                        <>
                        <h2>
                            Obrigado, <br />
                            <span className="txt_uppercase txt_emphasis">
                                {dataResults.name}
                            </span>
                        </h2>    

                        {/* Componente div border */}
                        <Border>
                            <div className="info_item">
                                <p className="label">
                                    Você depositou:
                                </p>

                                <div className="data">
                                    <AnimateNums 
                                    valorFinal={dataResults.carbon > 999999 ? (dataResults.weight / 1000) : dataResults.weight} 
                                    sufixo={dataResults.carbon > 999999 ? 'Kg' : 'g'} 
                                    formatBr={true}
                                    />
                                </div>
                                <p className="data_details txt_emphasis">
                                    de embalagens <br /> recicláveis
                                </p>
                            </div>

                            <div className="divider"></div>                

                            <div className="info_item">
                                <p className="label">
                                    Que foram convertidos em:
                                </p>

                                <div className="data">
                                    <AnimateNums 
                                    valorFinal={dataResults.credits} 
                                    formatBr={true}
                                    />
                                </div>
                                <p className="data_details txt_emphasis">
                                    créditos
                                </p>
                            </div>

                            <div className="divider"></div>

                            <div className="info_item">
                                <p className="label">
                                    Gerando uma economia de:
                                </p>

                                <div className="data">
                                    <AnimateNums 
                                    valorFinal={dataResults.carbon > 999999 ? (dataResults.carbon / 1000) : dataResults.carbon} 
                                    sufixo={dataResults.carbon > 999999 ? 'Kg' : 'g'}
                                    casasDecimais={1} 
                                    formatBr={true} 
                                    />
                                </div>
                                <p className="data_details txt_emphasis">
                                    CO<sup>2</sup> na atmosfera
                                </p>
                            </div>
                        </Border>

                        <p className="bg_details">
                            <span>20</span>
                            <span>25</span>
                        </p>
                        </>
                    )}
                </main>
            )}

            <Footer />
        </div>
    );
}