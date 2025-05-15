// Hooks / Libs:
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// CONSTANTES:
import { APP_CONSTANTS } from "../../config/appConstants";

// API:
import RegisterService from "../../api/registerService";

// Contexts:
// import UserContext from "../../contexts/userContext";

// Components:
import { toast } from "react-toastify";
import { Header } from "../../components/layout/Header/Header";
import { InputName } from "../../components/Forms/InputName/InputName";
import { InputCPF } from "../../components/Forms/InputCPF/InputCPF";
import { Button } from "../../components/ui/Button/Button";
import { Footer } from "../../components/layout/Footer/Footer";
import { Terms } from "../../components/ui/Terms/Terms";
import { Participated } from "../../components/ui/Participated/Participated";

// Utils:
import CookiesUtils from "../../utils/cookiesUtils";

// Assets:
// import imgLogo from '../../assets/images/LOGO-BIZSYS_preto.png';

// Estilo:
import './style.css';



export default function Cadastro() {
    // Constantes do componente:
    const navigate = useNavigate();
    
    // Estados do componente:
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [validationErrors, setValidationErrors] = useState({
        name: [],
        email: [],
        cpf: []
    });
    const [errorsRender, setErrorsRender] = useState([]);

    // Logica UI + Dados a submiter:
    const [formDataRegister, setFormDataRegister] = useState({
        name: '',
        email: '',
        cpf: ''
    });

    const [showTerms, setShowTerms] = useState(false);
    const [showParticipated, setShowParticipated] = useState(false);




    useEffect(()=> {
        function initializePage() {
            console.log('Effect /Cadastro');
        } 
        initializePage();
    }, []);

    useEffect(()=> {
        function structuringErrorsRender() {
            let errors = [];

            for(let key in validationErrors) {
                errors.push(...validationErrors[key]);
            }

            // console.log(errors)
            setErrorsRender(errors);
        } 
        structuringErrorsRender();
    }, [validationErrors]);

    
    


    function handleChangeForm(e) {
        const { id, value } = e.target;
        // console.log(id, value)
        
        // Checagem inicial:
        if(!id) {
            console.warn('ID do input alvo não foi definido')
            return;
        }

        if(!Object.hasOwn(formDataRegister, id)) {
            console.warn(`ID "${id}" do input alvo não é compátivel com o state de formulario`)
            return;
        }

        
        // Atualiza state
        setFormDataRegister((prev) => ({ ...prev, [id]: value }));
    }

    function handleShowTerms() {
        if(!loadingSubmit) {
            setShowTerms(true);
        }
    }

    
    // SUBMIT API:
    async function handleSubmitRegisterAPI(e) {
        e.preventDefault();
        setLoadingSubmit(true);
        // const startTime = performance.now();


        // VALIDAÇÕES:
        if(formDataRegister.cpf.length < 14) {
            setValidationErrors(prev => ({...prev, cpf: ['CPF incompleto']}));
            toast.warn('Preencha o formulário corretamente');
            setLoadingSubmit(false);
            return;
        }


        // REQUEST:
        try {
            const bodyReq = {...formDataRegister};
            bodyReq.cpf = bodyReq.cpf.replace(/\D/g, '');

            const response = await RegisterService.Register(bodyReq);
            console.log(response);
            
            if(response.success) {
                const token = response.data.token;
                Cookies.set(APP_CONSTANTS.COOKIE_AUTH_TOKEN_NAME, token, { 
                    secure: true,
                    sameSite: 'Strict'
                });

                const idUser = response.data.id_user_register;
                Cookies.set(APP_CONSTANTS.COOKIE_ID_USER_NAME, idUser, { 
                    secure: true,
                    sameSite: 'Strict'
                });

                toast.success('Cadastro realizado com sucesso.');
                CookiesUtils.RemoveParticipation();
                
                navigate('/instrucoes');
            }
            else if(response.success == false) {
                console.warn('Success False:', response.message);

                switch(response.message) {
                    // {
                    //     "success": false,
                    //     "message": "CPF já registrado. Por favor, verifique."
                    // }

                    case 'CPF já registrado. Por favor, verifique.':
                        setShowParticipated(true);
                        setValidationErrors(prev => ({...prev, cpf: ['CPF já cadastrado']}));
                        break;
                    case 'error':
                        toast.error('Ops, houve um erro');
                        break;
                    default:
                        toast.warn(response.message);
                }

                // if(response.message == "CPF já registrado. Por favor, verifique.") {
                //     setValidationErrors(prev => ({...prev, cpf: ['CPF já cadastrado']}));
                // }
            }
            else {
                toast.error('Erro inesperado');
            }
        }
        catch(error) {
            console.error('DETALHES DO ERRO:', error);
            setValidationErrors(['Houve um erro.']); 
        }

        
        // const endTime = performance.now();
        // const seconds = ((endTime - startTime) / 1000).toFixed(2);
        setLoadingSubmit(false);
    }
    
    


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

                <form className="main_form" onSubmit={handleSubmitRegisterAPI} autoComplete="off">
                    <h2 className="txt_emphasis">Cadastro</h2>


                    <div className="input--label">
                        <InputName 
                        id="name" 
                        value={formDataRegister.name} 
                        setValue={handleChangeForm} 
                        placeholder='Nome Completo'
                        />

                        <label htmlFor="name">Nome</label>
                    </div>

                    <div className="input--label">
                        <InputCPF 
                        id="cpf"
                        value={formDataRegister.cpf}
                        setValue={handleChangeForm}
                        placeholder='000.000.000-00'
                        validationErrors={validationErrors}
                        setValidationErrors={setValidationErrors}
                        />

                        <label htmlFor="">CPF</label>
                    </div>

                    <div className="input--label">
                        <input 
                        type="email"
                        inputMode="email"
                        id="email" 
                        className="input"
                        placeholder="email@email.com" 
                        value={formDataRegister.email}
                        onChange={handleChangeForm}
                        required
                        />

                        <label htmlFor="email">EMAIL</label>
                    </div>


                    {/* Mensagens de validação */}
                    {errorsRender.length > 0 && (
                    <div className="msg_feedback error">
                        {errorsRender.map((item, idx)=> (
                            <p className="item" key={idx}>
                                <i className="bi bi-exclamation-circle"></i>
                                <span> {item}</span>
                            </p>
                        ))}
                    </div>
                    )}
                    

                    <p className="alert_terms">
                        Ao se cadastrar, você concorda <br />
                        com os termos da nossa <span className="call_terms txt_link" onClick={handleShowTerms}>Política de Privacidade</span>.
                    </p>

                    <div className="container_btn">
                        {/* <button className="btn primary" disabled={validationErrors.cpf.length > 0 || loadingSubmit}> */}
                        <Button disabled={loadingSubmit}>
                            {loadingSubmit ? (
                                <span>Cadastrando...</span>
                            ) : (
                                <span>Continuar</span>
                            )}
                        </Button>
                    </div>
                </form>


                {/* Termos */}
                {showTerms && (
                    <Terms close={()=> setShowTerms(false)} />
                )}

                {/* Já participou */}
                {showParticipated && (
                    <Participated close={()=> setShowParticipated(false)} />
                )}
            </main>

            <Footer />
        </div>
    );
}