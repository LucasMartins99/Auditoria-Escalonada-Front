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
    const [maquinas, setMaquinas] = useState([]);

    const [aux] = useState([
        'Engenharia',
        'Logistica',
        'Qualidade',
        'Linha Barras',
        'Linha Molas',
        'Kaizen',
    ]);
    const [forjas] = useState([
        'Forjas Yadon',
        'Forjas Jundiai 1',
        'Forjas Jundiai 2',
        'Forjas Gutman',
        'Forjas Pesadas',
    ]);
    const [tubular] = useState([
        'Dobra Tubular 1',
        'Dobra Tubular 2',
        'Forja Tubular 1',
        'Forja Tubular 2',
    ]);
    const [fornos] = useState([
        'Linha de Dobra 1',
        'Linha de Dobra 2',
        'Linha de Dobra 3',
        'Linha de Dobra 4',
    ]);
    const [usinagem] = useState([
        'Recalque',
        'Tornos CNC',
        'Indução Barra Reta',
        'Furadeira',
    ]);
    const [jato] = useState([
        'Jato 1',
        'Jato 3',
        'Calibragem 1',
        'Calibragem 3',
        'Calibragem 4',
        'MIB 1',
        'MIB 2',
        'MIB 3',
        'Gravação Barra Reta',
    ]);
    const [pintura] = useState([
        'Pintura ETE',
        'Pintura Secagem',
        'Pintura Cabine de Pó',
        'Pintura Forno Cura',
    ]);
    const [montagem] = useState([
        'Montagem invision',
        'Montagem Jeep 1',
        'Montagem Jeep 2',
        'Montagem Honda',
        'Montagem GM S10',
        'Montagem GM 287',
        'Montagem GM GEM',
        'Montagem Mitsubish',
        'Montagem Toyota Yaris',
        'Montagem Toyota Corolla',
        'Montagem Hyundai 1',
        'Montagem Hyundai 2',
        'Montagem Overdrill',
        'Montagem Presetting',
        'Montagem Pesadas',
    ]);
    const [gluebushing] = useState([
        'Aplicação de Cola',
        'Flamming',
        'Bloco Rigido',
        'Forno Cura',
    ]);
    const [enroladeiraquente] = useState([
        'Carregador',
        'Aquecimento Indução',
        'Enrolamento',
        'Casset',
        'Pig Tail',
        'Tanque de tempera',
        'Tratamento térmico',
    ]);
    const [enroladeirafrio] = useState([
        'Box Bobinas',
        'Gravação',
        'Enroladeira Frio',
    ]);
    const [morita] = useState([
        'Morita 1',
        'Magna Flux',
        'Jato/Warm peening',
        'Morita 2',
    ]);
    const [pinturaMola] = useState(['Pintura', 'Morita 3', 'Acabamento']);

    useEffect(() => {
        switch (setor.setor) {
            case 'Linha de Fornos':
                setMaquinas(fornos);
                break;
            case 'Linha de Forjas':
                setMaquinas(forjas);
                break;
            case 'Linha de Tubulares':
                setMaquinas(tubular);
                break;
            case 'Usinagem/Recalque':
                setMaquinas(usinagem);
                break;
            case 'Calibragem/Jatos/Cravamento de Arruelas':
                setMaquinas(jato);
                break;
            case 'Linha de Pintura':
                setMaquinas(pintura);
                break;
            case 'Linha de Montagem':
                setMaquinas(montagem);
                break;
            case 'Glue Bushing':
                setMaquinas(gluebushing);
                break;
            case 'Indução/Enroladeira L2/Forno':
                setMaquinas(enroladeiraquente);
                break;
            case 'Enroladeira Frio':
                setMaquinas(enroladeirafrio);
                break;
            case 'Morita 1/Magna Flux/Jato/Morita 2':
                setMaquinas(morita);
                break;
            case 'Pintura/Morita 3/Acabamento':
                setMaquinas(pinturaMola);
                break;

            default:
        }
    }, [
        setor.setor,
        fornos,
        forjas,
        tubular,
        usinagem,
        jato,
        pintura,
        montagem,
        enroladeiraquente,
        enroladeirafrio,
        morita,
        pinturaMola,
        gluebushing,
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

                                <Select
                                    native
                                    inputRef={register}
                                    name="maquina"
                                    variant="outlined"
                                    className={classes.option}
                                >
                                    {maquinas.map(a => (
                                        <option key={a} value={a}>
                                            {a}
                                        </option>
                                    ))}
                                </Select>

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
                                    <option selected value="Não definido">
                                        Area responsavel
                                    </option>
                                    <option value="Não definido">
                                        Não definido
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
                                    <option selected value="Não definido">
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
                                <p />
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
                            <p />

                            <button className="button" type="submit">
                                ENVIAR
                            </button>
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
