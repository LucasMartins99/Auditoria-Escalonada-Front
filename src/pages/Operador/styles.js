import styled from 'styled-components';

import 'bootstrap/dist/css/bootstrap.min.css';

export const Container = styled.div`
    max-width: 1305px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    button {
        border: 0;
        background: none;
    }

    header {
        display: flex;
        align-self: center;
        align-items: center;

        strong {
            color: #000;
            font-size: 25px;
            margin: 0 15px;
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
`;
