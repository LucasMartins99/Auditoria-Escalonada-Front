/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
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
import { getISOWeek, getYear } from 'date-fns';
import { useForm } from 'react-hook-form';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import api from '~/services/api';
import history from '~/services/history';

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
    option: {
        minWidth: 230,
    },
});

function Form(props) {
    const { classes } = props;
    const { id } = props;

    const [date2, setDate2] = useState(new Date());

    const [status] = useState('Planejado');
    const [users, setUsers] = useState([]);
    const [turno] = useState('adm');

    const [auditoria, setAuditoria] = useState([]);
    const { register, handleSubmit } = useForm();

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

    function handleDate(date2) {
        setDate2(date2);
    }
    async function onSubmit(data) {
        const semana = getISOWeek(date2);
        const actualSemana = getISOWeek(new Date());
        const ano = getYear(date2);
        const { auditor, setor, obs } = data;
        const aux = users.filter(u => u.name === data.auditor).slice(0, 1);
        let cargo;
        aux.map(a => (cargo = a.cargo));

        if (id !== undefined) {
            if (actualSemana < semana) {
                const status = 'Planejado';
                const data = date2;
                try {
                    await api.put(`auditoria/${id}`, {
                        setor,
                        semana,
                        auditor,
                        obs,
                        cargo,
                        ano,
                        status,
                        data,
                    });
                    toast.success('Auditoria alterada com sucesso');
                    history.push('/main');
                } catch (err) {
                    toast.error('Falha na alteração da auditoria');
                }
            } else {
                try {
                    await api.put(`auditoria/${id}`, {
                        setor,
                        semana,
                        auditor,
                        obs,
                        cargo,
                        ano,
                        data,
                    });
                    toast.success('Auditoria alterada com sucesso');
                    history.push('/main');
                } catch (err) {
                    toast.error('Falha na alteração da auditoria');
                }
            }
        } else {
            const data = date2;
            try {
                await api.post('auditoria', {
                    setor,
                    semana,
                    status,
                    auditor,
                    cargo,
                    obs,
                    turno,
                    ano,
                    data,
                });
                toast.success('Auditoria atribuida com sucesso');
            } catch (err) {
                toast.error('Falha na atribuição da auditoria');
            }
        }
    }
    useEffect(() => {
        async function loadAuditoria() {
            const response = await api.get('/auditoria');
            const data = response.data.map(a => ({
                ...a,
            }));
            setAuditoria(data);
        }
        loadAuditoria();
    }, [id]);

    const auditoriaId = auditoria.filter(a => a.id === parseInt(id, 10));

    return (
        <Card className={classes.card} variant="outlined">
            <form
                autoComplete="off"
                className={classes.root}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormControl variant="outlined" className={classes.FormControl}>
                    <FormHelperText className={classes.text}>
                        SETOR:
                    </FormHelperText>
                    <Select native inputRef={register} name="setor">
                        {id !== undefined ? (
                            auditoriaId.map(a => (
                                <option selected value={a.setor}>
                                    {a.setor}
                                </option>
                            ))
                        ) : (
                            <option selected value="ESCOLHA">
                                Escolha
                            </option>
                        )}

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
                    <Select inputRef={register} name="auditor" native>
                        {id !== undefined ? (
                            auditoriaId.map(a => (
                                <option selected value={a.auditor}>
                                    {a.auditor}
                                </option>
                            ))
                        ) : (
                            <option selected value="ESCOLHA">
                                Escolha
                            </option>
                        )}
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
                        inputRef={register}
                        name="date"
                        value={date2}
                        onChange={handleDate}
                        KeyboardButtonProps={{
                            'arial-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>

                <span className={classes.span} />
                {id !== undefined ? (
                    auditoriaId.map(() => (
                        <TextField
                            id="outline-multiline-static"
                            label="OBSERVAÇÃO"
                            multiline
                            row="10"
                            inputRef={register}
                            name="obs"
                            variant="outlined"
                        />
                    ))
                ) : (
                    <TextField
                        id="outline-multiline-static"
                        label="OBSERVAÇÃO"
                        multiline
                        row="10"
                        variant="outlined"
                        name="obs"
                        inputRef={register}
                    />
                )}

                <div className={classes.button2}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        type="submit"
                    >
                        {id !== undefined ? 'ALTERAR' : 'CADASTRAR'}
                    </Button>
                </div>
            </form>
        </Card>
    );
}
Form.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
    id: PropTypes.number,
};
Form.defaultProps = {
    id: undefined,
};
export default withStyles(styles)(Form);
