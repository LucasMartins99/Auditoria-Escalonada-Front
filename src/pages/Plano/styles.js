import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import media from 'styled-media-query';

export const Container = styled.div`
    min-height: 548px;
    display: flex;
    flex-direction: column;
    ${media.lessThan('medium')`
    width: 180%;
    `}
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
            font-size: 30px;
            margin: 0 10px;
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
