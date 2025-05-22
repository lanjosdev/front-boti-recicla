// Hooks / Libs:
import { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// Components:
import { Button } from '../Button/Button';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:


// Estilo:
// import './alert.css';


export function Alert({ close, title='Aviso', text }) {

    useEffect(() => {
        // window.scrollTo(0, 0);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="Alert Participated animate__animated animate__fadeIn animate__faster">
            <div className="container_text">
                <h2 className='txt_emphasis'>
                    {title}
                </h2>

                <div className="block_text">
                    <p>
                        {text}
                    </p>
                </div>
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