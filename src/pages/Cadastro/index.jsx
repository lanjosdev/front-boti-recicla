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
import { InputCPF } from "../../components/InputCPF/InputCPF";
import { Footer } from "../../components/Footer/Footer";

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
    const [formDataRegister, setFormDataRegister] = useState({
        name: '',
        email: '',
        cpf: ''
    });
    
    const [showTerms, setShowTerms] = useState(false);




    useEffect(()=> {
        function initializePage() {
            console.log('Effect /Cadastro');
        } 
        initializePage();
    }, []);

    


    function handleChangeForm(e) {
        const { id, value } = e.target;
        console.log(value)
        console.log(value.length)
        
        if(!id) {
            console.warn('ID do input alvo não definido')
            return;
        }

        
        // Salva no state:
        setFormDataRegister((prev) => ({ ...prev, [id]: value }));
    }

    const handleChange = (e) => {
        const newValue = e.target.value;

        // Impede números em qualquer posição
        if (/\d/.test(newValue)) return;

        // Impede espaço no início ou múltiplos espaços consecutivos sem letras
        if (
        newValue.startsWith(' ') || // Espaço inicial
        (newValue.includes('  ') && !/[a-zA-Z]/.test(newValue)) // Múltiplos espaços sem letras
        ) {
            return;
        }

        // Atualiza o estado apenas se passar em todas as validações
        setFormDataRegister((prev)=> ({...prev, name: newValue}));
    };
  
    return (
        <div className="Page Cadastro grid">
            <Header />

            <main className='mainPage Cadastro'>
                <div className="main_top">
                    <p className="sub_title txt_emphasis">
                        A primeira loja do mundo em que a moeda é material reciclável
                    </p>

                    <div className="cta">
                        <span>{'>>'}</span>
                        <p>
                            Cadastra-se, converta <br />
                            suas embalagens e troque seus créditos
                            por produtos exclusivos da loja
                        </p>
                    </div>
                </div>

                <div className="divider"></div>

                <form className="main_form" autoComplete="off">
                    <h2 className="txt_emphasis">Cadastro</h2>


                    <div className="input--label">
                        <input type="text"
                        id="name" 
                        className="input"
                        placeholder="Nome Completo" 
                        value={formDataRegister.name}
                        onChange={handleChange}
                        minLength={3}
                        required
                        />

                        <label htmlFor="name">Nome</label>
                    </div>

                    <div className="input--label">
                        <input type="email"
                        inputMode="email"
                        id="email" 
                        className="input"
                        placeholder="email@email.com" 
                        value={formDataRegister.email}
                        onChange={handleChangeForm}
                        required
                        />

                        <label htmlFor="email">E-mail</label>
                    </div>

                    <div className="input--label">
                        <InputCPF />

                        <label htmlFor="">CPF</label>
                    </div>


                    <p className="alert_terms">
                        Ao se cadastrar, você concorda <br />
                        com os termos da nossa Política de Privacidade.
                    </p>

                    <div className="container_btn">
                        <button className="btn primary">
                            Continuar
                        </button>
                    </div>
                </form>

                {/* COMPONENTE TERMOS */}
            </main>

            <Footer />
        </div>
    );
}