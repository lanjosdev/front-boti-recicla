// Hooks / Libs:
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CONSTANTES:
// import { APP_CONSTANTS } from "../../api/config/constants";

// Contexts:
// import UserContext from "../../contexts/userContext";

// Components:
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";

// Assets:
// import imgLogo from '../../assets/images/LOGO-BIZSYS_preto.png';

// Estilo:
import './style.css';



export default function ConfirmaPesagem() {
    const navigate = useNavigate();
    // Estados do componente:
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    // Logica UI:




    useEffect(()=> {
        function initializePage() {
            console.log('Effect /ConfirmaPesagem');
        } 
        initializePage();
    }, []);

    


  
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
                    <button className="btn primary" disabled={loadingSubmit}>
                        {loadingSubmit ? (
                            <span>Convertendo...</span>
                        ) : (
                            <span>Converter</span>
                        )}
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}