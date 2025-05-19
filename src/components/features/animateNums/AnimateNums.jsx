import { useState, useEffect, useRef } from 'react';

import { formatPtBr } from '../../../utils/formatNumbers';

// Componente de contador animado
export const AnimateNums = ({
    valorFinal,
    duracaoAnimacao = 1300,
    casasDecimais = 0,
    prefixo = '',
    sufixo = '',
    formatBr = false,
    className = ''
}) => {
    const [valorAtual, setValorAtual] = useState(0);
    const inicioRef = useRef(0);
    const animacaoRef = useRef(null);

    // Função para formatar o número com casas decimais específicas
    const formatarNumero = (numero) => {
        return numero.toFixed(casasDecimais);
    };

    useEffect(() => {
        // Limpar a animação anterior caso exista
        if (animacaoRef.current) {
            cancelAnimationFrame(animacaoRef.current);
        }

        // Iniciar de zero
        setValorAtual(0);

        const startTime = performance.now();
        const animar = (timestamp) => {
            // Calcular o progresso da animação
            const tempoPassado = timestamp - startTime;
            const progresso = Math.min(tempoPassado / duracaoAnimacao, 1);

            // Aplicar uma função de easing para suavizar a animação
            const easeOutCubic = 1 - Math.pow(1 - progresso, 3);

            // Calcular o valor atual com base no progresso
            const valor = inicioRef.current + (valorFinal - inicioRef.current) * easeOutCubic;
            setValorAtual(valor);

            // Continuar a animação se ainda não estiver completa
            if (progresso < 1) {
                animacaoRef.current = requestAnimationFrame(animar);
            }
        };

        animacaoRef.current = requestAnimationFrame(animar);

        // Limpa a animação quando o componente for desmontado
        return () => {
            if (animacaoRef.current) {
                cancelAnimationFrame(animacaoRef.current);
            }
        };
    }, [valorFinal, duracaoAnimacao]);

    return (
        <div className={`AnimateNums ${className}`}>
            {prefixo}{formatBr ? formatPtBr(formatarNumero(valorAtual)) : formatarNumero(valorAtual)}<span style={{fontSize: '3rem'}}>{sufixo}</span>
        </div>
    );
};