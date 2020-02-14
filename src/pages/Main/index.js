import React, { useState, useMemo, useEffect } from 'react';
import {
    format,
    subMonths,
    addMonths,
    startOfMonth,
    getISOWeek,
    endOfMonth,
    isBefore,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight, MdModeEdit } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';

import api from '~/services/api';
import { Container, Time } from './styles';
import { addSetorRequest } from '~/store/modules/setor/actions';

export default function Main() {
    const auditor = useSelector(state => state.user.profile.name);

    const [agenda, setAgenda] = useState([]);

    const [date, setDate] = useState(new Date());

    const dateFormatted = useMemo(() => format(date, 'MMMM', { locale: pt }), [
        date,
    ]);
    const actualWeek = getISOWeek(new Date());
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);
    const firstWeek = getISOWeek(firstDay);
    const lastWeek = getISOWeek(lastDay);

    useEffect(() => {
        async function loadAgenda() {
            const response = await api.get('agenda', {
                params: { firstWeek, lastWeek, auditor },
            });
            const data = response.data.map(product => {
                return {
                    late: isBefore(product.semana, actualWeek),
                    realizado: Object.is(product.status, 'Realizado'),
                    ...product,
                };
            });
            setAgenda(data);
        }
        loadAgenda();
    }, [actualWeek, auditor, firstWeek, lastWeek]);

    // eslint-disable-next-line array-callback-return

    function handleNextMonth() {
        setDate(addMonths(date, 1));
    }
    function handlePrevMonth() {
        setDate(subMonths(date, 1));
    }

    const dispatch = useDispatch();
    function handleSetor(id) {
        dispatch(addSetorRequest(id));
    }

    return (
        <Container>
            <header>
                <button type="button" onClick={handlePrevMonth}>
                    <MdChevronLeft size={36} color="#000" />
                </button>
                <strong>{dateFormatted}</strong>
                <button type="button" onClick={handleNextMonth}>
                    <MdChevronRight size={36} color="#000" />
                </button>
            </header>
            <ul>
                {agenda.map(auditoria => (
                    <Time
                        key={auditoria.id}
                        atrasado={
                            auditoria.status === 'Realizado'
                                ? false
                                : auditoria.late
                        }
                        realizado={auditoria.realizado}
                    >
                        <strong>Semana: {auditoria.semana}</strong>
                        <p>
                            <h5>{auditoria.setor}</h5>
                        </p>
                        <h5>{auditoria.obs}</h5>
                        <p>
                            <span>
                                {auditoria.late &&
                                auditoria.status !== 'Realizado'
                                    ? 'Atrasado'
                                    : auditoria.status}
                            </span>
                        </p>
                        <div>
                            {auditoria.status === 'Realizado' ? (
                                <span />
                            ) : (
                                <Button
                                    variant="secondary"
                                    onClick={() => handleSetor(auditoria.id)}
                                >
                                    Realizar
                                    <MdModeEdit size={22} color="#000" />
                                </Button>
                            )}
                        </div>
                    </Time>
                ))}
            </ul>
        </Container>
    );
}
