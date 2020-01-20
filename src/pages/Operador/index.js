/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    format,
    getISOWeek,
    startOfWeek,
    endOfWeek,
    addWeeks,
    subWeeks,
    eachDayOfInterval,
    isBefore,
    isSameDay,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Table } from 'react-bootstrap';
import Emoji from 'a11y-react-emoji';
import { useSelector } from 'react-redux';
import api from '~/services/api';
import { Container, TableDiv } from './styles';
import OperadorAuditoria from '../../components/Links/OperadorAuditoria';
import  Acoes from '../../components/Links/ações';

export default function Operador() {
    const [date, setDate] = useState(new Date());
    const [auditorias, setAuditoria] = useState([]);
    const [plano, setPlano] = useState([]);

    const setor = useSelector(state => state.user.profile.setor);

    const actualWeek = getISOWeek(date);

    const firstDay = startOfWeek(date);
    const lastDay = endOfWeek(date);
    const daysWeek = eachDayOfInterval(
        { start: firstDay, end: lastDay },
        { locale: pt }
    );

    const segunda = format(daysWeek[1], 'dd-MM-yyyy', { locale: pt });
    const segundaBD = format(daysWeek[1], 'yyyy-MM-dd', { locale: pt });
    const terça = format(daysWeek[2], 'dd-MM-yyyy', { locale: pt });
    const terçaBD = format(daysWeek[2], 'yyyy-MM-dd', { locale: pt });
    const quarta = format(daysWeek[3], 'dd-MM-yyyy', { locale: pt });
    const quartaBD = format(daysWeek[3], 'yyyy-MM-dd', { locale: pt });
    const quinta = format(daysWeek[4], 'dd-MM-yyyy', { locale: pt });
    const quintaBD = format(daysWeek[4], 'yyyy-MM-dd', { locale: pt });
    const sexta = format(daysWeek[5], 'dd-MM-yyyy', { locale: pt });
    const sextaBD = format(daysWeek[5], 'yyyy-MM-dd', { locale: pt });
    const sabado = format(daysWeek[6], 'dd-MM-yyyy', { locale: pt });
    const sabadoBD = format(daysWeek[6], 'yyyy-MM-dd', { locale: pt });

    useEffect(() => {
        async function loadAuditoria() {
            const response = await api.get('auditorias-semana', {
                params: { setor, actualWeek },
            });
            const data = response.data.map(a => {
                return {
                    OkSegunda: Object.is(a.data, segundaBD),
                    OkTerça: Object.is(a.data, terçaBD),
                    OkQuarta: Object.is(a.data, quartaBD),
                    OkQuinta: Object.is(a.data, quintaBD),
                    OkSexta: Object.is(a.data, sextaBD),
                    OkSabado: Object.is(a.data, sabadoBD),
                    Item2: false,
                    Item3: false,
                    Item4: false,
                    Item5: false,
                    Item6: false,
                    Item7: false,
                    Item8: false,
                    Item9: false,
                    Item10: false,
                    Item11: false,
                    Item12: false,
                    ...a,
                };
            });
            setAuditoria(data);
        }
        loadAuditoria();
    }, [actualWeek]);

    useEffect(() => {
        async function loadPlano() {
            const response = await api.get('plan');
            const data = response.data.map(planos => ({
                ...planos,
            }));

            setPlano(data);
        }
        loadPlano();
    }, [actualWeek]);

    function handleNextWeek() {
        setDate(addWeeks(date, 1));
    }
    function handlePrevWeek() {
        setDate(subWeeks(date, 1));
    }
    

    const todaySegunda = isSameDay(new Date(), daysWeek[1]);
    const lateSegunda = isBefore(new Date(), daysWeek[1]);
    const lateTerça = isBefore(new Date(), daysWeek[2]);
    const lateQuarta = isBefore(new Date(), daysWeek[3]);
    const lateQuinta = isBefore(new Date(), daysWeek[4]);
    const lateSexta = isBefore(new Date(), daysWeek[5]);
    const lateSabado = isBefore(new Date(), daysWeek[6]);
    const todayTerça = isSameDay(new Date(), daysWeek[2]);
    const todayQuarta = isSameDay(new Date(), daysWeek[3]);
    const todayQuinta = isSameDay(new Date(), daysWeek[4]);
    const todaySexta = isSameDay(new Date(), daysWeek[5]);
    const todaySabado = isSameDay(new Date(), daysWeek[6]);

    const auditoriasT1 = auditorias.filter(x => x.turno === '1');
    const auditoriasT1Segunda = auditoriasT1.filter(x => x.data === segundaBD);
    const auditoriasT1Terça = auditoriasT1.filter(x => x.data === terçaBD);
    const auditoriasT1Quarta = auditoriasT1.filter(x => x.data === quartaBD);
    const auditoriasT1Quinta = auditoriasT1.filter(x => x.data === quintaBD);
    const auditoriasT1Sexta = auditoriasT1.filter(x => x.data === sextaBD);
    const auditoriasT1Sabado = auditoriasT1.filter(x => x.data === sabadoBD);

    const auditoriasT2 = auditorias.filter(y => y.turno === '2');
    const auditoriasT2Segunda = auditoriasT2.filter(x => x.data === segundaBD);
    const auditoriasT2Terça = auditoriasT2.filter(x => x.data === terçaBD);
    const auditoriasT2Quarta = auditoriasT2.filter(x => x.data === quartaBD);
    const auditoriasT2Quinta = auditoriasT2.filter(x => x.data === quintaBD);
    const auditoriasT2Sexta = auditoriasT2.filter(x => x.data === sextaBD);
    const auditoriasT2Sabado = auditoriasT2.filter(x => x.data === sabadoBD);

    const auditoriasT3 = auditorias.filter(z => z.turno === '3');
    const auditoriasT3Segunda = auditoriasT3.filter(x => x.data === segundaBD);
    const auditoriasT3Terça = auditoriasT3.filter(x => x.data === terçaBD);
    const auditoriasT3Quarta = auditoriasT3.filter(x => x.data === quartaBD);
    const auditoriasT3Quinta = auditoriasT3.filter(x => x.data === quintaBD);
    const auditoriasT3Sexta = auditoriasT3.filter(x => x.data === sextaBD);
    const auditoriasT3Sabado = auditoriasT3.filter(x => x.data === sabadoBD);

    const planoT1 = plano.filter(a => a.auditoria.turno === '1');
    const planoT1Area1 = planoT1.filter(a => a.area === 1).slice(0,1);
    const planoT1Area2 = planoT1.filter(a => a.area === 2).slice(0,1);
    const planoT1Area3 = planoT1.filter(a => a.area === 3).slice(0,1);
    const planoT1Area4 = planoT1.filter(a => a.area === 4).slice(0,1);
    const planoT1Area5 = planoT1.filter(a => a.area === 5).slice(0,1);
    const planoT1Area6 = planoT1.filter(a => a.area === 6).slice(0,1);
    const planoT1Area7 = planoT1.filter(a => a.area === 7).slice(0,1);
    const planoT1Area8 = planoT1.filter(a => a.area === 8).slice(0,1);
    const planoT1Area9 = planoT1.filter(a => a.area === 9).slice(0,1);
    const planoT1Area10 = planoT1.filter(a => a.area === 10).slice(0,1);
    const planoT1Area11= planoT1.filter(a => a.area === 11).slice(0,1);
    const planoT1Area12 = planoT1.filter(a => a.area === 12).slice(0,1);

    const planoT2 = plano.filter(b => b.auditoria.turno === '2');
    const planoT2Area1 = planoT1.filter(a => a.area === 1).slice(0,1);
    const planoT2Area2 = planoT1.filter(a => a.area === 2).slice(0,1);
    const planoT2Area3 = planoT1.filter(a => a.area === 3).slice(0,1);
    const planoT2Area4 = planoT1.filter(a => a.area === 4).slice(0,1);
    const planoT2Area5 = planoT1.filter(a => a.area === 5).slice(0,1);
    const planoT2Area6 = planoT1.filter(a => a.area === 6).slice(0,1);
    const planoT2Area7 = planoT1.filter(a => a.area === 7).slice(0,1);
    const planoT2Area8 = planoT1.filter(a => a.area === 8).slice(0,1);
    const planoT2Area9 = planoT1.filter(a => a.area === 9).slice(0,1);
    const planoT2Area10 = planoT1.filter(a => a.area === 10).slice(0,1);
    const planoT2Area11= planoT1.filter(a => a.area === 11).slice(0,1);
    const planoT2Area12 = planoT1.filter(a => a.area === 12).slice(0,1);

    const planoT3 = plano.filter(c => c.auditoria.turno === '3');
    const planoT3Area1 = planoT1.filter(a => a.area === 1).slice(0,1);
    const planoT3Area2 = planoT1.filter(a => a.area === 2).slice(0,1);
    const planoT3Area3 = planoT1.filter(a => a.area === 3).slice(0,1);
    const planoT3Area4 = planoT1.filter(a => a.area === 4).slice(0,1);
    const planoT3Area5 = planoT1.filter(a => a.area === 5).slice(0,1);
    const planoT3Area6 = planoT1.filter(a => a.area === 6).slice(0,1);
    const planoT3Area7 = planoT1.filter(a => a.area === 7).slice(0,1);
    const planoT3Area8 = planoT1.filter(a => a.area === 8).slice(0,1);
    const planoT3Area9 = planoT1.filter(a => a.area === 9).slice(0,1);
    const planoT3Area10 = planoT1.filter(a => a.area === 10).slice(0,1);
    const planoT3Area11 = planoT1.filter(a => a.area === 11).slice(0,1);
    const planoT3Area12 = planoT1.filter(a => a.area === 12).slice(0,1);

    return (
        <Container>
            <header>
                <div className="legenda">
                    <p>OK = ✔️</p>
                    <p>PLANEJADO = ✏️ </p>
                    <p>ATRASADO = ➖ </p>
                    <p>PROBLEMA = ❌ </p>
                </div>

                <div>
                    <button type="button" onClick={handlePrevWeek}>
                        <MdChevronLeft size={55} color="#000" />
                    </button>
                    <strong>SEMANA: {actualWeek}</strong>
                    <button type="button" onClick={handleNextWeek}>
                        <MdChevronRight size={55} color="#000" />
                    </button>
                </div>
                <div>
                    <strong>SETOR : {setor}</strong>
                </div>
                <span />
                <span />
            </header>

            <TableDiv>
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th colSpan="3">Segunda: {segunda}</th>
                            <th colSpan="3">Terça: {terça}</th>
                            <th colSpan="3">Quarta: {quarta}</th>
                            <th colSpan="3">Quinta: {quinta}</th>
                            <th colSpan="3">Sexta: {sexta}</th>
                            <th colSpan="3">Sábado: {sabado}</th>
                            <th colSpan="3">Domingo</th>
                            <th>Analista Qualidade</th>
                            <th>Engenharia Processo</th>
                            <th>Supervisão Produção</th>
                            <th>Coordenação Produção</th>
                            <th>Gerente Qualidade</th>
                            <th>Plant Manager</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td />
                            <td>T 1</td>
                            <td>T 2</td>
                            <td>T 3</td>
                            <td>T 1</td>
                            <td>T 2</td>
                            <td>T 3</td>
                            <td>T 1</td>
                            <td>T 2</td>
                            <td>T 3</td>
                            <td>T 1</td>
                            <td>T 2</td>
                            <td>T 3</td>
                            <td>T 1</td>
                            <td>T 2</td>
                            <td>T 3</td>
                            <td>T 1</td>
                            <td>T 2</td>
                            <td>T 3</td>
                            <td>T 1</td>
                            <td>T 2</td>
                            <td>T 3</td>
                            <td>Semanal</td>
                            <td>Semanal</td>
                            <td>Semanal</td>
                            <td>Mensal</td>
                            <td>Bimestral</td>
                            <td>Quadrimestral</td>
                        </tr>
                        <tr>
                            <td>Documentação e registros operacionais</td>
                            <td>
                                    {todaySegunda ? (
                                    <OperadorAuditoria dia={segunda} tipo="false"  />
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area1.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 1 &&           
                                                        p.conclusao === null ? (
                                                            <Acoes dia={segunda} />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                       <OperadorAuditoria dia={segunda} tipo="true" />
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                            </td>

                            <td>
                                <button type="button">
                                    {todaySegunda ? (
                                        <h2>
                                         <OperadorAuditoria dia={segunda} tipo="false" />
                                   </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area1.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 1 && p.conclusao === null ? (
                                                            <Acoes dia={segunda} />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                          <OperadorAuditoria dia={segunda} tipo="true" />
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                               
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area1.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 1 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area1.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area1.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area1.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area1.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
                                    <h2>
                                    <OperadorAuditoria dia={terça} tipo="false" />
                                    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area1.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area1.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area1.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area1.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area1.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area1.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area1.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area1.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
                                    <h2>
                                    <OperadorAuditoria dia={quinta} tipo="false" />
                                    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area1.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area1.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area1.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area1.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area1.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area1.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area1.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area1.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area1.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area1.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                    
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area1.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area1.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area1.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area1.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area1.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area1.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 1 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Meios de Controle</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area2.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 2 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area2.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 2 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
                                    <h2>
                                    <OperadorAuditoria dia={segunda} tipo="false" />
                                    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area2.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 2 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area2.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area2.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area2.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area2.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area2.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area2.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area2.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area2.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area2.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area2.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area2.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area2.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area2.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area2.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area2.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area2.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area2.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area2.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area2.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area2.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area2.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area2.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                    
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area2.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area2.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                    
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area2.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area2.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area2.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area2.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 2 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Documentação e registros operacionais</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area3.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 3 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area3.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 3 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area3.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 3 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area3.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area3.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area3.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area3.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area3.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area3.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area3.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area3.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area3.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area3.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area3.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area3.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area3.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area3.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area3.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area3.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area3.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area3.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area3.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area3.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area3.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                 
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area3.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area3.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area3.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area3.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area3.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area3.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area3.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 3 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Documentação e registros operacionais</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area4.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 4 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area4.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 4 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area4.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 4 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area4.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area4.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area4.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area4.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area4.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area4.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area4.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area4.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area4.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area4.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area4.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area4.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area4.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area4.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area4.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area4.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area4.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area4.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area4.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area4.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area4.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area4.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area4.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area4.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area4.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area4.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area4.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area4.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 4 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Documentação e registros operacionais</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area5.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 5 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area5.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 5 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area5.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 5 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area5.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area5.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area5.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area5.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area5.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area5.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area5.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area5.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area5.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area5.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area5.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area5.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area5.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area5.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area5.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area5.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area5.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area5.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area5.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area5.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area5.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area5.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area5.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area5.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area5.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area5.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area5.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area5.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 5 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Documentação e registros operacionais</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area6.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 6 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area6.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 6 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area6.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 6 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area6.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area6.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area6.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area6.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area6.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area6.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area6.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area6.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area6.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area6.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area6.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area6.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area6.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area6.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area6.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area6.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area6.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area6.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area6.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area6.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area6.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area6.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area6.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area6.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area6.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area6.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area6.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area6.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 6 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Documentação e registros operacionais</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area7.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 7 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area7.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 7 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area7.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 7 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area7.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area7.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area7.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area7.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area7.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area7.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area7.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area7.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area7.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area7.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area7.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area7.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area7.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area7.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area7.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area7.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area7.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area7.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area7.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area7.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area7.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area7.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area7.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area7.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area7.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area7.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area7.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area7.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 7 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Documentação e registros operacionais</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area8.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 8 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area8.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 8 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area8.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 8 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area8.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area8.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area8.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area8.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area8.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area8.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area8.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area8.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area8.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area8.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area8.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area8.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area8.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area8.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area8.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area8.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area8.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area8.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area8.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area8.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area8.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area8.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area8.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area8.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area8.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area8.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area8.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area8.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 8 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Documentação e registros operacionais</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area9.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 9 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area9.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 9 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area9.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 9 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area9.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area9.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area9.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area9.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area9.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area9.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area9.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area9.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area9.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area9.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area9.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area9.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area9.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area9.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area9.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area9.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area9.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area9.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area9.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area9.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area9.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area9.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area9.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                 
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area9.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area9.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area9.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area9.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area9.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 9 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Documentação e registros operacionais</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area10.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 10 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area10.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 10 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area10.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 10 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area10.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area10.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area10.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area10.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area10.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area10.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area10.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area10.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area10.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area10.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area10.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area10.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area10.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area10.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area10.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area10.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area10.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area10.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area10.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area10.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area10.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area10.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area10.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area10.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area10.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area10.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area10.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area10.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 10 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                        <tr>
                            <td>Documentação e registros operacionais</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area11.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 11 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area11.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 11 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area11.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 11 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area11.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area11.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area11.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area11.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area11.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area11.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area11.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area11.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area11.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area11.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area11.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area11.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area11.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area11.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area11.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area11.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area11.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area11.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area11.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area11.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area11.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area11.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area11.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area11.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area11.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area11.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                 
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area11.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area11.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 11 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr><tr>
                            <td>Documentação e registros operacionais</td>

                            <td>
                                <button type="button">
                                   {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT1Segunda.length > 0 ? (
                                        auditoriasT1Segunda.map(a1 =>
                                            planoT1Area12.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 12 &&           
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                            {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT2Segunda.length > 0 ? (
                                        auditoriasT2Segunda.map(a1 =>
                                            planoT2Area12.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 12 && p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todaySegunda ? (
    <h2>
      <OperadorAuditoria dia={segunda} tipo="false" />
    </h2>
                                    ) : auditoriasT3Segunda.length > 0 ? (
                                        auditoriasT3Segunda.map(a1 =>
                                            planoT3Area12.length < 1 &&
                                            a1.OkSegunda ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSegunda &&
                                                        p.area === 12 &&
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSegunda && !todaySegunda ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                              {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT1Terça.length > 0 ? (
                                        auditoriasT1Terça.map(a1 =>
                                            planoT1Area12.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area12.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT2Terça.length > 0 ? (
                                        auditoriasT2Terça.map(a1 =>
                                            planoT2Area12.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area12.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ?  (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayTerça ? (
    <h2>
      <OperadorAuditoria dia={terça} tipo="false" />
    </h2>
                                    ) : auditoriasT3Terça.length > 0 ? (
                                        auditoriasT3Terça.map(a1 =>
                                            planoT3Area12.length < 1 &&
                                            a1.OkTerça ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area12.map(p => (
                                                    <h2>
                                                        {a1.OkTerça &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateTerça && !todayTerça ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quarta.length > 0 ? (
                                        auditoriasT1Quarta.map(a1 =>
                                            planoT1Area12.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area12.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quarta.length > 0 ? (
                                        auditoriasT2Quarta.map(a1 =>
                                            planoT2Area12.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area12.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todayQuarta ? (
    <h2>
      <OperadorAuditoria dia={quarta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quarta.length > 0 ? (
                                        auditoriasT3Quarta.map(a1 =>
                                            planoT3Area12.length < 1 &&
                                            a1.OkQuarta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area12.map(p => (
                                                    <h2>
                                                        {a1.OkQuarta &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuarta && !todayQuarta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Quinta.length > 0 ? (
                                        auditoriasT1Quinta.map(a1 =>
                                            planoT1Area12.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area12.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Quinta.length > 0 ? (
                                        auditoriasT2Quinta.map(a1 =>
                                            planoT2Area12.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area12.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                    {todayQuinta ? (
    <h2>
      <OperadorAuditoria dia={quinta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Quinta.length > 0 ? (
                                        auditoriasT3Quinta.map(a1 =>
                                            planoT3Area12.length < 1 &&
                                            a1.OkQuinta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area12.map(p => (
                                                    <h2>
                                                        {a1.OkQuinta &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateQuinta && !todayQuinta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT1Sexta.length > 0 ? (
                                        auditoriasT1Sexta.map(a1 =>
                                            planoT1Area12.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                  {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT2Sexta.length > 0 ? (
                                        auditoriasT2Sexta.map(a1 =>
                                            planoT2Area12.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySexta ? (
    <h2>
      <OperadorAuditoria dia={sexta} tipo="false" />
    </h2>
                                    ) : auditoriasT3Sexta.length > 0 ? (
                                        auditoriasT3Sexta.map(a1 =>
                                            planoT3Area12.length < 1 &&
                                            a1.OkSexta ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSexta &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSexta && !todaySexta ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area12.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area12.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                  
                                    ) : auditoriasT3Sabado.length > 0 ? (
                                        auditoriasT3Sabado.map(a1 =>
                                            planoT3Area12.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT3Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT1Sabado.length > 0 ? (
                                        auditoriasT1Sabado.map(a1 =>
                                            planoT1Area12.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT1Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>

                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                         
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area12.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                            <td>
                                <button type="button">
                                   {todaySabado ? (
    <h2>
      <OperadorAuditoria dia={sabado} tipo="false" />
    </h2>
                                   
                                    ) : auditoriasT2Sabado.length > 0 ? (
                                        auditoriasT2Sabado.map(a1 =>
                                            planoT2Area12.length < 1 &&
                                            a1.OkSabado ? (
                                                <h2>
                                                    {' '}
                                                    <Emoji symbol="✔️" />{' '}
                                                </h2>
                                            ) : (
                                                planoT2Area12.map(p => (
                                                    <h2>
                                                        {a1.OkSabado &&
                                                        p.area === 12 && 
                                                        p.conclusao === null ? (
                                                            <Emoji symbol="🙁" />
                                                        ) : (
                                                            <Emoji symbol="✔️" />
                                                        )}
                                                    </h2>
                                                ))
                                            )
                                        )
                                    ) : !lateSabado && !todaySabado ? (
                                        <h2>
                                            {' '}
                                            <Emoji symbol="➖ " />{' '}
                                        </h2>
                                    ) : (
                                        <Emoji symbol="" />
                                    )}
                                </button>
                            </td>
                             <td>
                                    <button type="button">
                                        <h2>Analista Qualidade</h2>
                                    </button>
                             </td>
                            <td>
                                    <button type="button">
                                        <h2>Engenharia</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Supervisao P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Cordenação P.</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Gerente Qualidade</h2>
                                    </button>
                            </td>
                            <td>
                                    <button type="button">
                                        <h2>Plant Manager</h2>
                                    </button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </TableDiv>
        </Container>
    );
}
