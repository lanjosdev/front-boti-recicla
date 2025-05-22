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

import { Participated } from "../../components/ui/Participated/Participated";
import { Alert } from "../../components/ui/Alert/Alert";

// Utils:
import CookiesUtils from "../../utils/cookiesUtils";

// Assets:
import iconSeta from '../../assets/icons/sinal.webp';

// Estilo:
import './style.css';



export default function Cadastro() {
    // Constantes do componente:
    const configsApp = JSON.parse(Cookies.get(APP_CONSTANTS.COOKIE_CONFIG_NAME) || null);
    const cookiesExpires = configsApp.COOKIES_EXPIRES || 7;
    console.log(cookiesExpires)
    const cpfBlock = configsApp.CPF_BLOCK || false;
    console.log(cpfBlock)

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

    // const [showTerms, setShowTerms] = useState(false);
    const [showParticipated, setShowParticipated] = useState(false);

    const defaultAlert = {
        open: false,
        title: 'Aviso',
        text: null
    };
    const [alert, setAlert] = useState(defaultAlert);

    // const [notify, setNotify] = useState(0);




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

    // function handleShowTerms() {
    //     if(!loadingSubmit) {
    //         setShowTerms(true);
    //     }
    // }

    
    // SUBMIT API:
    async function handleSubmitRegisterAPI(e) {
        e.preventDefault();
        setLoadingSubmit(true);
        // const startTime = performance.now();


        // VALIDAÇÕES:
        if(formDataRegister.cpf.length < 14) {
            setValidationErrors(prev => ({...prev, cpf: ['CPF incompleto']}));
            // toast.warn('Preencha o formulário corretamente');
            setAlert({
                open: true,
                title: 'Aviso',
                text: 'Preencha o formulário corretamente'
            });
            setLoadingSubmit(false);
            return;
        }


        // REQUEST:
        try {
            const bodyReq = {...formDataRegister};
            bodyReq.cpf = bodyReq.cpf.replace(/\D/g, '');
            // if(notify == 1) {
            //     bodyReq.notify = 1;
            // }

            const response = await RegisterService.Register(bodyReq);
            console.log(response);
            
            if(response.success) {
                const token = response.data.token;
                Cookies.set(APP_CONSTANTS.COOKIE_AUTH_TOKEN_NAME, token, { 
                    secure: true,
                    sameSite: 'Strict',
                    expires: cookiesExpires
                });

                const idUser = response.data.id_user_register;
                Cookies.set(APP_CONSTANTS.COOKIE_ID_USER_NAME, idUser, { 
                    secure: true,
                    sameSite: 'Strict',
                    expires: cookiesExpires
                });

                // toast.success('Cadastro realizado com sucesso.');
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
                        // toast.error('Ops, houve um erro');
                        setAlert({
                            open: true,
                            title: 'Ops, houve um erro',
                            text: 'Tente novamente'
                        });
                        break;
                    default:
                        // toast.warn(response.message);
                        setAlert({
                            open: true,
                            title: 'Aviso',
                            text: response.message
                        });
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
        <div className="Page Cadastro grid animate__animated animate__fadeIn">
            <Header />

            <main className='mainPage Cadastro'>
                <div className="main_top">
                    <p className="sub_title txt_emphasis">
                        A primeira loja do mundo em que a moeda é material reciclável
                    </p>

                    <div className="cta">
                        <img className="icon" src={iconSeta} alt="" />
                        <p className="">
                            Cadastra-se, converta <br />
                            suas embalagens e troque seus créditos
                            por produtos exclusivos da loja.
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
                        placeholder='NOME SOBRENOME'
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
                        placeholder="XXXXXX@XXXXXX.COM" 
                        value={formDataRegister.email}
                        onChange={handleChangeForm}
                        required
                        />

                        <label htmlFor="email">EMAIL</label>
                    </div>


                    {/* Mensagens de validação */}
                    {(errorsRender.length > 0 && !errorsRender.includes('CPF já cadastrado')) && (
                    <div className="msg_feedback error">
                        {errorsRender.map((item, idx)=> (
                            <p className="item" key={idx}>
                                <span>X</span>
                                {/* <i className="bi bi-exclamation-circle"></i> */}
                                <span> {item}</span>
                            </p>
                        ))}
                    </div>
                    )}
                    

                    <div className="terms">
                        <div className="term">
                            {/* <input type="checkbox" name="" id="" required /> */}
                            <p>
                                Ao se cadastrar, você concorda
                                com os termos da nossa <a className="txt_link" href="/termos-boticario.pdf" target="_blank">Política de Privacidade e Regulamento</a>.
                            </p>
                        </div>

                        {/* <div className="term">
                            <input type="checkbox" name="" id="" checked={notify} onChange={()=> setNotify(prev => !prev)} />
                            <p>
                                Aceito receber ofertas e novidades de O Boticário por e-mail.
                            </p>
                        </div> */}
                    </div>

                    {/* <p className="alert_terms">
                        Ao se cadastrar, você concorda <br />
                        com os termos da nossa <a className="call_terms txt_link" href={docPDF} download>Política de Responsabilidade</a>.
                    </p>
                    <p className="alert_terms">
                        Ao se cadastrar, você concorda <br />
                        com os termos da nossa <a className="call_terms txt_link" href={docPDF} target="_blank">Política de Responsabilidade</a>.
                    </p> */}


                    <div className="container_btn">

                        {cpfBlock ? (
                        <Button disabled={validationErrors.cpf.length > 0 || loadingSubmit}>
                            {loadingSubmit ? (
                                <span>Cadastrando...</span>
                            ) : (
                                <span>Continuar</span>
                            )}
                        </Button>
                        ) : (
                        <Button disabled={loadingSubmit}>
                            {loadingSubmit ? (
                                <span>Cadastrando...</span>
                            ) : (
                                <span>Continuar</span>
                            )}
                        </Button>
                        )}
                        
                    </div>
                </form>


                {/* Termos */}
                {/* {showTerms && (
                    <Terms close={()=> setShowTerms(false)} />
                )} */}

                {/* Já participou */}
                {showParticipated && (
                    <Participated close={()=> setShowParticipated(false)} />
                )}

                {alert?.open && (
                    <Alert 
                    close={()=> setAlert(defaultAlert)}  
                    title={alert?.title || null}
                    text={alert?.text || null}
                    />
                )}
            </main>

            <Footer />
        </div>
    );
}