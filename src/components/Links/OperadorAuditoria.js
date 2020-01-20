import React from 'react';
import { Link } from 'react-router-dom';
import Emoji from 'a11y-react-emoji';

export default function OperadorAuditoria(props) {
    // eslint-disable-next-line react/prop-types
    const { dia, tipo } = props;
    return (
        <button type="button">
            <Link to={`/operador-auditoria/${dia}`}>
                {tipo ? <Emoji symbol="➖" /> : <Emoji symbol="✏️" />}
            </Link>
        </button>
    );
}
