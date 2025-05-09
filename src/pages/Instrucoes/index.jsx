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



export default function Instrucoes() {
    const navigate = useNavigate();
    // Estados do componente:
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    // Logica UI:




    useEffect(()=> {
        function initializePage() {
            console.log('Effect /Instrucoes');
        } 
        initializePage();
    }, []);

    


  
    return (
        <div className="Page Instrucoes grid">
            <Header />

            <main className='mainPage Instrucoes'>
                <h1>Como funciona</h1>    
            </main>

            <Footer />
        </div>
    );
}