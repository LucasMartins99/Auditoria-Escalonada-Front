/* eslint-disable react/prop-types */
import React from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Container } from './styles';
import DatePicker from '../../../components/DatePicker/index';
import * as CartActions from '../../../store/modules/auditoria/actions';

const options = [
    { id: 'Engenharia', title: 'Engenharia' },
    { id: 'Ferramentaria', title: 'Ferramentaria' },
    { id: 'Kaizen', title: 'Kaizen' },
    { id: 'Logística', title: 'Logística' },
    { id: 'Manutenção', title: 'Manutenção' },
    { id: 'Produção', title: 'Produção' },
    { id: 'Qualidade', title: 'Qualidade' },
    { id: 'RH', title: 'RH' },
    { id: 'Segurança', title: 'Segurança' },
];

const schema = Yup.object().shape({
    item: Yup.number().required(),
    problema: Yup.string().required(),
    auditor: Yup.string().required(),
    maquina: Yup.string().required(),
    setor: Yup.string().required(),
    acao: Yup.string(),
    responsavel: Yup.string(),
    data: Yup.date().required(),
    prazo: Yup.date(),
    conclusao: Yup.date(),
});
async function handleSubmit(data) {}

function CreatePlan({ auditoria }) {
    const profile = useSelector(state => state.user.profile);
    const setor = useSelector(state => state.setor.setor);

    return (
        <Container>
            <header>
                <strong>PLANO DE AÇÃO</strong>
            </header>
            {auditoria.map(question => (
                <Form id="planForm" onSubmit={handleSubmit} schema={schema}>
                    <content>
                        <Input name="item" value={question.item} />
                        <Input
                            name="problema"
                            placeholder="Descreva o problema"
                        />
                        <Input name="auditor" value={profile.name} />
                        <Input name="setor" value={setor.setor} />
                        <Input name="maquina" placeholder="maquina" />
                        <Input
                            name="acao"
                            placeholder="Ação corretiva se souber"
                        />
                        <DatePicker name="date" placeholder="Data" />
                        <Select
                            name="cargo"
                            placeholder="Escolha o resposavel"
                            options={options}
                        />
                    </content>
                </Form>
            ))}
        </Container>
    );
}
const mapStateToProps = state => ({
    auditoria: state.auditoria.map(question => ({
        ...question,
    })),
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CreatePlan);
