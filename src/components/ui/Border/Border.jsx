// Hooks / Libs:
// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:


// Estilo:
import './border.css';


export function Border({ children, ...props }) {


    return (
        <div
        className="Border"
        {...props}
        >
            {children}

            {/* Detalhes da borda do botao */}
            <span className='squares top'>
                <div className="square"></div>
            </span>

            <span className='square right'></span>

            <span className='squares bottom'>
                <div className="square"></div>
            </span>

            <span className='square left'></span>
        </div>
    )        
}