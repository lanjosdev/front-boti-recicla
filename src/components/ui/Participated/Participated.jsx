// Funcionalidades / Libs:
// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:


// Estilo:
import './participated.css';


export function Participated({ close }) {


    return (
        <div className="Participated animate__animated animate__fadeIn animate__faster">
            <h2 className='txt_emphasis'>
                Que pena.
            </h2>

            <div className="container_text">
                <p>
                    Infelizmente você só pode participar 
                    uma vez dessa ativação. 
                </p>
                <p>
                    Mas para continuar reciclando suas 
                    embalagens e ajudando a preservar o 
                    planeta, conte com os pontos de coleta 
                    Boti Recicla nas lojas O Boticário.
                </p>
            </div>

            <button type='button' className='btn primary' onClick={close}>
                Entendi
            </button>
        </div>
    )        
}