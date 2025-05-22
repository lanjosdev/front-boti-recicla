// Hooks / Libs:
import { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// Components:
import { Button } from '../Button/Button';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:


// Estilo:
import './participated.css';


export function Participated({ close, underweight }) {

    useEffect(() => {
        // window.scrollTo(0, 0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);



    return (
        <div className="Participated animate__animated animate__fadeIn animate__faster">
            <div className="container_text">
                <h2 className='txt_emphasis'>
                    Que pena.
                </h2>


                {underweight ? (
                <div className="block_text">
                    <p>
                        Infelizmente você não atingiu a 
                        quantidade mínima de 700g para
                        receber créditos.
                    </p>
                    <p>
                        Mas para continuar reciclando suas
                        embalagens e ajudando a preservar o
                        planeta, conte com os pontos de coleta
                        Boti Recicla nas lojas O Boticário.
                    </p>
                </div>
                ) : (
                <div className="block_text">
                    <p>
                        Infelizmente você só pode participar
                        <span className="txt_emphasis"> uma vez</span> dessa ativação.
                    </p>
                    <p>
                        Mas para continuar reciclando suas
                        embalagens e ajudando a preservar o
                        planeta, conte com os pontos de coleta
                        Boti Recicla nas lojas O Boticário.
                    </p>
                </div>
                )}
            </div>

            {/* <button type='button' className='btn primary' onClick={close}>
                Entendi
            </button> */}
            <Button type='button' onClick={close}>
                Entendi
            </Button>
        </div>
    )        
}