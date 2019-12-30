import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Container = styled.div`
    max-width: 650px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`;

export const TableDiv = styled.div`
    width: 93%;
    font-size: 18.4px;
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
