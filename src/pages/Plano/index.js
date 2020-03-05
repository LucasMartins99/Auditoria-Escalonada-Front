/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable func-names */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import Table from '@material-ui/core/Table';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { isBefore, getISOWeek, format } from 'date-fns';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CreateIcon from '@material-ui/icons/Create';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Cancel from '@material-ui/icons/Cancel';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import { MdReply } from 'react-icons/md';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import DateFnsUtils from '@date-io/date-fns';
import { FormHelperText } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Container, TableDiv } from './styles';
import api from '~/services/api';
import history from '~/services/history';

const styles = theme => ({
    head: {
        backgroundColor: '#000',
        color: '#FFF',
        position: 'sticky',
        top: 0,
    },
    container: {
        maxHeight: 490,
        minWidth: 40,
    },
    red: {
        backgroundColor: '#ff0000',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    green: {
        backgroundColor: '#009900',
    },
    orange: {
        backgroundColor: '#ff9900',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    btn: {
        marginLeft: 35,
        marginTop: 7,
    },
});
function Plano(props) {
    const { classes } = props;
    const [plano, setPlano] = useState([]);
    const [plano2, setPlano2] = useState([]);
    const [plano3, setPlano3] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState();
    const actualWeek = getISOWeek(new Date());
    const today = format(new Date(), 'yyyy-MM-dd', { locale: pt });
    const { register, handleSubmit } = useForm();
    const [date2, setDate2] = useState(new Date());

    useEffect(() => {
        async function loadPlano() {
            const response = await api.get('plan');
            const data = response.data.map(planos => {
                return {
                    ...planos,
                    late: isBefore(new Date(planos.prazo), new Date(today)),
                    // eslint-disable-next-line no-prototype-builtins
                    realizado: planos.conclusao === null,
                };
            });

            setPlano(data);
        }
        loadPlano();
    }, [actualWeek, today]);
    useEffect(() => {
        const data = plano.map(p => {
            return {
                ...p,
                status: !p.realizado
                    ? 'Realizado'
                    : !p.late && p.realizado
                    ? 'Em andamento'
                    : p.late && p.realizado
                    ? 'Atrasado'
                    : '',
            };
        });
        setPlano2(data);
    }, [plano]);
    useEffect(() => {
        const data = plano2.sort(function(a, b) {
            if (a.status > b.status) {
                return 1;
            }
            if (a.status < b.status) {
                return -1;
            }

            return 0;
        });
        setPlano3(data);
    }, [plano2]);

    function formatDate(date) {
        const dia = date.split('-')[2];
        const mes = date.split('-')[1];
        return `${dia}-${mes}`;
    }
    function handleModal(i) {
        setOpen(true);
        setId(i);
    }
    function handleClose() {
        setOpen(false);
    }
    function handleDate(d) {
        setDate2(d);
    }

    async function onSubmit() {
        const conclusao = format(date2, 'yyyy-MM-dd', { locale: pt });
        try {
            await api.put(`plan/${id}`, {
                conclusao,
            });
            toast.success('Ação finalizada com sucesso');
        } catch (err) {
            toast.error('Falha na finalização da ação');
        }
        setOpen(false);
        history.push('/');
    }

    return (
        <Container>
            <header>
                <button type="button">
                    <MdReply size={40} color="#000" />
                </button>
                <strong>Plano de ação</strong>
            </header>
            <TableDiv>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.head}>
                                    STATUS
                                </TableCell>
                                <TableCell className={classes.head}>
                                    AUDITOR
                                </TableCell>
                                <TableCell className={classes.head}>
                                    ITEM
                                </TableCell>
                                <TableCell className={classes.head}>
                                    SETOR
                                </TableCell>
                                <TableCell className={classes.head}>
                                    MÁQUINA
                                </TableCell>
                                <TableCell className={classes.head}>
                                    PROBLEMA
                                </TableCell>
                                <TableCell className={classes.head}>
                                    AÇÃO
                                </TableCell>
                                <TableCell className={classes.head}>
                                    RESPONSAVEL
                                </TableCell>
                                <TableCell className={classes.head}>
                                    DATA INICIO
                                </TableCell>
                                <TableCell className={classes.head}>
                                    TERMINO PREVISTO
                                </TableCell>
                                <TableCell className={classes.head}>
                                    FOTO
                                </TableCell>
                                <TableCell className={classes.head}>
                                    CONCLUSÃO
                                </TableCell>
                                <TableCell className={classes.head}>
                                    ALTERAR
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {plano3.map(p => (
                                <TableRow>
                                    {p.status === 'Atrasado' ? (
                                        <TableCell className={classes.red}>
                                            R
                                        </TableCell>
                                    ) : p.status === 'Em andamento' ? (
                                        <TableCell className={classes.orange}>
                                            Y
                                        </TableCell>
                                    ) : p.status === 'Realizado' ? (
                                        <TableCell className={classes.green}>
                                            G
                                        </TableCell>
                                    ) : (
                                        ''
                                    )}
                                    <TableCell>{p.auditoria.auditor}</TableCell>
                                    <TableCell>{p.question.text}</TableCell>
                                    <TableCell>{p.setor}</TableCell>
                                    <TableCell>{p.maquina}</TableCell>
                                    <TableCell>{p.problema}</TableCell>
                                    <TableCell>{p.acao}</TableCell>
                                    <TableCell>{p.responsavel}</TableCell>
                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        className={classes.modal}
                                        open={open}
                                        onClose={handleClose}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={open}>
                                            <form
                                                autoComplete="off"
                                                className={classes.root}
                                                onSubmit={handleSubmit(
                                                    onSubmit
                                                )}
                                            >
                                                <div className={classes.paper}>
                                                    <MuiPickersUtilsProvider
                                                        utils={DateFnsUtils}
                                                    >
                                                        <FormHelperText
                                                            className={
                                                                classes.text
                                                            }
                                                        />

                                                        <KeyboardDatePicker
                                                            className={
                                                                classes.data
                                                            }
                                                            disableToolbar
                                                            variant="outlined"
                                                            format="dd-MM-yyyy"
                                                            label="DATA LIMITE"
                                                            id="date-picker-inline"
                                                            inputRef={register}
                                                            name="date"
                                                            value={date2}
                                                            onChange={
                                                                handleDate
                                                            }
                                                            KeyboardButtonProps={{
                                                                'arial-label':
                                                                    'change date',
                                                            }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                    <Button
                                                        variant="outlined"
                                                        color="primary"
                                                        size="large"
                                                        type="submit"
                                                        className={classes.btn}
                                                    >
                                                        FINALIZAR
                                                    </Button>
                                                </div>
                                            </form>
                                        </Fade>
                                    </Modal>
                                    <TableCell>{formatDate(p.data)}</TableCell>
                                    <TableCell>{formatDate(p.prazo)}</TableCell>

                                    <TableCell>
                                        {p.file.id !== 1 ? (
                                            <a
                                                href={p.file.url}
                                                target="_blank"
                                            >
                                                <Button
                                                    variant="outlined"
                                                    className={
                                                        classes.extendedIcon
                                                    }
                                                    startIcon={<PhotoCamera />}
                                                >
                                                    {' '}
                                                    VER{' '}
                                                </Button>
                                            </a>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                className={classes.extendedIcon}
                                                startIcon={<Cancel />}
                                            >
                                                {' '}
                                                NENHUMA{' '}
                                            </Button>
                                        )}
                                    </TableCell>
                                    {p.realizado ? (
                                        <TableCell>
                                            <Fab
                                                onClick={() =>
                                                    handleModal(p.id)
                                                }
                                                variant="extended"
                                            >
                                                <CheckIcon
                                                    className={
                                                        classes.extendedIcon
                                                    }
                                                />
                                                Finalizar
                                            </Fab>
                                        </TableCell>
                                    ) : (
                                        <TableCell>
                                            {formatDate(p.conclusao)}
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className={classes.extendedIcon}
                                            startIcon={<CreateIcon />}
                                            onClick={() =>
                                                history.push(
                                                    `update-plan/${p.id}`
                                                )
                                            }
                                        >
                                            {' '}
                                            EDITAR{' '}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TableDiv>
        </Container>
    );
}
Plano.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Plano);
