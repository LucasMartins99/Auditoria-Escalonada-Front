import React from 'react';
import { Link } from 'react-router-dom';
import Emoji from 'a11y-react-emoji';

export default function Acoes(props) {
    // eslint-disable-next-line react/prop-types
    const { dia } = props;
    return (
        <button type="button">
            <Link to={`/ações/${dia}`}>
                <Emoji symbol="🙁" />
            </Link>
        </button>
    );
}
