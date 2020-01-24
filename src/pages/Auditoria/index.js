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
} from 'date-fns';
import CreateIcon from '@material-ui/icons/Create';
import AddCircle from '@material-ui/icons/AddCircle';
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
        minWidth: 120,
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
    const [auditor, setAuditor] = useState(['Todos']);
    const [date, setDate] = useState(new Date());

    const dateFormatted = useMemo(() => format(date, 'MMMM', { locale: pt }), [
        date,
    ]);
    const actualWeek = getISOWeek(new Date());
    const firstDay = startOfMonth(date);
    const lastDay = endOfMonth(date);
    const firstWeek = getISOWeek(firstDay);
    const lastWeek = getISOWeek(lastDay);

    useEffect(() => {
        async function loadAuditoria() {
            const response = await api.get('auditoria-mes', {
                params: { firstWeek, lastWeek },
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
    }, [actualWeek, firstWeek, lastWeek]);

    useEffect(() => {
        if (auditor === 'Todos') {
            setAuditoria2(auditoria);
        } else {
            const auditoriaFilter = auditoria.filter(
                x => x.auditor === auditor
            );
            setAuditoria2(auditoriaFilter);
        }
    }, [auditor]);
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

    function handleNextMonth() {
        setDate(addMonths(date, 1));
        setAuditor('Todos');
    }
    function handlePrevMonth() {
        setDate(subMonths(date, 1));
        setAuditor('Todos');
    }

    function formatDate(d) {
        const dia = d.split('-')[2];
        const mes = d.split('-')[1];
        return `${dia}-${mes}`;
    }
    const handleAuditor = event => {
        setAuditor(event.target.value);
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
                        <option value="Todos">Todos</option>
                        <option value="Fabio">Fabio</option>
                        <option value="Jose">Jose</option>
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
                                <TableCell className={classes.head}>
                                    CADASTRAR
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
                                            className={classes.extendedIcon}
                                            startIcon={<CreateIcon />}
                                        >
                                            {' '}
                                            EDITAR{' '}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            className={classes.extendedIcon}
                                            startIcon={<AddCircle />}
                                        >
                                            {' '}
                                            CRIAR AUDITORIA{' '}
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
