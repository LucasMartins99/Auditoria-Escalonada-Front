/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { MdReply } from 'react-icons/md';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Select from '@material-ui/core/Select';
import { FormControl } from '@material-ui/core';
import { Container, Center } from './styles';
import history from '../../../services/history';
import api from '../../../services/api';

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
    option: {
        minWidth: 305,
        maxWidth: 305,
    },
    formControl: {
        paddingRight: 10,
    },
    button2: {
        paddingTop: 40,
        paddingLeft: 247,
    },
    card: {
        background: '#F0EFEF',
        borderRadius: 8,
        padding: 5,
    },
});

function UpdatePlan(props) {
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

    const { register, handleSubmit } = useForm();
    const { id } = props.match.params;
    const { classes } = props;
    const [responsavel, setResponsavel] = useState('');
    const [auditor, setAuditor] = useState('');
    const [problema, setProblema] = useState('');
    const [maquina, setMaquina] = useState('');
    const [date2, setDate2] = useState(new Date());
    const [prazo2, setPrazo2] = useState(new Date());
    /* const [conclusao2, setConclusao2] = useState(new Date()); */
    const [setor, setSetor] = useState('');
    const [acao, setAcao] = useState('');
    const [auxDate, setAuxDate] = useState(false);
    const [auxPrazo, setAuxPrazo] = useState(false);
    const [users, setUsers] = useState([]);
    const [maquinas, setMaquinas] = useState([]);
    const [setores, setSetores] = useState([]);
    /* const [auxConclusao, setAuxConlusao] = useState(false); */

    const handleDate = date => {
        setDate2(date);
        setAuxDate(true);
    };
    const handlePrazo = prazo => {
        setPrazo2(prazo);
        setAuxPrazo(true);
    };
    /* const handleConclusao = conclusao2 => {
        setConclusao2(conclusao2);
        setAuxConclusao(true);
    }; */

    const handleProblema = event => {
        setProblema(event.target.value);
    };

    const handleMaquina = event => {
        setMaquina(event.target.value);
    };
    const handleSetor = event => {
        setSetor(event.target.value);
    };
    const handleAcao = event => {
        setAcao(event.target.value);
    };
    const handleResponsavel = event => {
        setResponsavel(event.target.value);
    };

    async function onSubmit() {
        if (auxDate && auxPrazo) {
            const data = format(date2, 'yyyy/MM/dd', { locale: pt });
            const prazo = format(prazo2, 'yyyy/MM/dd', { local: pt });
            try {
                await api.put(`/plan/${id}`, {
                    problema,
                    auditor,
                    maquina,
                    data,
                    prazo,
                    setor,
                    acao,
                    responsavel,
                });
                toast.success('plano de ação atualizado com sucesso');
                history.push('/main');
            } catch (err) {
                toast.error('Falha ao atualizar revise os dados');
            }
        }
        if (!auxDate && auxPrazo) {
            const prazo = format(prazo2, 'yyyy/MM/dd', { local: pt });
            try {
                await api.put(`/plan/${id}`, {
                    problema,
                    auditor,
                    maquina,
                    prazo,
                    setor,
                    acao,
                    responsavel,
                });
                toast.success('plano de ação atualizado com sucesso');
                history.push('/main');
            } catch (err) {
                toast.error('Falha ao atualizar revise os dados');
            }
        }
        if (auxDate && !auxPrazo) {
            const data = format(date2, 'yyyy/MM/dd', { locale: pt });
            try {
                await api.put(`/plan/${id}`, {
                    problema,
                    auditor,
                    maquina,
                    data,
                    setor,
                    acao,
                    responsavel,
                });
                toast.success('plano de ação atualizado com sucesso');
                history.push('/main');
            } catch (err) {
                toast.error('Falha ao atualizar revise os dados');
            }
        } else {
            try {
                await api.put(`/plan/${id}`, {
                    problema,
                    auditor,
                    maquina,
                    setor,
                    acao,
                    responsavel,
                });
                toast.success('plano de ação atualizado com sucesso');
                history.push('/main');
            } catch (err) {
                toast.error('Falha ao atualizar revise os dados');
            }
        }
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
    useEffect(() => {
        async function loadSetores() {
            const response = await api.get('/all-setores');
            const data = response.data.map(a => ({
                ...a,
            }));
            setSetores(data);
        }
        loadSetores();
    }, []);

    useEffect(() => {
        async function loadPlan() {
            const response = await api.get(`/plan-unica/${id}`);

            setProblema(response.data.problema);
            setAuditor(response.data.auditor);
            setMaquina(response.data.maquina);
            setSetor(response.data.setor);
            setAcao(response.data.acao);
            setResponsavel(response.data.responsavel);
            setDate2(response.data.data);
            setPrazo2(response.data.prazo);
            /* setConclusao2(response.data.conclusao); */
        }
        loadPlan();
    }, [id]);
    useEffect(() => {
        switch (setor) {
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
        enroladeirafrio,
        enroladeiraquente,
        forjas,
        fornos,
        gluebushing,
        jato,
        montagem,
        morita,
        pintura,
        pinturaMola,
        setor,
        tubular,
        usinagem,
    ]);
    return (
        <Container>
            <header>
                <button type="button">
                    <MdReply size={40} color="#000" />
                </button>
                <strong>Alterar plano de ação</strong>
            </header>
            <Center>
                <Card className={classes.card} variant="outlined">
                    <form
                        className={classes.root}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div>
                            <FormControl className={classes.formControl}>
                                <FormHelperText>RESPONSÁVEL:</FormHelperText>
                                <Select
                                    inputRef={register}
                                    name="responsvel"
                                    onChange={handleResponsavel}
                                    native
                                    className={classes.option}
                                >
                                    <option
                                        selected
                                        disabled
                                        value={responsavel}
                                    >
                                        {responsavel}
                                    </option>

                                    {users.map(u => (
                                        <option key={u.name} value={u.name}>
                                            {u.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                id="standard-basic"
                                label="PROBLEMA:"
                                name="problema"
                                inputRef={register}
                                value={problema}
                                onChange={handleProblema}
                            />
                        </div>

                        <div>
                            <FormControl className={classes.formControl}>
                                <FormHelperText>MÁQUINA:</FormHelperText>
                                <Select
                                    inputRef={register}
                                    name="responsvel"
                                    onChange={handleMaquina}
                                    native
                                    className={classes.option}
                                >
                                    <option selected disabled value={maquina}>
                                        {maquina}
                                    </option>
                                    {maquinas.map(a => (
                                        <option key={a} value={a}>
                                            {a}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <FormHelperText>SETOR:</FormHelperText>
                                <Select
                                    inputRef={register}
                                    name="responsvel"
                                    onChange={handleSetor}
                                    native
                                    className={classes.option}
                                >
                                    <option selected disabled value={setor}>
                                        {setor}
                                    </option>

                                    {setores.map(s => (
                                        <option key={s.name} value={s.name}>
                                            {s.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <FormControl className={classes.formControl}>
                                <FormHelperText>AUDITOR:</FormHelperText>
                                <Select
                                    inputRef={register}
                                    name="auditor"
                                    onChange={handleResponsavel}
                                    native
                                    className={classes.option}
                                >
                                    <option selected disabled value={auditor}>
                                        {auditor}
                                    </option>
                                </Select>
                            </FormControl>
                            <TextField
                                id="standard-basic"
                                label="Ação"
                                name="acao"
                                inputRef={register}
                                value={acao}
                                onChange={handleAcao}
                            />
                        </div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <div>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd-MM-yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="DATA INICIO:"
                                    value={date2}
                                    onChange={handleDate}
                                    KeyboardButtonProps={{
                                        'arial-label': 'change date',
                                    }}
                                />

                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd-MM-yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="PRAZO:"
                                    value={prazo2}
                                    onChange={handlePrazo}
                                    KeyboardButtonProps={{
                                        'arial-label': 'change date',
                                    }}
                                />
                            </div>
                        </MuiPickersUtilsProvider>

                        <div className={classes.button2}>
                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                type="submit"
                            >
                                Alterar
                            </Button>
                        </div>
                    </form>
                </Card>
            </Center>
        </Container>
    );
}
UpdatePlan.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UpdatePlan);
