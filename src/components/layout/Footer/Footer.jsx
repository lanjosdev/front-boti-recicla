// Funcionalidades / Libs:
// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:
import imgFooter from '../../../assets/images/footer.png';

// Estilo:
import './footer.css';


export function Footer() {

    return (
        <footer className="Footer">
            <div className="container_img">
                <img src={imgFooter} alt="" className="img_footer" />
            </div>
        </footer>
    )        
}