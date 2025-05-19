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
                // const resultsCookie = JSON.parse(Cookies.get(APP_CONSTANTS.COOKIE_RESULTS_NAME) || null);
                const resultsCookie = {
                    name: 'Lucas Souza botimedina',
                    weight: 700,
                    credits: 0,
                };
                console.log(resultsCookie)

                if(resultsCookie) {
                    setDataResults(prev => ({
                        ...prev, 
                        ...resultsCookie, 
                        carbon: resultsCookie.weight * 1.7
                    }));
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

    // useEffect(()=> {
    //     function getConfigApp() {
    //         setLoading(true);

    //         try {
    //             const configApp = JSON.parse(Cookies.get(APP_CONSTANTS.COOKIE_CONFIG_NAME) || null);
    //             console.log(configApp);

    //             if(configApp?.CODIGOS) {
    //                 const newDataResults = {...dataResults}
    //             }
    //         }
    //         catch(error) {
    //             console.error('DETALHES DO ERRO', error);
    //             // toast.error('Ops, houve um erro');
    //         }

    //         setLoading(false);
    //     } 
    //     getConfigApp();
    // }, [navigate]);

    


  
    return (
        <div className="Page Resultados grid">
            <Header />
            
            {loading ? (
                <LoadingScreen textFeedback='Carregando resultados...' />
            ) : (
                <main className='mainPage Resultados'>
                    {dataResults.weight < 700 ? (
                        <Underweight onclick={()=>navigate('/')} />
                    ) : (
                        <>
                        <h2>
                            Obrigado, <br />
                            <span className="txt_uppercase">{dataResults.name}</span>
                        </h2>    

                        {/* <p>Peso: {dataResults.weight}</p>
                        <p>Créditos: {dataResults.credits}</p>
                        <p>Carbano: {dataResults.carbon > 0 ? dataResults.carbon.toFixed(1) : dataResults.carbon}</p> */}

                        {/* Componente div border */}
                        <Border>
                            <div className="info_item">
                                <p className="label">
                                    Você depositou:
                                </p>

                                <p className="data">
                                    {dataResults.weight}g
                                </p>
                                <p className="data_details">
                                    de embalagens recicláveis
                                </p>
                            </div>

                            <div className="divider"></div>                

                            <div className="info_item">
                                <p className="label">
                                    Que foram convertidos em:
                                </p>

                                <p className="data">
                                    {dataResults.credits}
                                </p>
                                <p className="data_details">
                                    créditos
                                </p>
                            </div>

                            <div className="divider"></div>

                            <div className="info_item">
                                <p className="label">
                                    Gerando uma economia de:
                                </p>

                                <p className="data">
                                    {dataResults.carbon > 0 ? dataResults.carbon.toFixed(1) : dataResults.carbon}g
                                </p>
                                <p className="data_details">
                                    CO<sup>2</sup> na atmosfera
                                </p>
                            </div>
                            
                        </Border>
                        </>
                    )}
                </main>
            )}

            <Footer />
        </div>
    );
}