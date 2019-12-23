import React from 'react';
import logo from '~/assets/imagens/logo.PNG';
// import { Container } from './styles';

export default function Login() {
    return (
        <>
            <img src={logo} alt="logo" />
            <form>
                <input type="email" placeholder="Seu e-mail" />
                <input type="password" placeholder="Digite sua senha" />
                <button type="submit">Acessar</button>
            </form>
        </>
    );
}
