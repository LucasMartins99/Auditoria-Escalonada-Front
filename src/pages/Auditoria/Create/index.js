import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdDone, MdReply } from 'react-icons/md';
import { Container, TableDiv } from './styles';
import api from '~/services/api';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import history from '~/services/history';

import * as CartActions from '~/store/modules/auditoria/actions';

class Auditoria extends Component {
    state = {
        questions: [],
    };
    async componentDidMount() {
        const response = await api.get('all-questions');
        this.setState({ questions: response.data });
        const data = response.data.map(question => ({
            ...question,
        }));
        this.setState({ questions: data });
    }
    handleAddAction = id => {
        const { addToQuestionRequest } = this.props;
        addToQuestionRequest(id);
    };
    handleRemoveAction = id => {
        const { removeFromQuestion } = this.props;
        removeFromQuestion(id);
    };
         render() {

        const { questions } = this.state;
        function handleBack() {
            history.push('/main');
        }

        function handleNext(){
            history.push('/create-plano')
        }

        return (
            <Container>
                <header>
                <button type="button" onClick={handleBack}>
                        <MdReply size={40} color="#000" />
                    </button>
                    <strong>Formulario Auditoria</strong>
                    <button type="button" onClick={handleNext}>
                        <MdDone size={40} color="#000" />
                    </button>
                </header>
                <TableDiv>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr first>
                                <th>ITEM</th>

                                <th>PERGUNTAS</th>

                                <th>RESPOSTA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map(question => (
                                <tr>
                                    <td>{question.item}</td>
                                    <td>{question.text}</td>
                                    <td>
                                        <ButtonGroup
                                            className="mr-2"
                                            arial-label="First group"
                                        >
                                            <Button
                                                onClick={() =>
                                                    this.handleRemoveAction(
                                                        question.id
                                                    )
                                                }
                                                variant="outline-primary"
                                            >
                                                OK
                                            </Button>

                                            <Button
                                                onClick={() =>
                                                    this.handleAddAction(
                                                        question.id
                                                    )
                                                }
                                                variant="outline-danger"
                                            >
                                                NOK
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableDiv>
            </Container>
        );
    }
}
const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);
export default connect(null, mapDispatchToProps)(Auditoria);
