/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import { format, addWeeks } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import Tooltip from 'react-tooltip-lite';
import { useForm } from 'react-hook-form';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { withStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import history from '~/services/history';
import { Container, Card, Center } from './styles';
import * as CartActions from '../../../store/modules/plan/actions';
import * as AuditoriaActions from '../../../store/modules/auditoria/actions';
import ImgInput from './ImgInput';
import api from '~/services/api';

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
const styles = {};

function CreatePlan(props) {
    const { classes } = props;
    const dispatch = useDispatch();
    const auditoria_id = useSelector(state => state.setor.setor.id);
    const [users, setUsers] = useState([]);
    const [date2, setDate2] = useState(addWeeks(new Date(), 1));
    const { register, handleSubmit } = useForm({
        validationSchema: schema,
    });

    const onSubmit = data => {
        data.prazo = format(data.prazo, 'yyy/MM/dd', { locale: pt });
        if (data.avatar_id === undefined) {
            data.avatar_id = 1;
        }
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
    function handleDate(date2) {
        setDate2(date2);
    }

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/users');
            const data = response.data.map(a => ({
                ...a,
            }));
            setUsers(data);
        }
        loadUsers();
    });

    return (
        <Container>
            <header>
                <strong>PLANO DE AÇÃO</strong>
            </header>
            <Center>
                {auditoria.map(question => (
                    <Card key={question.item}>
                        <form
                            autoComplete="off"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <content>
                                <Tooltip content={question.text}>
                                    <TextField
                                        name="item"
                                        value={question.item}
                                        variant="outlined"
                                    />
                                </Tooltip>
                                <br />
                                <TextField
                                    name="problema"
                                    placeholder="Descreva o problema"
                                    autocomplete="off"
                                    variant="outlined"
                                />
                                <br />
                                <TextField
                                    name="auditor"
                                    value={profile.name}
                                    variant="outlined"
                                />

                                <TextField
                                    variant="outlined"
                                    name="setor"
                                    value={setor.setor}
                                />
                                <br />
                                <TextField
                                    variant="outlined"
                                    name="maquina"
                                    placeholder="maquina"
                                />

                                <TextField
                                    name="acao"
                                    placeholder="Ação corretiva se souber"
                                    autocomplete="off"
                                    variant="outlined"
                                />
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <FormHelperText className={classes.text} />

                                    <KeyboardDatePicker
                                        className={classes.data}
                                        disableToolbar
                                        variant="outlined"
                                        format="dd-MM-yyyy"
                                        label="DATA LIMITE"
                                        id="date-picker-inline"
                                        inputRef={register}
                                        name="date"
                                        value={date2}
                                        onChange={handleDate}
                                        KeyboardButtonProps={{
                                            'arial-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                <ImgInput name="avatar_id" />
                            </content>

                            <button type="submit">Enviar</button>
                        </form>
                    </Card>
                ))}
            </Center>
        </Container>
    );
}
CreatePlan.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    id: PropTypes.number,
};
export default withStyles(styles)(CreatePlan);
