// Hooks / Libs:
import { useState, useEffect } from 'react';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:

// Estilo:
import './inputcpf.css';



export function InputCPF() {
    const [cpf, setCpf] = useState('');
    // const [isValid, setIsValid] = useState(null);
    // const [message, setMessage] = useState('');

    // Aplica a máscara ao CPF
    const formatCPF = (value) => {
        // Remove tudo que não é número
        value = value.replace(/\D/g, '');

        // Aplica a máscara
        if (value.length <= 3) {
            // Não faz nada
        } else if (value.length <= 6) {
            value = value.replace(/^(\d{3})(\d+)/, '$1.$2');
        } else if (value.length <= 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        } else {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
        }

        return value;
    };



    // Valida o CPF
    // const validateCPF = (cpf) => {
    //     // Remove caracteres não numéricos para validação
    //     const numericCPF = cpf.replace(/\D/g, '');

    //     // Verifica se tem 11 dígitos
    //     if (numericCPF.length !== 11) {
    //         setIsValid(false);
    //         setMessage(numericCPF.length > 0 ? 'CPF incompleto' : '');
    //         return false;
    //     }

    //     // Verifica se todos os dígitos são iguais (CPF inválido, mas com formato correto)
    //     if (/^(\d)\1+$/.test(numericCPF)) {
    //         setIsValid(false);
    //         setMessage('CPF inválido');
    //         return false;
    //     }

    //     // Validação do primeiro dígito verificador
    //     let sum = 0;
    //     for (let i = 0; i < 9; i++) {
    //         sum += parseInt(numericCPF.charAt(i)) * (10 - i);
    //     }
    //     let rest = 11 - (sum % 11);
    //     if (rest === 10 || rest === 11) rest = 0;
    //     if (rest !== parseInt(numericCPF.charAt(9))) {
    //         setIsValid(false);
    //         setMessage('CPF inválido');
    //         return false;
    //     }

    //     // Validação do segundo dígito verificador
    //     sum = 0;
    //     for (let i = 0; i < 10; i++) {
    //         sum += parseInt(numericCPF.charAt(i)) * (11 - i);
    //     }
    //     rest = 11 - (sum % 11);
    //     if (rest === 10 || rest === 11) rest = 0;
    //     if (rest !== parseInt(numericCPF.charAt(10))) {
    //         setIsValid(false);
    //         setMessage('CPF inválido');
    //         return false;
    //     }

    //     setIsValid(true);
    //     setMessage('CPF válido');
    //     return true;
    // };

    const handleChange = (e) => {
        const rawValue = e.target.value;
        const formattedValue = formatCPF(rawValue);
        setCpf(formattedValue);
    };

    // Valida o CPF sempre que ele mudar
    // useEffect(() => {
    //     if (cpf) {
    //         validateCPF(cpf);
    //     } else {
    //         setMessage('');
    //         setIsValid(null);
    //     }
    // }, [cpf]);

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