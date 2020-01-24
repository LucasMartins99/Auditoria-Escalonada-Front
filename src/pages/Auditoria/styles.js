import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Container = styled.div`
    max-width: 1100px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;

    header {
        display: flex;
        align-self: center;
        align-items: center;

        button {
            border: 0;
            background: none;
        }

        strong {
            color: #000;
            font-size: 35px;
            margin: 0 30px;
            border: 3px;
        }
    }
`;

export const TableDiv = styled.div`
    padding-top: 30px;
    font-size: 18.5px;

    td {
        text-align: center;
    }

    th {
        text-align: center;
    }
`;
