/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable func-names */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import Table from '@material-ui/core/Table';
import {
    isBefore,
    getISOWeek,
    format,
    startOfMonth,
    endOfMonth,
    addMonths,
    subMonths,
    addYears,
    subYears,
} from 'date-fns';
import CreateIcon from '@material-ui/icons/Create';

import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Select from '@material-ui/core/Select';
import TableCell from '@material-ui/core/TableCell';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { FormControl, FormHelperText } from '@material-ui/core';
import api from '~/services/api';
import history from '~/services/history';
import { Container, TableDiv } from './styles';

const styles = theme => ({
    head: {
        backgroundColor: '#000',
        color: '#FFF',
        position: 'sticky',
        top: 0,
    },
    container: {
        maxHeight: 470,
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
    select: {
        marginLeft: 80,
    },
    btn: {
        marginLeft: 80,
        border: 1,
    },
    formControl: {
        margin: theme.spacing(1),
    },
    text: {
        marginLeft: 85,
        fontSize: 19,
        margin: 8,
    },
});

function Auditoria(props) {
    const { classes } = props;
    const [auditoria, setAuditoria] = useState([]);
    const [auditoria2, setAuditoria2] = useState([]);
    const [auditoria3, setAuditoria3] = useState([]);
    const [auditor, setAuditor] = useState('Todos');
    const [user, setUser] = useState([]);
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [cargo, setCargo] = useState('Todos');
    const [setor, setSetor] = useState('Todos');
    const dateFormatted = useMemo(() => format(date, 'MMMM', { locale: pt }), [
        date,
    ]);
    const dateFormatted2 = useMemo(
        () => format(date2, 'yyyy', { locale: pt }),
        [date2]
    );
    const actualWeek = getISOWeek(new Date());
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);
    const firstWeek = getISOWeek(firstDay);
    const lastWeek = getISOWeek(lastDay);

    useEffect(() => {
        async function loadAuditoria() {
            const response = await api.get('auditoria-mes', {
                params: { firstWeek, lastWeek, date2 },
            });
            const data = response.data.map(a => {
                return {
                    late: isBefore(new Date(a.semana), new Date(actualWeek)),
                    realizado: Object.is(a.status, 'Realizado'),
                    ...a,
                };
            });

            setAuditoria(data);
            setAuditoria2(data);
        }
        loadAuditoria();
    }, [actualWeek, firstWeek, lastWeek, date2]);

    useEffect(() => {
        if (auditor !== 'Todos') {
            const auditorFilter = auditoria.filter(x => x.auditor === auditor);
            setAuditoria2(auditorFilter);
        }
    }, [auditor]);
    useEffect(() => {
        if (setor !== 'Todos') {
            const setorFilter = auditoria.filter(x => x.setor === setor);
            setAuditoria2(setorFilter);
        }
    }, [setor]);
    useEffect(() => {
        if (cargo !== 'Todos') {
            const cargoFilter = auditoria.filter(x => x.cargo === cargo);
            setAuditoria2(cargoFilter);
        }
    }, [cargo]);
    useEffect(() => {
        if (cargo === 'Todos' && setor === 'Todos' && auditor === 'Todos') {
            setAuditoria2(auditoria);
        }
    }, [cargo, auditor, setor]);

    useEffect(() => {
        const data = auditoria2.map(a => {
            return {
                ...a,
                aux: a.realizado
                    ? 'Realizado'
                    : a.late && !a.realizado
                    ? 'Atrasado'
                    : !a.late && !a.realizado
                    ? 'Planejado'
                    : '',
                disabled:
                    a.cargo === 'Engenharia Processo'
                        ? true
                        : a.cargo === 'Analista Qualidade'
                        ? true
                        : a.cargo === 'Supervisor Produção',
            };
        });
        setAuditoria3(data);
    }, [auditoria2]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/users');
            const data = response.data.map(a => ({
                ...a,
            }));
            setUser(data);
        }
        loadUsers();
    }, []);

    function handleNextMonth() {
        setDate(addMonths(date, 1));
        setAuditor('Todos');
        setCargo('Todos');
    }
    function handlePrevMonth() {
        setDate(subMonths(date, 1));
        setAuditor('Todos');
        setCargo('Todos');
    }
    function handleNextYear() {
        setDate2(addYears(date2, 1));
        setAuditor('Todos');
        setCargo('Todos');
    }
    function handlePrevYear() {
        setDate2(subYears(date2, 1));
        setAuditor('Todos');
        setCargo('Todos');
    }

    function formatDate(d) {
        const dia = d.split('-')[2];
        const mes = d.split('-')[1];
        return `${dia}-${mes}`;
    }
    const handleAuditor = event => {
        setAuditor(event.target.value);
        setCargo('Todos');
        setSetor('Todos');
    };
    const handleCargo = event => {
        setCargo(event.target.value);
        setAuditor('Todos');
        setSetor('Todos');
    };
    const handleSetor = event => {
        setSetor(event.target.value);
        setAuditor('Todos');
        setCargo('Todos');
    };

    return (
        <Container>
            <header>
                <button type="button" onClick={handlePrevMonth}>
                    <MdChevronLeft size={36} color="#000" />
                </button>
                <strong>{dateFormatted}</strong>
                <button type="button" onClick={handleNextMonth}>
                    <MdChevronRight size={36} color="#000" />
                </button>
                <button type="button" onClick={handlePrevYear}>
                    <MdChevronLeft size={36} color="#000" />
                </button>
                <strong>{dateFormatted2}</strong>
                <button type="button" onClick={handleNextYear}>
                    <MdChevronRight size={36} color="#000" />
                </button>
                <FormControl variant="outlined" className={classes.FormControl}>
                    <FormHelperText className={classes.text}>
                        AUDITORES:
                    </FormHelperText>
                    <Select
                        className={classes.select}
                        native
                        value={auditor}
                        onChange={handleAuditor}
                    >
                        <option selected value="Todos">
                            Todos
                        </option>
                        {user.map(u => (
                            <option key={u.name} value={u.name}>
                                {u.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" className={classes.FormControl}>
                    <FormHelperText className={classes.text}>
                        SETOR:
                    </FormHelperText>
                    <Select
                        className={classes.select}
                        native
                        value={setor}
                        onChange={handleSetor}
                    >
                        <option value="Todos">Todos</option>
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
                <FormControl variant="outlined" className={classes.FormControl}>
                    <FormHelperText className={classes.text}>
                        CARGO:
                    </FormHelperText>
                    <Select
                        className={classes.select}
                        native
                        value={cargo}
                        onChange={handleCargo}
                    >
                        <option value="Todos">Todos</option>
                        <option value="Plant Manager">Plant Manager</option>
                        <option value="Gerente Qualidade">
                            Gerente Qualidade
                        </option>
                        <option value="Coordenador Produção">
                            Coordenador Produção
                        </option>
                        <option value="Analista Qualidade">
                            Analista Qualidade
                        </option>
                        <option value="Supervisor Produção">
                            Supervisor Produção
                        </option>
                        <option value=" Engenharia Processo">
                            Engenharia Processo
                        </option>
                    </Select>
                </FormControl>
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
                                    SETOR
                                </TableCell>
                                <TableCell className={classes.head}>
                                    SEMANA
                                </TableCell>
                                <TableCell className={classes.head}>
                                    AUDITOR
                                </TableCell>
                                <TableCell className={classes.head}>
                                    CONCLUSÃO
                                </TableCell>
                                <TableCell className={classes.head}>
                                    OBSERVAÇÃO
                                </TableCell>
                                <TableCell className={classes.head}>
                                    ALTERAR
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {auditoria3.map(a => (
                                <TableRow>
                                    {a.aux === 'Planejado' ? (
                                        <TableCell className={classes.orange}>
                                            Planejado
                                        </TableCell>
                                    ) : a.aux === 'Realizado' ? (
                                        <TableCell className={classes.green}>
                                            Realizado
                                        </TableCell>
                                    ) : a.aux === 'Atrasado' ? (
                                        <TableCell className={classes.red}>
                                            Atrasado
                                        </TableCell>
                                    ) : (
                                        ''
                                    )}
                                    <TableCell>{a.setor}</TableCell>
                                    <TableCell>{a.semana}</TableCell>
                                    <TableCell>{a.auditor}</TableCell>

                                    {a.status === 'Realizado' ? (
                                        <TableCell>
                                            {formatDate(a.data)}
                                        </TableCell>
                                    ) : (
                                        <TableCell />
                                    )}
                                    <TableCell>{a.obs}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            disabled={a.disabled}
                                            className={classes.extendedIcon}
                                            startIcon={<CreateIcon />}
                                            onClick={() =>
                                                history.push(
                                                    `new-auditoria/${a.id}`
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
Auditoria.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Auditoria);
