/* eslint-disable react/destructuring-assignment */

/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import { format, addWeeks } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';
import Tooltip from 'react-tooltip-lite';
import { useForm } from 'react-hook-form';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import { FormHelperText } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import history from '~/services/history';
import { Container, Card, Center } from './styles';
import * as CartActions from '../../../store/modules/plan/actions';
import * as AuditoriaActions from '../../../store/modules/auditoria/actions';
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
const styles = {
    option: {
        minWidth: 210,
    },
    teste: {
        display: 'none',
    },
};

function CreatePlan(props) {
    const { dataop } = props.match.params;
    const { classes } = props;
    const dispatch = useDispatch();
    const profile = useSelector(state => state.user.profile);
    const setor = useSelector(state => state.setor.setor);
    const cargo = useSelector(state => state.user.profile.cargo);
    const auditoria_id = useSelector(state => state.setor.setor.id);
    const [users, setUsers] = useState([]);
    const [users2, setUsers2] = useState([]);
    const [img, setImg] = useState();
    const [subitem, setSubitem] = useState();

    const [aux] = useState([
        'Engenharia',
        'Logistica',
        'Qualidade',
        'Linha Barras',
        'Linha Molas',
        'Kaizen',
    ]);

    const [date2, setDate2] = useState(addWeeks(new Date(), 1));
    const { register, handleSubmit } = useForm({
        validationSchema: schema,
    });

    async function onSubmit(data) {
        const prazo = format(date2, 'yyy/MM/dd', { locale: pt });
        let avatar_id = img;
        if (avatar_id === undefined) {
            avatar_id = 1;
        }
        dispatch(
            CartActions.addToPlanRequest(
                data,
                dataop,
                auditoria_id,
                prazo,
                avatar_id,
                cargo
            )
        );
    }

    const auditoria = useSelector(state =>
        state.auditoria.map(question => ({
            ...question,
        }))
    );
    if (auditoria.length === 0) {
        dispatch(AuditoriaActions.addAuditoriaRequest(auditoria_id, cargo));
        history.push('/main');
    }
    function handleDate(b) {
        setDate2(b);
    }
    function handleArea(a) {
        a.preventDefault();
        const usersArea = users.filter(u => u.area === a.target.value);
        setUsers2(usersArea);
    }
    async function handleChange(e) {
        const data = new FormData();
        data.append('file', e.target.files[0]);
        const response = await api.post('files', data);
        const { id } = response.data;
        setImg(id);
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
    }, []);
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
                                    <Box component="span" display="none">
                                        <TextField
                                            display="none"
                                            name="subitem"
                                            value={question.subitem}
                                            variant="outlined"
                                            inputRef={register}
                                        />
                                    </Box>
                                    <TextField
                                        name="item"
                                        value={question.item}
                                        variant="outlined"
                                        inputRef={register}
                                    />
                                </Tooltip>

                                <TextField
                                    name="problema"
                                    placeholder="Descreva o problema"
                                    autoComplete="off"
                                    variant="outlined"
                                    inputRef={register}
                                />

                                <TextField
                                    name="auditor"
                                    value={profile.name}
                                    variant="outlined"
                                    inputRef={register}
                                />

                                <TextField
                                    variant="outlined"
                                    name="setor"
                                    value={setor.setor}
                                    inputRef={register}
                                />

                                <TextField
                                    variant="outlined"
                                    name="maquina"
                                    placeholder="maquina"
                                    inputRef={register}
                                />

                                <TextField
                                    name="acao"
                                    placeholder="Ação corretiva se souber"
                                    autoComplete="off"
                                    variant="outlined"
                                    inputRef={register}
                                />
                                <Select
                                    native
                                    inputRef={register}
                                    name="area"
                                    variant="outlined"
                                    className={classes.option}
                                    onChange={handleArea}
                                >
                                    <option disabled value="Não definido">
                                        Area responsavel
                                    </option>
                                    {aux.map(a => (
                                        <option key={a} value={a}>
                                            {a}
                                        </option>
                                    ))}
                                </Select>
                                <Select
                                    native
                                    inputRef={register}
                                    name="responsavel"
                                    variant="outlined"
                                    className={classes.option}
                                >
                                    <option disabled value="Não definido">
                                        Escolha o responsavel
                                    </option>
                                    <option value="Não definido">
                                        Não definido
                                    </option>
                                    {users2.map(u => (
                                        <option key={u.name} value={u.name}>
                                            {u.name}
                                        </option>
                                    ))}
                                </Select>
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
                                <input
                                    type="file"
                                    id="avatar"
                                    className="avatar"
                                    accept="image/*"
                                    inputRef={register}
                                    onChange={handleChange}
                                    name="avatar id"
                                />
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
};
export default withStyles(styles)(CreatePlan);
