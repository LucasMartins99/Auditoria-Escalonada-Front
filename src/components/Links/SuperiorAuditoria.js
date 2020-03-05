/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Emoji from 'a11y-react-emoji';
import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function SuperiorAuditoria(props) {
    const [id, setId] = useState();
    const [auditor, setAuditor] = useState();
    const [data, setData] = useState(null);
    const { plano, aux, subItem } = props;
    const subitemformat = parseInt(subItem, 0);

    useEffect(() => {
        if (aux.length < 1) {
            setId(null);
            setAuditor(null);
            setData(null);
        } else {
            aux.map(plant => setId(plant.id));
            aux.map(plant => setAuditor(plant.auditor));
            aux.map(plant => setData(plant.data));
        }
    }, [aux]);

    const validar2 = plano.filter(p => p.auditoria.id === id);
    const validar = validar2
        .filter(p => p.subitem === subitemformat)
        .slice(0, 1);

    function formatDate(date) {
        const dia = date.split('-')[2];
        const mes = date.split('-')[1];
        return `${dia}-${mes}`;
    }

    return (
        <Container>
            <button type="button">
                {id !== null && validar.length < 1 ? (
                    <h1>
                        <Emoji symbol="✔️" /> <p /> <p>{auditor}</p>
                        <p>{data !== null ? formatDate(data) : 'a'}</p>
                    </h1>
                ) : (
                    validar.map(a =>
                        a.subitem === subitemformat && a.conclusao === null ? (
                            <h2>
                                <Link to="/planos">
                                    <Emoji symbol="❌" />
                                    <p /> <p>{auditor}</p>
                                    <p>{formatDate(data)}</p>
                                </Link>
                            </h2>
                        ) : (
                            <h1>
                                <Emoji symbol="✔️" /> <p /> <p>{auditor}</p>
                                <p>{formatDate(data)}</p>
                            </h1>
                        )
                    )
                )}
            </button>
        </Container>
    );
}
