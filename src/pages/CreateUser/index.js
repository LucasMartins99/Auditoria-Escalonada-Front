import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import logo from '~/assets/imagens/logo.PNG';
import history from '~/services/history';
import { Content, Wrapper } from './styles';
import { createUserRequest } from '~/store/modules/auth/actions';

const options = [
    { id: 'Engenharia Processo', title: 'Engenharia Processo' },
    { id: 'Supervisor Produção', title: 'Supervisor Produção' },
    { id: 'Analista Qualidade', title: 'Analista Qualidade' },
    { id: 'Operador', title: 'Operador' },
    { id: 'Coordenador Produção', title: 'Coordenador Produção' },
    { id: 'Gerente Qualidade', title: 'Gerente Qualidade' },
    { id: 'Gerente Engenharia', title: 'Gerente Engenharia' },
    { id: 'Plant Manager', title: 'Plant Manager' },
    { id: 'Engenharia', title: 'Engenharia' },
    { id: 'Admnistrador', title: 'Admnistrador' },
];

const schema = Yup.object().shape({
    name: Yup.string().required('Nome obrigatório'),
    email: Yup.string()
        .email('Insira um e-mail válido')
        .required('O e-mail é obrigatório'),
    password: Yup.string()
        .min(4, 'No mínimo 4 caracteres')
        .required('A senha é obrigatória'),
    cargo: Yup.string().required('Campo obrigatorio'),
});

export default function CreateUser() {
    const dispatch = useDispatch();

    function handleSubmit(data) {
        dispatch(createUserRequest(data));
        toast.success('Usuario cadastrado com sucesso !');
        history.push('/main');
    }

    return (
        <Wrapper>
            <Content>
                <img src={logo} alt="logo" />
                <Form
                    autoComplete="off"
                    schema={schema}
                    onSubmit={handleSubmit}
                >
                    <Input
                        name="name"
                        type="text"
                        placeholder="Nome e Sobrenome"
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholder="O e-mail sogefi"
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Digite a senha secreta"
                    />
                    <Select
                        name="cargo"
                        placeholder="Escolha seu cargo"
                        options={options}
                    />
                    <button type="submit">Criar conta</button>
                </Form>
            </Content>
        </Wrapper>
    );
}
