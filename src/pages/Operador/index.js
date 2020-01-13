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
import api from '~/services/api';
import { Container, TableDiv } from './styles';

export default function Operador() {
    const [date, setDate] = useState(new Date());
    const [auditorias, setAuditoria] = useState([]);
    const [plano, setPlano] = useState([]);
    const [emojiT1Segunda1, setEmojiT1Segunda1] = useState('');
    const [emojiT1Terça1, setEmojiT1Terça1] = useState('');
    const [emojiT1Quarta1, setEmojiT1Quarta1] = useState('');
    const [emojiT1Quinta1, setEmojiT1Quinta1] = useState('');
    const [emojiT1Sexta1, setEmojiT1Sexta1] = useState('');
    const [emojiT1Sabado1, setEmojiT1Sabado1] = useState('');
    const [emojiT2Segunda1, setEmojiT2Segunda1] = useState('');
    const [emojiT3Segunda1, setEmojiT3Segunda1] = useState('');
    const setor = useSelector(state => state.user.profile.setor);

    const actualWeek = getISOWeek(date);

    useEffect(() => {
        async function loadAuditoria() {
            const response = await api.get('auditorias-semana', {
                params: { setor, actualWeek },
            });
            const data = response.data.map(a => ({
                ...a,
            }));
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

    function handleNextWeek() {
        setDate(addWeeks(date, 1));
    }
    function handlePrevWeek() {
        setDate(subWeeks(date, 1));
    }

    const feliz = true;

    const emojiSegunda = isBefore(daysWeek[1], date);
    const emojiTerça = isBefore(daysWeek[2], date);
    const emojiQuarta = isBefore(daysWeek[3], date);
    const emojiQuinta = isBefore(daysWeek[4], date);
    const emojiSexta = isBefore(daysWeek[5], date);
    const emojiSabado = isBefore(daysWeek[6], date);
    const todaySegunda = isSameDay(new Date(), daysWeek[1]);
    const lateSegunda = isBefore(new Date(), daysWeek[1]);
    const todayTerça = isSameDay(new Date(), daysWeek[2]);
    const todayQuarta = isSameDay(new Date(), daysWeek[3]);
    const todayQuinta = isSameDay(new Date(), daysWeek[4]);
    const todaySexta = isSameDay(new Date(), daysWeek[5]);
    const todaySabado = isSameDay(new Date(), daysWeek[6]);
    const auditoriasT1 = auditorias.filter(x => x.turno === '1');
    const auditoriasT2 = auditorias.filter(y => y.turno === '2');
    const auditoriasT3 = auditorias.filter(z => z.turno === '3');
    const planoT1 = plano.filter(a => a.auditoria.turno === '1');
    const planoT2 = plano.filter(b => b.auditoria.turno === '2');
    const planoT3 = plano.filter(c => c.auditoria.turno === '3');
    console.log(planoT1);


    useEffect(() => {
        switch (todaySegunda) {
            case true:
                setEmojiT1Segunda1('❔');
                setEmojiT2Segunda1('❔');
                setEmojiT3Segunda1('❔');
                break;
            default:
                setEmojiT1Segunda1('');
                setEmojiT2Segunda1('');
                setEmojiT3Segunda1('');
        }
        if (!lateSegunda && !todaySegunda) {
            setEmojiT1Segunda1('😡');
            setEmojiT2Segunda1('😡');
            setEmojiT3Segunda1('😡');
        }

        auditoriasT1.forEach(a => {
            switch (a.data) {
                case segundaBD:
                    setEmojiT1Segunda1('✔️');
                    break;
                case terçaBD:
                    setEmojiT1Terça1('✔️');
                    break;
                case quartaBD:
                    setEmojiT1Quarta1('✔️');
                    break;
                default:
            }
        });
        auditoriasT2.forEach(a => {
            if (a.data === segundaBD) {
                setEmojiT2Segunda1('✔️');
            }
        });
        auditoriasT3.forEach(a => {
            if (a.data === segundaBD) {
                setEmojiT3Segunda1('✔️');
            }
        });

        planoT1.forEach(a => {
            switch (a.area) {
                case 1:
                    if (a.auditoria.data === segundaBD) {
                        setEmojiT1Segunda1('🙁');
                    }
                    if (a.auditoria.data === terçaBD) {
                        setEmojiT1Terça1('🙁');
                    }
                    if (a.auditoria.data === quartaBD) {
                        setEmojiT1Quarta1('🙁');
                    }
                    if (a.auditoria.data === quintaBD) {
                        setEmojiT1Quinta1('🙁');
                    }
                    if (a.auditoria.data === sextaBD) {
                        setEmojiT1Sexta1('🙁');
                    }
                    if (a.auditoria.data === sabadoBD) {
                        setEmojiT1Sabado1('🙁');
                    }
                    break;
                default:
            }
        });
        planoT2.forEach(a => {
            if (a.auditoria.data === segundaBD && a.area === 1) {
                setEmojiT2Segunda1('🙁');
            }
        });
        planoT3.forEach(a => {
            if (a.auditoria.data === segundaBD && a.area === 1) {
                setEmojiT3Segunda1('🙁');
            }
        });
    });

    return (
        <Container>
            <header>
                <div className="legenda">
                    <p>OK = ✔️</p>
                    <p>PLANEJADO = ❔ </p>
                    <p>ATRASADO = 😡</p>
                    <p>PROBLEMA = 🙁 </p>
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
                                {emojiSegunda && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol={emojiT1Segunda1} />
                                        </h2>
                                    </button>
                                )}
                            </td>

                            <td>
                                {emojiSegunda && (
                                    <button type="button">
                                        <h2>
                                           <Emoji symbol={emojiT2Segunda1} />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiSegunda && (
                                    <button type="button">
                                        <h2>
                                        <Emoji symbol={emojiT3Segunda1} />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiTerça && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiQuarta && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiQuarta && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiQuarta && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiQuinta && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiQuinta && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiQuinta && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiSexta && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiSexta && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiSexta && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiSabado && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiSabado && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {emojiSabado && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>

                        <tr>
                            <td>Meios de controle</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Poka Yoke</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td> Treinamento</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Gestão de não conformes</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Alertas da Qualidade</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Identificação e Rastreabilidade</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>5S</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Segurança / Meio ambiente</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>TPM</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Disciplina</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>1ª Peça OK</td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="✔️" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="❔" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😃" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="😡" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                            <td>
                                {feliz && (
                                    <button type="button">
                                        <h2>
                                            <Emoji symbol="🙁" />
                                        </h2>
                                    </button>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </TableDiv>
        </Container>
    );
}
