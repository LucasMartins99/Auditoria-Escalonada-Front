import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdDone, MdReply } from 'react-icons/md';
import { Container, TableDiv } from './styles';
import api from '~/services/api';
import { Button, ButtonGroup, Table } from 'react-bootstrap';
import history from '~/services/history';
import { toast } from 'react-toastify';
import * as CartActions from '~/store/modules/auditoria/actions';
import ModalForm from '~/components/Modal/index';

class Auditoria extends Component {
    state = {
        questions: [],
        data2: '',
        semana: '',
        turno: '',
    };
    async componentDidMount() {
        const {match: {params}} = this.props;
        this.setState({data2: params.id});
        this.setState({semana: params.semana});
        this.setState({turno: params.turno});
        const response = await api.get('all-questions');
        this.setState({ questions: response.data });
        const data = response.data.map(question => {
            return {
                nClick: false,
                Click: false,
                ...question
            }
        })
        this.setState({ questions: data });
    }
    
     
    handleAddAction = id => {
        const { addToQuestionRequest } = this.props;
        const {questions}  = this.state;
        const {data2} = this.state;
        addToQuestionRequest(id);
        const aux = questions.filter(q => q.id === id).values();
        let i;
        for(let letter of aux){
         i = letter.id -1;
        }
        questions[i].nClick=true;
        questions[i].Click=true;
      
        const data = questions.map(q => ({
            ...q
        }));
        this.setState({questions: data});
    };

    handleRemoveAction = id => {
        const { removeFromQuestion } = this.props;
        const {questions}  = this.state;
        removeFromQuestion(id);
        const aux = questions.filter(q => q.id === id).values();
        let i;
        for(let letter of aux){
         i = letter.id -1;
        }
        questions[i].nClick=true;
        questions[i].Click=false;
      
        const data = questions.map(q => ({
            ...q
        }));
        this.setState({questions: data});
    };

     handleNext(){
        const { questions } = this.state;
        const {data2} = this.state;
        const aux = questions.find(q => q.nClick === false);
        
        if(aux !== undefined){
          toast.error('Favor realizar todos itens');
        }else {
            if(data2 !== undefined){
            history.push(`/create-plano-operador/${data2}`);
        }else{
            history.push('/create-plano/');
        }
        }     
     }
    
         render() {
        const { questions } = this.state;
        const {data2} = this.state;
        const {semana} = this.state;
        const {turno} = this.state;
        function handleBack() {
            history.push('/main');
        }

        return (
            <Container>
                <header>
                <button type="button" onClick={handleBack}>
                        <MdReply size={40} color="#000" />
                    </button>
                    <strong>Formulario Auditoria</strong>
                </header>
                {data2 !== undefined && <ModalForm data={data2} semana={semana} turno={turno} /> }
                <TableDiv>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr first>
                                <th>ITEM</th>

                                <th>PERGUNTAS</th>

                                <th>ESCOLHA</th>

                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map(question => (
                                <tr>
                                   
                                    <td>{question.area}</td>
                                    <td>{question.item} - {question.text}</td>
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
                                                variant="outline-success"
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
                                    <td>
                                    {!question.nClick ? (
                                        
                                        <h4>Escolha</h4>
                                    ) : question.Click ? (
                                        <Button variant="outline-danger">
                                            Item NOK
                                        </Button>
                                    ) : (
                                        <Button variant="outline-success">
                                            Item OK
                                        </Button>
                                    )}
                                   
                                    </td>
                                </tr>
                            ))}
                            
                            <tr>
                                <th scope="row"></th>
                                
                                <td colSpan="2">
                                <Button  onClick={() =>
                                                    this.handleNext()
                                                }>
                        <MdDone size={40} color="#000" />
                        ENVIAR AUDITORIA
                        </Button>
                        </td>
                        
                        </tr>
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