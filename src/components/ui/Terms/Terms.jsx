// Hooks / Libs:
// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// Components:
import { Button } from '../Button/Button';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:


// Estilo:
import './terms.css';


export function Terms({ close }) {


    return (
        <div className="Terms animate__animated animate__fadeInUp animate__faster">
            <div className="container_text">
                <p>
                    Termos e condições infinitas. Texto a ser enviado pelo cliente...
                </p>

            </div>

            {/* <button type='button' className='btn primary' onClick={close}>Ok</button> */}
            <Button type='button' onClick={close}>
                Ok
            </Button>
        </div>
    )        
}