/* eslint-disable react/prop-types */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import Emoji from 'a11y-react-emoji';
import { Container } from './styles';

export default function OperadorAuditoria(props) {
    // eslint-disable-next-line react/prop-types
    const { late, today, dia, auditoria, plano, subItem, semana, turno } = props;
    const aux = parseInt(subItem, 0);
    
    return (
        <Container>
            <button type="button">
                {today && auditoria.length < 1 ? (
                    <Link to={`/create-auditoria-operador/${dia}/${semana}/${turno}`}>
                        <h2>
                            <Emoji symbol="✏️" />
                        </h2>
                    </Link>
                ) : auditoria.length > 0 ? (
                    plano.length < 1 ? (
                        <h2>
                            {' '}
                            <Emoji symbol="✔️" />{' '}
                        </h2>
                    ) : (
                        plano.map(p => (
                            <h2>
                                {p.subitem === aux && p.conclusao === null ? (
                                    <Link to="/planos">
                                        <Emoji symbol="❌" />
                                    </Link>
                                ) : (
                                    <Emoji symbol="✔️" />
                                )}
                            </h2>
                        ))
                    )
                ) : !late && !today ? (
                    <h2>
                        <Link to={`/create-auditoria-operador/${dia}/${semana}/${turno}`}>
                            <Emoji symbol="➖" />
                        </Link>
                    </h2>
                ) : (
                    <Emoji symbol="" />
                )}
            </button>
        </Container>
    );
}
