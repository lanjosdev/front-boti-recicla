// Hooks / Libs:
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CONSTANTES:
// import { APP_CONSTANTS } from "../../api/config/constants";

// Contexts:
// import UserContext from "../../contexts/userContext";

// Components:
// import { Footer } from "../../components/Footer/Footer";

// Assets:
// import imgLogo from '../../assets/images/LOGO-BIZSYS_preto.png';

// Estilo:
import './style.css';



export default function Cadastro() {
    const navigate = useNavigate();
    // Estados do componente:
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);

    // Logica UI + Dados a submiter:
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    
    const [showTerms, setShowTerms] = useState(false);




    useEffect(()=> {
        function initializePage() {
            console.log('Effect /Cadastro');
        } 
        initializePage();
    }, []);

    


  
    return (
        <div className="Page Cadastro grid">
            {/* COMPONENTE HEADER */}
            <div>TOPO</div>

            <main className='mainPage Cadastro'>
                <div className="main_top">
                    <h3>Subtitulo</h3>
                </div>
                {/* DIVISOR PONTILHADO */}

                <form className="main_form" autoComplete="off">
                    <div className="input--label">
                        <input type="text" id="name" />
                        <label htmlFor="name">Nome</label>
                    </div>

                    <button className="btn primary">
                        Continuar
                    </button>
                </form>

                {/* COMPONENTE TERMOS */}
            </main>

            {/* <Footer/> */}
            <footer>RODAPE</footer>
        </div>
    );
}