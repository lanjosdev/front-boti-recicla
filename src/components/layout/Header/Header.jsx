// Hooks / Libs:
// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:
import imgLogo from '../../../assets/images/logo-BotiReciclaStore.webp';

// Estilo:
import './header.css';


export function Header() {


    return (
        <header className="Header">
            <div className="logo">
                <img src={imgLogo} alt="" className="img_logo" />
            </div>
        </header>
    )        
}