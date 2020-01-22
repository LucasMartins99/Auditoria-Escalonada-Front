/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Select } from '@rocketseat/unform';
import { format, addWeeks } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import Tooltip from 'react-tooltip-lite';
import history from '~/services/history';

import { Container, Card, Center } from './styles';
import DatePicker from '../../../components/DatePicker/index';
import * as CartActions from '../../../store/modules/plan/actions';
import * as AuditoriaActions from '../../../store/modules/auditoria/actions';
import ImgInput from './ImgInput';

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
    prazo: Yup.date(),
    conclusao: Yup.date(),
    file: Yup.string(),
    avatar_id: Yup.number(),
});

export default function CreatePlan() {
    const dispatch = useDispatch();
    const auditoria_id = useSelector(state => state.setor.setor.id);

    const handleSubmit = data => {
        data.conclusao = format(data.conclusao, 'yyy/MM/dd', { locale: pt });
        dispatch(CartActions.addToPlanRequest(data, auditoria_id));
    };
    const profile = useSelector(state => state.user.profile);
    const setor = useSelector(state => state.setor.setor);

    const auditoria = useSelector(state =>
        state.auditoria.map(question => ({
            ...question,
        }))
    );
    if (auditoria.length === 0) {
        dispatch(AuditoriaActions.addAuditoriaRequest(auditoria_id));
        history.push('/main');
    }

    const initialData = {
        conclusao: addWeeks(new Date(), 1),
    };

    return (
        <Container>
            <header>
                <strong>PLANO DE AÇÃO</strong>
            </header>
            <Center>
                {auditoria.map(question => (
                    <Card key={question.item}>
                        <Form
                            id="planForm"
                            onSubmit={handleSubmit}
                            initialData={initialData}
                            schema={schema}
                            key={question.id}
                        >
                            <content>
                                <Tooltip content={question.text}>
                                    <Input name="item" value={question.item} />
                                </Tooltip>
                                <Input
                                    name="problema"
                                    placeholder="Descreva o problema"
                                    autocomplete="off"
                                />
                                <Input name="auditor" value={profile.name} />
                                <Input name="setor" value={setor.setor} />
                                <Input name="maquina" placeholder="maquina" />
                                <Input
                                    name="acao"
                                    placeholder="Ação corretiva se souber"
                                    autocomplete="off"
                                />

                                <DatePicker name="conclusao" />

                                <Select
                                    name="responsavel"
                                    placeholder="Escolha o resposavel"
                                    options={options}
                                />

                                <ImgInput name="avatar_id" />
                            </content>

                            <button type="submit">Enviar</button>
                        </Form>
                    </Card>
                ))}
            </Center>
        </Container>
    );
}
