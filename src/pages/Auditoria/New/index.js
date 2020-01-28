import React from 'react';
import { Container, Center } from './styles';
import Form from '../../../components/Form/index';

export default function NewAuditoria() {
    return (
        <Container>
            <header>
                <strong>NOVA AUDITORIA</strong>
            </header>
            <Center>
                <Form />
            </Center>
        </Container>
    );
}
