/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Content } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
    const dispatch = useDispatch();
    function handleSignOut() {
        dispatch(signOut());
    }
    return (
        <Container>
            <Content>
                <nav>
                    <ul>
                        <Link to="/main">
                            <li>HOME</li>
                        </Link>

                        <Link to="/auditoria">
                            <li>AUDITORIAS</li>
                        </Link>
                        <Link to="/planos">
                            <li>AÇÕES</li>
                        </Link>

                        <Link to="/new-auditoria">
                            <li>ATRIBUIR</li>
                        </Link>
                        <Link to="/operador">
                            <li>GV</li>
                        </Link>
                        <Link to="/matriz">
                            <li>MATRIZ</li>
                        </Link>
                        <Link to="/">
                            <li onClick={handleSignOut}>SAIR</li>
                        </Link>
                    </ul>
                </nav>
            </Content>
        </Container>
    );
}
