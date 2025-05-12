// Hooks / Libs:
// import { useState } from 'react';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:

// Estilo:
// import './inputcpf.css';



export function InputCPF({ id, value, setValue, placeholder, maxLength=14, required=true, validationErrors, setValidationErrors }) {
    // const [isValid, setIsValid] = useState(true);
    // const [message, setMessage] = useState('');

    
    // Aplica a máscara ao CPF
    const formatCPF = (value) => {
        // Remove tudo que não é número
        value = value.replace(/\D/g, '');
        
        // Aplica a máscara
        if(value.length <= 3) {
            // Não faz nada
        } 
        else if(value.length <= 6) {
            value = value.replace(/^(\d{3})(\d+)/, '$1.$2');
        } 
        else if(value.length <= 9) {
            value = value.replace(/^(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        } 
        else {
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
        }
        
        return value;
    };

    // Valida o CPF
    const validateCPF = (cpf) => {
        // setIsValid(true);
        setValidationErrors(prev => ({...prev, cpf: []}));

        // Remove caracteres não numéricos para validação
        const numericCPF = cpf.replace(/\D/g, '');
        
        // Verifica se tem 11 dígitos
        if(numericCPF.length !== 11) {
            // setIsValid(false);
            // setMessage(numericCPF.length > 0 ? 'CPF incompleto' : '');
            return false;
        }
        
        // Verifica se todos os dígitos são iguais (CPF inválido, mas com formato correto)
        if(/^(\d)\1+$/.test(numericCPF)) {
            // setIsValid(false);
            setValidationErrors(prev => ({...prev, cpf: ['CPF inválido']}));
            // setMessage('CPF inválido');
            return false;
        }
        
        // Validação do primeiro dígito verificador
        let sum = 0;
        for(let i = 0; i < 9; i++) {
            sum += parseInt(numericCPF.charAt(i)) * (10 - i);
        }
        let rest = 11 - (sum % 11);
        if(rest === 10 || rest === 11) rest = 0;
        if(rest !== parseInt(numericCPF.charAt(9))) {
            // setIsValid(false);
            setValidationErrors(prev => ({...prev, cpf: ['CPF inválido']}));
            // setMessage('CPF inválido');
            return false;
        }
        
        // Validação do segundo dígito verificador
        sum = 0;
        for(let i = 0; i < 10; i++) {
            sum += parseInt(numericCPF.charAt(i)) * (11 - i);
        }
        rest = 11 - (sum % 11);
        if(rest === 10 || rest === 11) rest = 0;
        if(rest !== parseInt(numericCPF.charAt(10))) {
            // setIsValid(false);
            setValidationErrors(prev => ({...prev, cpf: ['CPF inválido']}));
            // setMessage('CPF inválido');
            return false;
        }
        
        // Valido
        // setIsValid(true);
        // setMessage('CPF válido');
        return true;
    };

    

    const handleChangeCPF = (e) => {
        const newValue = e.target.value;
        // console.log(newValue);

        validateCPF(newValue);

        // const formattedValue = formatCPF(newValue);
        setValue(e);
    };


    return (
        <div className="InputCPF">
            <input
            type="text"
            inputMode='numeric'
            id={id}
            className={`input ${validationErrors.cpf.length > 0 ? 'error' : ''}`}
            value={formatCPF(value)}
            onChange={handleChangeCPF}
            placeholder={placeholder}
            // minLength={maxLength}
            maxLength={maxLength}
            required={required}
            />

            {/* Sugestão: Mensagem de feedback */}
        </div>
    );
}