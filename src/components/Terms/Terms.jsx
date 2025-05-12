// Funcionalidades / Libs:
// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:


// Estilo:
import './terms.css';


export function Terms({ close }) {


    return (
        <div className="Terms animate__animated animate__bounceInUp">
            <div className="container_text">
                <p>### Texto termos aqui ###</p>
            </div>

            <button type='button' className='btn primary' onClick={close}>Ok</button>
        </div>
    )        
}