// Hooks / Libs:
import { useState, useEffect } from 'react';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:

// Estilo:
import './inputcpf.css';



export function InputName() {
    const [cpf, setCpf] = useState('');
    // const [isValid, setIsValid] = useState(null);
    // const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const newValue = e.target.value;

        // Impede números em qualquer posição
        if (/\d/.test(newValue)) return;

        // Impede espaço no início ou múltiplos espaços consecutivos sem letras
        if (
        newValue.startsWith(' ') || // Espaço inicial
        (newValue.includes('  ') && !/[a-zA-Z]/.test(newValue)) // Múltiplos espaços sem letras
        ) {
            return;
        }

        // Atualiza o estado apenas se passar em todas as validações
        setFormDataRegister((prev)=> ({...prev, name: newValue}));
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <input
                type="text"
                id="cpf"
                value={cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                maxLength={14}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* {message && (
            <div className={`mt-2 text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                {message}
            </div>
            )} */}
        </div>
    );
}