import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/imagens/logo.PNG';

import { createUserRequest } from '~/store/modules/auth/actions';

const options = [
    { id: 'Engenharia Processo', title: 'Engenharia Processo' },
    { id: 'Supervisor Produção', title: 'Supervisor Produção' },
    { id: 'Analista Qualidade', title: 'Analista Qualidade' },
    { id: 'Operador', title: 'Operador' },
    { id: 'Coordenador Produção', title: 'Coordenador Produção' },
    { id: 'Gerente Qualidade', title: 'Gerente Qualidade' },
    { id: 'Plant Manager', title: 'Plant Manager' },
];

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string()
        .min(4, 'No mínimo 4 caracteres')
        .required('A senha é obrigatória'),
});

export default function CreateUser() {
    const dispatch = useDispatch();

    function handleSubmit({ name, email, password, cargo }) {
        dispatch(createUserRequest(name, email, password, cargo));
    }

    return (
        <>
            <img src={logo} alt="logo" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Digite sua senha secreta"
                />
                <Select
                    placeholder="Escolha seu cargo"
                    name="cargo"
                    options={options}
                />
                <button type="submit">Criar conta</button>
                <Link to="/">Já tenho conta</Link>
            </Form>
        </>
    );
}
