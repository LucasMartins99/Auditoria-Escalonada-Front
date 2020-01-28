/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { getISOWeek } from 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import api from '~/services/api';

const styles = theme => ({
    root: {
        '&.MuiTextField-root': {
            margin: theme.spacing(1),
            width: 300,
        },
    },
    card: {
        background: '#F0EFEF',
        borderRadius: 8,
        padding: 20,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 80,
    },
    text: {
        fontSize: 20,
        paddingTop: 10,
        color: '#000',
    },

    span: {
        paddingLeft: 90,
    },
    data: {
        marginLeft: 12,
    },
    button2: {
        paddingTop: 47,
        paddingLeft: 230,
    },
});

function Form(props) {
    const { classes } = props;
    const [setor, setSetor] = useState('');
    const [date2, setDate2] = useState(new Date());
    const [obs, setObs] = useState('');
    const [auditor, setAuditor] = useState('');
    const [status, setStatus] = useState('Planejado');
    const [users, setUsers] = useState([]);
    const [turno, setTurno] = useState('adm');
    const [cargo, setCargo] = useState('');

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

    const handleSetor = event => {
        setSetor(event.target.value);
    };
    const handleAuditor = event => {
        setAuditor(event.target.value);
        const aux = users.filter(u => u.name === event.target.value);
        aux.map(a => setCargo(a.cargo));
    };

    const handleDate = date2 => {
        setDate2(date2);
    };
    async function handleSubmit() {
        const semana = getISOWeek(date2);
        try {
            const response = await api.post('auditoria', {
                setor,
                semana,
                status,
                auditor,
                obs,
                turno,
                cargo,
            });
        } catch (err) {
            toast.error('Falha na atribuição da auditoria');
        }
        toast.success('Auditoria atribuida com sucesso');
    }

    return (
        <Card className={classes.card} variant="outlined">
            <form
                autoComplete="off"
                className={classes.root}
                onSubmit={handleSubmit}
            >
                <FormControl variant="outlined" className={classes.FormControl}>
                    <FormHelperText className={classes.text}>
                        SETOR:
                    </FormHelperText>
                    <Select native value={setor} onChange={handleSetor}>
                        <option value="ESCOLHA">Escolha</option>
                        <option value="Linha Tubulares">Linha Tubulares</option>
                        <option value="Linha de Forjas">Linha de Forjas</option>
                        <option value="Linha de Fornos">Linha de Fornos</option>
                        <option value="Usinagem/Recalque">
                            Usinagem/Recalque
                        </option>
                        <option value="Calibragem/Jatos/Cravamento de Arruelas">
                            Calibragem/Jatos
                        </option>
                        <option value="Linha de Pintura">
                            Linha de Pintura
                        </option>
                        <option value="Linha de Montagem">
                            Linha de Montagem
                        </option>
                        <option value="Glue Bushing">Glue Bushing</option>
                        <option value="Indução/Enroladeira L2/Forno">
                            Indução/Enroladeira L2
                        </option>
                        <option value="Enroladeira Frio">
                            Enroladeira Frio
                        </option>
                        <option value="Morita 1/Magna Flux/Jato/Morita 2">
                            Morita 1/Magna Flux/Jato
                        </option>
                        <option value="Pintura/Morita 3/Acabamento">
                            Pintura/Morita 3/Acabamento
                        </option>
                    </Select>
                </FormControl>
                <span className={classes.span} />
                <FormControl variant="outlined" className={classes.FormControl}>
                    <FormHelperText className={classes.text}>
                        AUDITOR:
                    </FormHelperText>
                    <Select native value={auditor} onChange={handleAuditor}>
                        <option value="ESCOLHA">Escolha</option>
                        {users.map(u => (
                            <option key={u.name} value={u.name}>
                                {u.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <FormHelperText className={classes.text} />
                    <KeyboardDatePicker
                        className={classes.data}
                        disableToolbar
                        variant="outlined"
                        format="dd-MM-yyyy"
                        label="DATA LIMITE"
                        id="date-picker-inline"
                        value={date2}
                        onChange={handleDate}
                        KeyboardButtonProps={{
                            'arial-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <span className={classes.span} />
                <TextField
                    id="outline-multiline-static"
                    label="OBSERVAÇÃO"
                    multiline
                    row="10"
                    variant="outlined"
                    value={obs}
                    onInput={e => setObs(e.target.value)}
                />
                <div className={classes.button2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        type="submit"
                    >
                        Cadastrar
                    </Button>
                </div>
            </form>
        </Card>
    );
}
Form.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Form);
