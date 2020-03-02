import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { loginRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/imagens/logo.PNG';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string()
        .min(4, 'No mínimo 4 caracteres')
        .required('A senha é obrigatória'),
});

export default function Login() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);
    function handleSubmit({ email, password }) {
        dispatch(loginRequest(email, password));
    }
    return (
        <>
            <img src={logo} alt="logo" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Digite sua senha"
                />
                <button type="submit">
                    {loading ? 'Carregando...' : 'Acessar'}
                </button>
            </Form>
        </>
    );
}
