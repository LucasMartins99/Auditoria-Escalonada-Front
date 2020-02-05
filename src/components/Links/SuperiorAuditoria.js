/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Emoji from 'a11y-react-emoji';

export default function SuperiorAuditoria(props) {
    const [id, setId] = useState();
    const { plano, aux, subitem } = props;
    useEffect(() => {
        aux.map(plant => setId(plant.id));
    });
    const validar = plano.find(p => p.auditoria.id === id);

    return (
        <button type="button">
            {validar === undefined ? (
                <h2>
                    {' '}
                    <Emoji symbol="✔️" />{' '}
                </h2>
            ) : (
                validar.map(a =>
                    a.subitem === subitem ? (
                        <h2>
                            {' '}
                            <Emoji symbol="❌" />{' '}
                        </h2>
                    ) : (
                        <h2>
                            {' '}
                            <Emoji symbol="✔️" />{' '}
                        </h2>
                    )
                )
            )}
        </button>
    );
}
