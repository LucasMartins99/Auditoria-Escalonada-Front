/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import Table from '@material-ui/core/Table';
import { isBefore, getISOWeek } from 'date-fns';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CreateIcon from '@material-ui/icons/Create';
import { withStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import { MdReply } from 'react-icons/md';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
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
});
function Plano(props) {
    const { classes } = props;
    const [plano, setPlano] = useState([]);
    const actualWeek = getISOWeek(new Date());
    useEffect(() => {
        async function loadPlano() {
            const response = await api.get('plan');
            const data = response.data.map(planos => {
                return {
                    ...planos,
                    late: isBefore(planos.prazo, actualWeek),
                    // eslint-disable-next-line no-prototype-builtins
                    realizado: planos.conclusao === null,
                };
            });

            setPlano(data);
        }
        loadPlano();
    }, [actualWeek]);

    function formatDate(date) {
        const dia = date.split('-')[2];
        const mes = date.split('-')[1];
        return `${dia}-${mes}`;
    }
    function hadleBack() {
        history.push('/main');
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
                                    ITEM
                                </TableCell>
                                <TableCell className={classes.head}>
                                    SETOR
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
                                    CONCLUSÃO
                                </TableCell>
                                <TableCell className={classes.head}>
                                    ALTERAR
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {plano.map(p => (
                                <TableRow>
                                    {p.late && p.realizado ? (
                                        <TableCell className={classes.red}>
                                            L
                                        </TableCell>
                                    ) : !p.realizado ? (
                                        <TableCell className={classes.green}>
                                            G
                                        </TableCell>
                                    ) : (
                                        <TableCell className={classes.orange}>
                                            Y
                                        </TableCell>
                                    )}
                                    <TableCell>{p.item}</TableCell>
                                    <TableCell>{p.setor}</TableCell>
                                    <TableCell>{p.problema}</TableCell>
                                    <TableCell>{p.acao}</TableCell>
                                    <TableCell>{p.responsavel}</TableCell>
                                    <TableCell>{formatDate(p.data)}</TableCell>
                                    <TableCell>{formatDate(p.prazo)}</TableCell>
                                    {p.realizado ? (
                                        <TableCell>
                                            <Fab
                                                onClick={hadleBack}
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
