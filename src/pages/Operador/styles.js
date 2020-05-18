import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Container = styled.div`
    background: linear-gradient(-90deg, white, grey);
    display: flex;
    flex-direction: column;

    button {
        border: 0;
        background: none;
    }

    header {
        display: flex;
        align-self: initial;
        align-items: center;
        justify-content: space-between;
        color: #000;
        font-size: 32px;
        margin: 0 10px;
        p {
            font-size: 15px;
            padding: 3px;
        }
        div.legenda {
            border-style: ridge;
            border-radius: 10px;

            border-color: white;
        }
    }
`;

export const TableDiv = styled.div`
    padding-top: 30px;

    td {
        text-align: center;
    }
    th {
        text-align: center;
    }
    .a {
        padding-top: 60px;
        font-size: 20px;
    }
`;
