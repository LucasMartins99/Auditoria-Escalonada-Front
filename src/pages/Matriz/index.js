/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useMemo } from 'react';
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
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {
    FormControl,
    FormHelperText,
    Select,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import { Container, TableDiv } from './styles';
import api from '~/services/api';

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

function Matriz(props) {
    const { classes } = props;
    const [auditor, setAuditor] = useState('Todos');
    const [user, setUser] = useState([]);
    const [auditoria, setAuditoria] = useState([]);
    const [auditoria2, setAuditoria2] = useState([]);
    const [auditoria3, setAuditoria3] = useState([]);
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
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
    }, [auditor, auditoria]);
    useEffect(() => {
        if (auditor === 'Todos') {
            setAuditoria2(auditoria);
        }
    }, [auditor, auditoria]);

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

    const handleAuditor = event => {
        setAuditor(event.target.value);
    };
    function handleNextMonth() {
        setDate(addMonths(date, 1));
        setAuditor('Todos');
    }
    function handlePrevMonth() {
        setDate(subMonths(date, 1));
        setAuditor('Todos');
    }
    function handleNextYear() {
        setDate2(addYears(date2, 1));
        setAuditor('Todos');
    }
    function handlePrevYear() {
        setDate2(subYears(date2, 1));
        setAuditor('Todos');
    }
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
                                    SEMANA
                                </TableCell>
                                <TableCell className={classes.head}>
                                    AUDITOR
                                </TableCell>
                                <TableCell className={classes.head}>
                                    LOCAL
                                </TableCell>

                                <TableCell className={classes.head}>
                                    ALTERAR
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {auditoria3.map(a => (
                                <TableRow key={a.id}>
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
                                    <TableCell>{a.semana}</TableCell>
                                    <TableCell>{a.auditor}</TableCell>
                                    <TableCell>{a.setor}</TableCell>
                                    <TableCell>
                                        {' '}
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className={classes.extendedIcon}
                                            startIcon={<CreateIcon />}
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
Matriz.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Matriz);
