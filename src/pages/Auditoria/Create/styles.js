import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Container = styled.div`
    max-width: 650px;
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
    tr {
        display: flex;
    }
    td {
        justify-content: space-between;
        justify-items: center;
        align-items: center;
    }
    th {
        width: 200px;
        text-align: center;
    }

    thead > tr {
        position: relative;
        display: block;
    }
    tbody {
        display: block;
        height: 400px;
        overflow: auto;
    }
`;
