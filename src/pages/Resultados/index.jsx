// Hooks / Libs:
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CONSTANTES:
import { APP_CONSTANTS } from "../../config/appConstants";


// Components:
import { Header } from "../../components/layout/Header/Header";
import { Footer } from "../../components/layout/Footer/Footer";
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

            const resultsCookie = JSON.parse(Cookies.get(APP_CONSTANTS.COOKIE_RESULTS_NAME) || null);
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

            setLoading(false);
        } 
        initializePage();
    }, [navigate]);

    


  
    return (
        <div className="Page Resultados grid">
            <Header />
            
            {loading ? (
                <LoadingScreen textFeedback='Carregando resultados...' />
            ) : (
                <main className='mainPage Resultados'>
                    <h2>
                        Obrigado, <br />
                        {dataResults.name}
                    </h2>    
                    <br />

                    {/* Componente div border */}
                    <div>
                        <p>Peso: {dataResults.weight}</p>
                        <p>Créditos: {dataResults.credits}</p>
                        <p>Carbano: {dataResults.carbon > 0 ? dataResults.carbon.toFixed(1) : dataResults.carbon}</p>
                    </div>
                </main>
            )}

            <Footer />
        </div>
    );
}