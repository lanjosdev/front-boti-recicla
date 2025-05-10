// Hooks / Libs:
// import { useState, useEffect } from 'react';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:

// Estilo:
// import './inputname.css';



export function InputName({ id, value, setValue, placeholder, minLength=3, maxLength=150, required=true }) {


    function nameIsValid(value) {
        // Validação principal: permite apenas letras, espaços e caracteres acentuados
        if(/[^a-zA-ZÀ-ÿ\s]/gi.test(value)) return false;

        // Impede espaço no início
        if(value.startsWith(' ')) return false;

        // Impede múltiplos espaços consecutivos
        if(/(\s{2,})/.test(value)) return false;


        // Valido
        return true;
    }

    function handleChangeName(e) {
        const newValue = e.target.value;
        // console.log(newValue);

        if(!nameIsValid(newValue)) {
            // console.warn('Nome não é valido');
            return;
        }
        

        // console.log('Atualiza state')
        setValue(e);
    };

    return (
        <div className="InputName">
            <input 
            type="text"
            id={id} 
            className="input"
            value={value}
            onChange={handleChangeName}
            placeholder={placeholder}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            />

            {/* Sugestão: Mensagem de feedback */}
        </div>
    );
}