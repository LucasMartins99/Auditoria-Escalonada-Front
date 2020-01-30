/* eslint-disable react/prop-types */
import React from 'react';
import { Container, Center } from './styles';
import Form from '../../../components/Form/index';

export default function NewAuditoria({ match }) {
    const { id } = match.params;

    return (
        <Container>
            <header>
                <strong>NOVA AUDITORIA</strong>
            </header>
            <Center>
                <Form id={id} />
            </Center>
        </Container>
    );
}
