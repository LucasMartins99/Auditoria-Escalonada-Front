/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

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
import { FormControl, FormHelperText, Select } from '@material-ui/core';
import api from '~/services/api';
import { Container, TableDiv } from './styles';
import OperadorAuditoria from '../../components/Links/OperadorAuditoria';
import SuperiorAuditoria from '../../components/Links/SuperiorAuditoria';

export default function Operador() {
    const [date, setDate] = useState(new Date());
    const [auditorias, setAuditoria] = useState([]);
    const [auditoriasGestao, setAuditoriaGestao] = useState([]);
    const [plano, setPlano] = useState([]);
    const [setor, setSetor] = useState([]);
    const [arrSetor, setArrSetor] = useState([]);
    const [auxSetor, setAuxSetor] = useState(false);

    const s = useSelector(state => {
        return state.user.profile.area;
    });
    const cargo = useSelector(state => state.user.profile.cargo);
    

    useEffect(() => {
        async function loadSetores() {
            const response = await api.get('/all-setores');
            const data = response.data.map(st => ({
               ...st,
           }));
           setArrSetor(data);
       }
       loadSetores();
    }, [])
    
    useEffect(() => {
        if (cargo !== 'Operador') {
            setAuxSetor(true);
            setSetor('Linha de Fornos')
        } else {
               setAuxSetor(false);
               setSetor(s);
           }
    }, [])
    
   
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
    }, [actualWeek, setor]);

    useEffect(() => {
        async function loadAuditoriaGestao() {
            const response = await api.get('auditoria-gestao', {
                params: { setor },
            });
            const data = response.data.map(a => ({
                ...a,
            }));
            setAuditoriaGestao(data);
        }
        loadAuditoriaGestao();
    }, [setor]);

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

    const PlantManeger = auditoriasGestao.filter(a => a.cargo === 'Plant Manager');
    const AnalistaQualidade = auditoriasGestao.filter(a => a.cargo === 'Analista Qualidade');
    const EngenhariaProcesso = auditoriasGestao.filter(a => a.cargo === 'Engenharia Processo');
    const SupervisaoProducao = auditoriasGestao.filter(a => a.cargo === 'Supervisão Produção');
    const CoordenacaoProducao = auditoriasGestao.filter(a => a.cargo === 'Coordenação Produção');
    const GerenteQualidade = auditoriasGestao.filter(a => a.cargo === 'Gerente Qualidade');
    
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
    const planoT1Area1 = planoT1.filter(a => a.subitem === 1).slice(0,1);
    const planoT1Area2 = planoT1.filter(a => a.subitem === 2).slice(0,1);
    const planoT1Area3 = planoT1.filter(a => a.subitem === 3).slice(0,1);
    const planoT1Area4 = planoT1.filter(a => a.subitem === 4).slice(0,1);
    const planoT1Area5 = planoT1.filter(a => a.subitem === 5).slice(0,1);
    const planoT1Area6 = planoT1.filter(a => a.subitem === 6).slice(0,1);
    const planoT1Area7 = planoT1.filter(a => a.subitem === 7).slice(0,1);
    const planoT1Area8 = planoT1.filter(a => a.subitem === 8).slice(0,1);
    const planoT1Area9 = planoT1.filter(a => a.subitem === 9).slice(0,1);
    const planoT1Area10 = planoT1.filter(a => a.subitem === 10).slice(0,1);
    const planoT1Area11 = planoT1.filter(a => a.subitem === 11).slice(0, 1);
    const planoT1Area12 = planoT1.filter(a => a.subitem === 12).slice(0,1);

    const planoT2 = plano.filter(b => b.auditoria.turno === '2');
    const planoT2Area1 = planoT2.filter(a => a.subitem === 1).slice(0,1);
    const planoT2Area2 = planoT2.filter(a => a.subitem === 2).slice(0,1);
    const planoT2Area3 = planoT2.filter(a => a.subitem === 3).slice(0,1);
    const planoT2Area4 = planoT2.filter(a => a.subitem === 4).slice(0,1);
    const planoT2Area5 = planoT2.filter(a => a.subitem === 5).slice(0,1);
    const planoT2Area6 = planoT2.filter(a => a.subitem === 6).slice(0,1);
    const planoT2Area7 = planoT2.filter(a => a.subitem === 7).slice(0,1);
    const planoT2Area8 = planoT2.filter(a => a.subitem === 8).slice(0,1);
    const planoT2Area9 = planoT2.filter(a => a.subitem === 9).slice(0,1);
    const planoT2Area10 = planoT2.filter(a => a.subitem === 10).slice(0,1);
    const planoT2Area11 = planoT2.filter(a => a.subitem === 11).slice(0,1);
    const planoT2Area12 = planoT2.filter(a => a.subitem === 12).slice(0,1);

    const planoT3 = plano.filter(c => c.auditoria.turno === '3');
    const planoT3Area1 = planoT3.filter(a => a.subitem === 1).slice(0,1);
    const planoT3Area2 = planoT3.filter(a => a.subitem === 2).slice(0,1);
    const planoT3Area3 = planoT3.filter(a => a.subitem === 3).slice(0,1);
    const planoT3Area4 = planoT3.filter(a => a.subitem === 4).slice(0,1);
    const planoT3Area5 = planoT3.filter(a => a.subitem === 5).slice(0,1);
    const planoT3Area6 = planoT3.filter(a => a.subitem === 6).slice(0,1);
    const planoT3Area7 = planoT3.filter(a => a.subitem === 7).slice(0,1);
    const planoT3Area8 = planoT3.filter(a => a.subitem === 8).slice(0,1);
    const planoT3Area9 = planoT3.filter(a => a.subitem === 9).slice(0,1);
    const planoT3Area10 = planoT3.filter(a => a.subitem === 10).slice(0,1);
    const planoT3Area11 = planoT3.filter(a => a.subitem === 11).slice(0,1);
    const planoT3Area12 = planoT3.filter(a => a.subitem === 12).slice(0,1);
    const handleSetor = event => {
        setSetor(event.target.value);
    }
    return (
        <Container>
            <header>
                <div className="legenda">
                    <p>
                        OK =
                        <h7>
                            <Emoji symbol="✔️" />
                        </h7>
                    </p>
                    <p>
                        PLANEJADO =
                        <h7>
                            {' '}
                            <Emoji symbol="✏️" />
                        </h7>
                    </p>
                    <p>
                        ATRASADO = 
                        <h7>
                            <Emoji symbol="➖" />
                            </h7>
                            </p>
                        
                    <p>
                        PROBLEMA =
                        <h7>
                            <Emoji symbol="❌" />
                            </h7>
                          </p>
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
                    {!auxSetor ?
                    <strong>SETOR : {setor}</strong>
                    :
                        <FormControl variant="outlined">
                            <strong>SETOR:</strong>
                            <Select native value={setor} onChange={handleSetor}>
                            {arrSetor.map(s => (
                                <option key={s.name} value={s.name}>
                                    {s.name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                }
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
                            <td>Semanal</td>
                            <td>Semanal</td>
                            <td>Semanal</td>
                            <td>Mensal</td>
                            <td>Bimestral</td>
                            <td>Quadrimestral</td>
                        </tr>
                        <tr>
                            <td className="a">
                                Documentação e registros operacionais
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segundaBD}
                        today={todaySegunda} 
                        auditoria={auditoriasT1Segunda} 
                        plano={planoT1Area1}  
                        subItem = "1"
                        semana = {actualWeek}
                        turno='1'
                         />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                           late={lateSegunda}
                           dia={segundaBD}
                           today={todaySegunda} 
                           auditoria={auditoriasT2Segunda} 
                           plano={planoT2Area1}  
                           subItem = "1"
                           semana = {actualWeek}
                           turno='2'
                            />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segundaBD}
                        today={todaySegunda} 
                        auditoria={auditoriasT3Segunda} 
                        plano={planoT3Area1}  
                        subItem="1"
                        semana={actualWeek}
                        turno='3'
                         />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terçaBD}
                        today={todayTerça} 
                        auditoria={auditoriasT1Terça} 
                        plano={planoT1Area1}  
                        subItem = "1" 
                        semana = {actualWeek}
                        turno = '1'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terçaBD}
                        today={todayTerça} 
                        auditoria={auditoriasT2Terça} 
                        plano={planoT2Area1}  
                        subItem = "1"
                        semana = {actualWeek}
                        turno = '2'
                         />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terçaBD}
                        today={todayTerça} 
                        auditoria={auditoriasT3Terça} 
                        plano={planoT3Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='3'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuarta}
                        dia={quartaBD}
                        today={todayQuarta} 
                        auditoria={auditoriasT1Quarta} 
                        plano={planoT1Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='1'
                        />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quartaBD}
                        today={todayQuarta} 
                        auditoria={auditoriasT2Quarta} 
                        plano={planoT2Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='2'
                        />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quartaBD}
                        today={todayQuarta} 
                        auditoria={auditoriasT3Quarta} 
                        plano={planoT3Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='3'
                        />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuinta}
                        dia={quintaBD}
                        today={todayQuinta} 
                        auditoria={auditoriasT1Quinta} 
                        plano={planoT1Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='1'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                                    late={lateQuinta}
                                    dia={quintaBD}
                                    today={todayQuinta}
                                    auditoria={auditoriasT2Quinta} 
                                    plano={planoT2Area1}
                                    subItem="1"
                                    semana={actualWeek}
                                    turno='2'
                                />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quintaBD}
                        today={todayQuinta} 
                        auditoria={auditoriasT3Quinta} 
                        plano={planoT3Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='3'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sextaBD}
                        today={todaySexta} 
                        auditoria={auditoriasT1Sexta} 
                        plano={planoT1Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='1'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sextaBD}
                        today={todaySexta} 
                        auditoria={auditoriasT2Sexta} 
                        plano={planoT2Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='2'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sextaBD}
                        today={todaySexta} 
                        auditoria={auditoriasT3Sexta} 
                        plano={planoT3Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='3'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabadoBD}
                        today={todaySabado} 
                        auditoria={auditoriasT1Sabado} 
                        plano={planoT1Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='1'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabadoBD}
                        today={todaySabado} 
                        auditoria={auditoriasT2Sabado} 
                        plano={planoT2Area1}  
                        subItem = "1" 
                        semana={actualWeek}
                        turno='2'
                        />
                            </td>
                           
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                                dia={sabadoBD}
                                    today={todaySabado} 
                                    auditoria={auditoriasT3Sabado} 
                                    plano={planoT3Area1}
                                    subItem="1"
                                    semana={actualWeek}
                                    turno='3'
                                />
                            </td>
                             <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="1"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="1"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="1"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="1"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="1"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="1"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="a">Meios de Controle</td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segundaBD}
                        today={todaySegunda} 
                        auditoria={auditoriasT1Segunda} 
                        plano={planoT1Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='1'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segundaBD}
                        today={todaySegunda} 
                        auditoria={auditoriasT2Segunda} 
                        plano={planoT2Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='2'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segundaBD}
                        today={todaySegunda} 
                        auditoria={auditoriasT3Segunda} 
                        plano={planoT3Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='3'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terçaBD}
                        today={todayTerça} 
                        auditoria={auditoriasT1Terça} 
                        plano={planoT1Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='1'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terçaBD}
                        today={todayTerça} 
                        auditoria={auditoriasT2Terça} 
                        plano={planoT2Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='2'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terçaBD}
                        today={todayTerça} 
                        auditoria={auditoriasT3Terça} 
                        plano={planoT3Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='3'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuarta}
                        dia={quartaBD}
                        today={todayQuarta} 
                        auditoria={auditoriasT1Quarta} 
                        plano={planoT1Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='1'
                        />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quartaBD}
                        today={todayQuarta} 
                        auditoria={auditoriasT2Quarta} 
                        plano={planoT2Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='2'
                        />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quartaBD}
                        today={todayQuarta} 
                        auditoria={auditoriasT3Quarta} 
                        plano={planoT3Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='3'
                        />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuinta}
                        dia={quintaBD}
                        today={todayQuinta} 
                        auditoria={auditoriasT1Quinta} 
                        plano={planoT1Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='1'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quintaBD}
                        today={todayQuinta} 
                        auditoria={auditoriasT2Quinta} 
                        plano={planoT2Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='2'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quintaBD}
                        today={todayQuinta} 
                        auditoria={auditoriasT3Quinta} 
                        plano={planoT3Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='3'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sextaBD}
                        today={todaySexta} 
                        auditoria={auditoriasT1Sexta} 
                        plano={planoT1Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='1'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sextaBD}
                        today={todaySexta} 
                        auditoria={auditoriasT2Sexta} 
                        plano={planoT2Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='2'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sextaBD}
                        today={todaySexta} 
                        auditoria={auditoriasT3Sexta} 
                        plano={planoT3Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='3'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabadoBD}
                        today={todaySabado} 
                        auditoria={auditoriasT1Sabado} 
                        plano={planoT1Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='1'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabadoBD}
                        today={todaySabado} 
                        auditoria={auditoriasT2Sabado} 
                        plano={planoT2Area2}  
                        subItem = "2" 
                        semana={actualWeek}
                        turno='2'
                        />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                                    late={lateSabado}
                                    dia={sabadoBD}
                                    today={todaySabado} 
                                    auditoria={auditoriasT3Sabado} 
                                    plano={planoT3Area2}
                                    subItem="2"
                                    semana={actualWeek}
                                    turno='3'
                                />
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="2"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="2"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="2"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="2"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="2"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="2"
                                />
                            </td>                       
                             </tr>
                        <tr>
                            <td className="a">POKA YOKE</td>

                            <td  className="a">
                       <h3>N/A</h3>
                            </td>
                            <td className="a">
                            <h3>N/A</h3>
                            </td>
                            <td className="a">
                            <h3>N/A</h3>
                            </td>
                            <td className="a">
                      <h3>N/A</h3>
                            </td>
                            <td className="a">
                       <h3>N/A</h3>
                            </td>
      
                            <td className="a">
                            <h3>N/A</h3>
                            </td>
                            <td className="a">
                            <h3>N/A</h3>
                            </td>
                            <td className="a">
                            <h3>N/A</h3>
                            </td>
                            <td className="a">
                            <h3>N/A</h3>
                            </td>
                            <td className="a">
                            <h3>N/A</h3> </td>
                            <td className="a">
                            <h3>N/A</h3>
                            </td>
                            <td className="a">
                            <h3>N/A</h3>
                            </td>
                            <td className="a">
                            <h3>N/A</h3>
                            </td>
                            <td className="a">
                            <h3>N/A</h3>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>      
                            </td>
                           
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="3"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="3"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="3"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="3"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="3"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="3"
                                />
                            </td>                        
                           </tr>
                        <tr>
                            <td className="a">Treinamento</td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="4"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="4"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="4"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="4"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="4"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="4"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td  className="a">Gestão de não conformes</td>

                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td className="a">
                            <h2>N/A</h2>
                            </td> 
                            <td className="a">
                            <h2>N/A</h2>
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="5"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="5"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="5"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="5"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="5"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="5"
                                />
                            </td>                        
                            </tr>
                        <tr>
                            <td className="a">Alertas da qualidade</td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT1Segunda} 
                        plano={planoT1Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT2Segunda} 
                        plano={planoT2Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT3Segunda} 
                        plano={planoT3Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT1Terça} 
                        plano={planoT1Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT2Terça} 
                        plano={planoT2Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT3Terça} 
                        plano={planoT3Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT1Quarta} 
                        plano={planoT1Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT2Quarta} 
                        plano={planoT2Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT3Quarta} 
                        plano={planoT3Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT1Quinta} 
                        plano={planoT1Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT2Quinta} 
                        plano={planoT2Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT3Quinta} 
                        plano={planoT3Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT1Sexta} 
                        plano={planoT1Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT2Sexta} 
                        plano={planoT2Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT3Sexta} 
                        plano={planoT3Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT1Sabado} 
                        plano={planoT1Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT2Sabado} 
                        plano={planoT2Area6}  
                        subItem = "6" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                                    late={lateSabado}
                                    dia={sabado}
                                    today={todaySabado} 
                                    auditoria={auditoriasT3Sabado} 
                                    plano={planoT3Area6}
                                    subItem="6"
                                />
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="6"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="6"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="6"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="6"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="6"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="6"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="a">Identificação e rastreabilidade</td>

                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT1Segunda} 
                        plano={planoT1Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT2Segunda} 
                        plano={planoT2Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT3Segunda} 
                        plano={planoT3Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT1Terça} 
                        plano={planoT1Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT2Terça} 
                        plano={planoT2Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT3Terça} 
                        plano={planoT3Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT1Quarta} 
                        plano={planoT1Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT2Quarta} 
                        plano={planoT2Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT3Quarta} 
                        plano={planoT3Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT1Quinta} 
                        plano={planoT1Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT2Quinta} 
                        plano={planoT2Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT3Quinta} 
                        plano={planoT3Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT1Sexta} 
                        plano={planoT1Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT2Sexta} 
                        plano={planoT2Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT3Sexta} 
                        plano={planoT3Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT1Sabado} 
                        plano={planoT1Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT2Sabado} 
                        plano={planoT2Area7}  
                        subItem = "7" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                                    late={lateSabado}
                                    dia={sabado}
                                    today={todaySabado} 
                                    auditoria={auditoriasT3Sabado} 
                                    plano={planoT3Area7}
                                    subItem="7"
                                />
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="7"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="7"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="7"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="7"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="7"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="7"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="a">5S</td>

                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT1Segunda} 
                        plano={planoT1Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT2Segunda} 
                        plano={planoT2Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT3Segunda} 
                        plano={planoT3Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT1Terça} 
                        plano={planoT1Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT2Terça} 
                        plano={planoT2Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT3Terça} 
                        plano={planoT3Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT1Quarta} 
                        plano={planoT1Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT2Quarta} 
                        plano={planoT2Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT3Quarta} 
                        plano={planoT3Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT1Quinta} 
                        plano={planoT1Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT2Quinta} 
                        plano={planoT2Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT3Quinta} 
                        plano={planoT3Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT1Sexta} 
                        plano={planoT1Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT2Sexta} 
                        plano={planoT2Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT3Sexta} 
                        plano={planoT3Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT1Sabado} 
                        plano={planoT1Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT2Sabado} 
                        plano={planoT2Area8}  
                        subItem = "8" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                                    late={lateSabado}
                                    dia={sabado}
                                    today={todaySabado} 
                                    auditoria={auditoriasT3Sabado} 
                                    plano={planoT3Area8}
                                    subItem="8"
                                />
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="8"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="8"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="8"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="8"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="8"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="8"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="a">Segurança / Meio ambiente</td>

                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT1Segunda} 
                        plano={planoT1Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT2Segunda} 
                        plano={planoT2Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT3Segunda} 
                        plano={planoT3Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT1Terça} 
                        plano={planoT1Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT2Terça} 
                        plano={planoT2Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT3Terça} 
                        plano={planoT3Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT1Quarta} 
                        plano={planoT1Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT2Quarta} 
                        plano={planoT2Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT3Quarta} 
                        plano={planoT3Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT1Quinta} 
                        plano={planoT1Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT2Quinta} 
                        plano={planoT2Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT3Quinta} 
                        plano={planoT3Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT1Sexta} 
                        plano={planoT1Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT2Sexta} 
                        plano={planoT2Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT3Sexta} 
                        plano={planoT3Area9}  
                        subItem = "9" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT1Sabado} 
                        plano={planoT1Area9}  
                        subItem = "9" />
                            </td>
                           
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT2Sabado} 
                        plano={planoT2Area9}  
                        subItem = "9" />
                            </td>
                           
                            <td className="a">
                        <OperadorAuditoria
                                    late={lateSabado}
                                    dia={sabado}
                                    today={todaySabado} 
                                    auditoria={auditoriasT3Sabado} 
                                    plano={planoT3Area9}
                                    subItem="9"
                                />
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="9"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="9"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="9"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="9"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="9"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="9"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="a">TPM</td>

                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT1Segunda} 
                        plano={planoT1Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT2Segunda} 
                        plano={planoT2Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT3Segunda} 
                        plano={planoT3Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT1Terça} 
                        plano={planoT1Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT2Terça} 
                        plano={planoT2Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT3Terça} 
                        plano={planoT3Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT1Quarta} 
                        plano={planoT1Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT2Quarta} 
                        plano={planoT2Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT3Quarta} 
                        plano={planoT3Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT1Quinta} 
                        plano={planoT1Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT2Quinta} 
                        plano={planoT2Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT3Quinta} 
                        plano={planoT3Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT1Sexta} 
                        plano={planoT1Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT2Sexta} 
                        plano={planoT2Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT3Sexta} 
                        plano={planoT3Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT1Sabado} 
                        plano={planoT1Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT2Sabado} 
                        plano={planoT2Area10}  
                        subItem = "10" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                                    late={lateSabado}
                                    dia={sabado}
                                    today={todaySabado} 
                                    auditoria={auditoriasT3Sabado} 
                                    plano={planoT3Area10}
                                    subItem="10"
                                />
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="10"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="10"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="10"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="10"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="10"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="10"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="a">Disciplina</td>

                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT1Segunda} 
                        plano={planoT1Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT2Segunda} 
                        plano={planoT2Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT3Segunda} 
                        plano={planoT3Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT1Terça} 
                        plano={planoT1Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT2Terça} 
                        plano={planoT2Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT3Terça} 
                        plano={planoT3Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT1Quarta} 
                        plano={planoT1Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT2Quarta} 
                        plano={planoT2Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT3Quarta} 
                        plano={planoT3Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT1Quinta} 
                        plano={planoT1Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT2Quinta} 
                        plano={planoT2Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT3Quinta} 
                        plano={planoT3Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT1Sexta} 
                        plano={planoT1Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT2Sexta} 
                        plano={planoT2Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT3Sexta} 
                        plano={planoT3Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT1Sabado} 
                        plano={planoT1Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT2Sabado} 
                        plano={planoT2Area11}  
                        subItem = "11" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                                    late={lateSabado}
                                    dia={sabado}
                                    today={todaySabado} 
                                    auditoria={auditoriasT3Sabado} 
                                    plano={planoT3Area11}
                                    subItem="11"
                                />
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="11"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="11"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="11"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="11"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="11"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="11"
                                />
                            </td>                        
                            </tr>
                        <tr>
                            <td className="a">1ª Peça OK</td>

                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT1Segunda} 
                        plano={planoT1Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT2Segunda} 
                        plano={planoT2Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSegunda}
                        dia={segunda}
                        today={todaySegunda} 
                        auditoria={auditoriasT3Segunda} 
                        plano={planoT3Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT1Terça} 
                        plano={planoT1Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT2Terça} 
                        plano={planoT2Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateTerça}
                        dia={terça}
                        today={todayTerça} 
                        auditoria={auditoriasT3Terça} 
                        plano={planoT3Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT1Quarta} 
                        plano={planoT1Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT2Quarta} 
                        plano={planoT2Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                            <OperadorAuditoria
                        late={lateQuarta}
                        dia={quarta}
                        today={todayQuarta} 
                        auditoria={auditoriasT3Quarta} 
                        plano={planoT3Area12}  
                        subItem = "12" />
                            </td>
                            <td  className="a">
                            <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT1Quinta} 
                        plano={planoT1Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT2Quinta} 
                        plano={planoT2Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateQuinta}
                        dia={quinta}
                        today={todayQuinta} 
                        auditoria={auditoriasT3Quinta} 
                        plano={planoT3Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT1Sexta} 
                        plano={planoT1Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT2Sexta} 
                        plano={planoT2Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSexta}
                        dia={sexta}
                        today={todaySexta} 
                        auditoria={auditoriasT3Sexta} 
                        plano={planoT3Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT1Sabado} 
                        plano={planoT1Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                        late={lateSabado}
                        dia={sabado}
                        today={todaySabado} 
                        auditoria={auditoriasT2Sabado} 
                        plano={planoT2Area12}  
                        subItem = "12" />
                            </td>
                            <td className="a">
                        <OperadorAuditoria
                                    late={lateSabado}
                                    dia={sabado}
                                    today={todaySabado} 
                                    auditoria={auditoriasT3Sabado} 
                                    plano={planoT3Area12}
                                    subItem="12"
                                />
                            </td>
                            <td>
                             <SuperiorAuditoria
                                    aux={AnalistaQualidade}
                                    plano={plano}
                                    subItem="12"
                                />
                             </td>
                            <td>
                                <SuperiorAuditoria
                                    aux={EngenhariaProcesso}
                                    plano={plano}
                                    subItem="12"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={SupervisaoProducao}
                                    plano={plano}
                                    subItem="12"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={CoordenacaoProducao}
                                    plano={plano}
                                    subItem="12"
                                />
                            </td>
                            <td>
                            <SuperiorAuditoria
                                    aux={GerenteQualidade}
                                    plano={plano}
                                    subItem="12"
                                />
                            </td>
                            <td>
                              <SuperiorAuditoria
                                    aux={PlantManeger}
                                    plano={plano}
                                    subItem="12"
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </TableDiv>
        </Container>
    );
}
