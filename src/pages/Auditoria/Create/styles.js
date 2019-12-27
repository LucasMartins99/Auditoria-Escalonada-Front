import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
`;

export const AuditoriaTable = styled.table`
    width: 100%;
    tbody {
        overflow-y: scroll;
        height: 350px;
    }

    thead,
    tbody {
        display: block;
    }

    td {
        padding: 15px;
        width: 100%;
    }
    select {
        background: grey;
        border: 0;
        border-radius: 4px;
        height: 33px;
        padding: 0 7px;
        color: #fff;
        margin: 0 0 10px;

        &::placeholder {
            color: #fff;
        }
    }
`;
