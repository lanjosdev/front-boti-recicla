// Hooks / Libs:
// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// Components:
import { Button } from '../Button/Button';

// Utils:
//import { formatarHora } from '../../../utils/formatarNumbers';

// Assets:


// Estilo:
import './terms.css';


export function Terms({ close }) {


    return (
        <div className="Terms animate__animated animate__fadeInUp animate__faster">
            {/* <div className="container_text">
                <p>
                    TERMO DE RESPONSABILIDADE
                </p>
                <br />

                <p>
                    1. Poderá participar da promoção qualquer consumidor residente e domiciliado em território nacional, desde que preencha os requisitos estipulados no regulamento da campanha autorizada;
                </p>
                <br />

                <p>
                    2. Os prêmios não poderão ser convertidos em dinheiro;
                </p>
                <br />

                <p>
                    3. É vedada a apuração por meio eletrônico;
                </p>
                <br />

                <p>
                    4. Os prêmios serão entregues em até 30 dias da data da apuração/sorteio, sem qualquer ônus aos contemplados. Quando o prêmio sorteado, ganho em concurso ou conferido mediante vale-brinde, não for reclamado no prazo de cento e oitenta (180) dias, contados, respectivamente, da data do sorteio, da apuração do resultado do concurso ou do término do prazo da promoção, caducará o direito do respectivo titular e o valor correspondente será recolhido, pela empresa autorizada, ao Tesouro Nacional, como renda da União, no prazo de quarenta e cinco (45) dias;
                </p>
                <br />

                <p>
                    5. Em caso de promoções com participação de menor de idade, sendo este contemplado, deverá, no ato da entrega do prêmio, ser representado por seu responsável legal;
                </p>
                <br />

                <p>
                    6. A divulgação da imagem dos contemplados poderá ser feita até um ano após a apuração da promoção comercial;
                </p>
                <br />

                <p>
                    7. As dúvidas e controvérsias oriundas de reclamações dos participantes serão, primeiramente, dirimidas pela promotora, persistindo-as, estas deverão ser submetidas à SPA/MF; 
                </p>
                <br />

                <p>
                    8. Os órgãos locais de defesa do consumidor receberão as reclamações devidamente fundamentadas;
                </p>
                <br />

                <p>
                    9. O número do Certificado de Autorização deverá constar obrigatoriamente, de forma clara e precisa, em todo material utilizado na divulgação da promoção;
                </p>
                <br />

                <p>
                    10. A prestação de contas deverá ser realizada no prazo máximo de trinta dias após a data de prescrição dos prêmios sob pena de descumprimento do plano de distribuição de prêmios;
                </p>
                <br />

                <p>
                    11. O regulamento deverá ser afixado em lugar de ampla visibilidade e se apresentar em tamanho e em grafia que viabilizem a compreensão e visualização por parte do consumidor participante da promoção comercial;
                </p>
                <br />

                <p>
                    12. Além dos termos acima, a promoção comercial deverá obedecer às condições previstas na Lei nº 5.768, de 1971, no Decreto nº 70.951, de 1972, Portaria MF nº 41, de 2008, Portaria MF nº 67, de 2017, Portaria MF nº 422 de 2013, Portaria SRE/MF nº 88 de 2000, e em atos que as complementarem.
                </p>
                <br />

                <p>
                    13. A infringência às cláusulas do Termo de Responsabilidade e do Regulamento constituem descumprimento do plano de operação e ensejam as penalidades previstas no artigo 13 da Lei nº. 5.768, de 1971.
                </p>
                <br />

                <p>
                    Para verificar a autenticidade do Regulamento, acesse a opção 'Consulta Pública da Promoção Comercial', no endereço <a className='txt_link' href="https://scpc.seae.fazenda.gov.br/scpc/login.jsf" target='_blank' rel='noopener noreferrer' >https://scpc.SRE.fazenda.gov.br</a> e informe o número do Certificado de Autorização.
                </p>
                <br />

                <p>
                    DA PRESTAÇÃO DE CONTAS <br />
                    A prestação de contas deverá ser realizada até a data constante no cabeçalho da promoção no SCPC, conforme as regras estabelecidas na Portaria SEAE nº 7.638, de 18 de outubro de 2022. O vencimento do prazo para a prestação de contas constitui em mora as empresas promotoras. A não realização da prestação de contas até a data de seu vencimento ensejará a aplicação de multa de 100% (cem por cento) incidente sobre a soma dos valores dos bens prometidos a título de premiação e a proibição de realizar as operações de distribuição gratuita de prêmios a título de propaganda, durante o prazo de 2 (dois) anos, contados da data limite da prestação de contas, nos termos do art. 13 da Lei nº 5.768, de 20 de dezembro de 1971. A fixação da multa poderá ser revista em grau de recurso administrativo, a ser apresentado conforme o art. 56 da Lei nº 9.784, de 29 de janeiro de 1999.
                </p>

            </div> */}

            {/* <iframe src='/termos-boticario.pdf' width="100%" height="400px"></iframe> */}
            {/* <embed src='/termos-boticario.pdf' type="application/pdf" width="100%" height="400px" /> */}
            {/* <iframe src="https://mozilla.github.io/pdf.js/web/viewer.html?file=https://botirecicla.rbiz.cc/documento-teste.pdf" width="100%" height="450px"></iframe> */}


            {/* <button type='button' className='btn primary' onClick={close}>Ok</button> */}
            <Button type='button' onClick={close}>
                Ok
            </Button>
        </div>
    )        
}