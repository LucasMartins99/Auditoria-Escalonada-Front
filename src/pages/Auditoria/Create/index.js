import React, { useState } from 'react';
import { MdDone, MdReply } from 'react-icons/md';
import { Form, Select } from '@rocketseat/unform';
import { Container, AuditoriaTable } from './styles';

export default function Auditoria() {
    const [item, setItem] = useState([]);
    const options = [
        { id: 'OK', title: 'OK' },
        { id: 'NOK', title: 'NOK' },
    ];
    function handleSubmit(data) {
        setItem(data);
    }

    return (
        <Container>
            <header>
                <p>Cadastro Auditoria</p>
                <button type="submit">
                    <MdReply size={15} color="#fff" />
                </button>
                <button type="submit">
                    <MdDone size={15} color="#fff" />
                </button>
            </header>
            <Form onSubmit={handleSubmit}>
                <AuditoriaTable>
                    <thead>
                        <tr>
                            <th>ITENS AUDITADOS</th>
                            <th>CHECK</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                1.1 - A FOI (Folha de operção) esta disponivel e
                                acessivel fisicamente ou eletronicamente ?
                            </td>
                            <td>
                                <Select
                                    name="item11"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                1.2 - Os parâmetros de processo e produto estão
                                sendo avaliados conforme frequência definida na
                                FOI?
                            </td>
                            <td>
                                <Select
                                    name="item12"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                1.3 - As instruções de trabalhos/Tabelas estão
                                disponíveis, atualizadas e acessíveis
                                fisicamente ou eletronicamente?
                            </td>
                            <td>
                                <Select
                                    name="item13"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                1.4 - Os registros de liberação e/ou de setup
                                estão sendo preenchidos conforme frequência
                                definida na FOI?
                            </td>
                            <td>
                                <Select
                                    name="item14"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                1.5 - Para parâmetros de processo ou produto
                                fora da especificação o plano de reação esta
                                sendo seguido? Ou existe um desvio previamente
                                aprovado?
                            </td>
                            <td>
                                <Select
                                    name="item15"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                2.1 - Os instrumentos de medição e dispositivos
                                de controle estão disponíveis e em boas
                                condições para uso?
                            </td>
                            <td>
                                <Select
                                    name="item21"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                2.2 - A numeração dos instrumentos /
                                dispositivos de controle estão legíveis? A
                                validação/calibração estão em dia?
                            </td>
                            <td>
                                <Select
                                    name="item22"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                3.1 - As validações da correta funcionalidade
                                dos poka yokes estão sendo realizadas?
                            </td>
                            <td>
                                <Select
                                    name="item31"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                3.2 - No caso de problemas identificados: O
                                plano de reação esta sendo seguindo? Ou existe
                                um desvio previamente aprovado?
                            </td>
                            <td>
                                <Select
                                    name="item32"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                4.1 - O operador esta capacitado / treinado para
                                realizar a atividade? A matriz de versatilidade
                                do setor confirma essa informação?
                            </td>
                            <td>
                                <Select
                                    name="item41"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                5.1 - Os produtos não conforme estão
                                identificados, apontados e segregados?
                            </td>
                            <td>
                                <Select
                                    name="item51"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                5.2 - A quantidade de peças apontadas nas fichas
                                de refugo coincidem com as peças na caixa
                                vermelha de scrap?
                            </td>
                            <td>
                                <Select
                                    name="item52"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                5.3 - Toda as peças de retrabalho na caixa
                                amarela estão identificadas com a RNC?
                            </td>
                            <td>
                                <Select
                                    name="item53"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                6.1 - Existem alertas da qualidade postados no
                                setor? A validade esta OK?
                            </td>
                            <td>
                                <Select
                                    name="item61"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                7.1 - Todos os produtos em processo estão
                                identificados com a ficha de ordem de produção?
                                A ficha esta preenchida de acordo o processo
                                atual?
                            </td>
                            <td>
                                <Select
                                    name="item71"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                8.1 - O Modelo padrão de 5S esta disponível e
                                atualizado no setor?
                            </td>
                            <td>
                                <Select
                                    name="item81"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                8.2 - O setor encontra-se limpo, organizado?
                                Existem materiais sem utilização no setor?
                            </td>
                            <td>
                                <Select
                                    name="item82"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                9.1 - Os operadores estão utilizando os EPIs
                                padrão do setor?
                            </td>
                            <td>
                                <Select
                                    name="item91"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                9.2 - Os dispositivos de segurança estão sendo
                                validados conforme definido no Check list de
                                segurança?
                            </td>
                            <td>
                                <Select
                                    name="item92"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                9.3 - A coleta seletiva do setor esta sendo
                                respeitada? A lista de aspectos e impactos do
                                setor e lista de destinação de residuos estão
                                disponiveis?
                            </td>
                            <td>
                                <Select
                                    name="item93"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                9.4 - Se aplicavel, os kits de emergência do
                                setor estão disponiveis e em bom estado?
                            </td>
                            <td>
                                <Select
                                    name="item94"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                10.1 - O check list de TPM esta disponível no
                                setor?
                            </td>
                            <td>
                                <Select
                                    name="item101"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                10.2 - O operador esta verificando os itens do
                                check list? Problemas estão sendo abertos no
                                diário de bordo?
                            </td>
                            <td>
                                <Select
                                    name="item102"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                11.1 - As auditorias estão sendo realizadas
                                conforme frequência estabelecida?
                            </td>
                            <td>
                                <Select
                                    name="item111"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                12.1 - As checagem da primeira peça OK estão
                                sendo realizadas? Os problemas estão sendo
                                tratados de acordo previsto?
                            </td>
                            <td>
                                <Select
                                    name="item121"
                                    placeholder="Avalie"
                                    options={options}
                                />
                            </td>
                        </tr>
                    </tbody>
                </AuditoriaTable>
                <button type="submit">Send</button>
            </Form>
        </Container>
    );
}
