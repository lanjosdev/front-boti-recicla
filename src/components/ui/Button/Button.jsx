// Hooks / Libs:
// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:


// Estilo:
import './button.css';


export function Button({ children, ...props }) {


    return (
        <button 
        className="Button"
        {...props}
        >
            <span className='children'>{children}</span>  

            {/* Detalhes da borda do botao */}
            <span className='squares top'>
                <div className="square"></div>
            </span>

            <span className='square right'></span>

            <span className='squares bottom'>
                <div className="square"></div>
            </span>

            <span className='square left'></span>
        </button>
    )        
}