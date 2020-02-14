/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import PropTypes from 'prop-types';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { addOperadorRequest } from '~/store/modules/operador/actions';

const styles = theme => ({
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
        marginLeft: 30,
        marginTop: 7,
    },
});
function ModalForm(props) {
    const { classes, data, semana, turno } = props;
    const [open, setOpen] = useState(true);
    const [name, setName] = useState('');
    const [re, setRe] = useState('');
    const setor = useSelector(state => state.user.profile.area);
    const cargo = useSelector(state => state.user.profile.cargo);

    const handleName = event => {
        setName(event.target.value);
    };
    const handleRe = event => {
        setRe(event.target.value);
    };
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(
            addOperadorRequest(name, turno, data, semana, setor, cargo, re)
        );
        setOpen(false);
    };
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            disableEnforceFocus
            open={open}
            onClose={handleClose}
            closeAfterTransition
            disableBackdropClick
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <form autoComplete="off">
                    <div className={classes.paper}>
                        <TextField
                            value={name}
                            name="name"
                            variant="outlined"
                            placeholder="Nome"
                            onChange={handleName}
                        />
                        <TextField
                            type="number"
                            value={re}
                            name="re"
                            variant="outlined"
                            placeholder="RE"
                            onChange={handleRe}
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            size="large"
                            type="button"
                            className={classes.btn}
                            onClick={handleClose}
                        >
                            CONFIRMAR
                        </Button>
                    </div>
                </form>
            </Fade>
        </Modal>
    );
}
ModalForm.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ModalForm);
