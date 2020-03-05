import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import media from 'styled-media-query';

export const Container = styled.div`
    max-width: 1100px;
    ${media.lessThan('medium')`
    max-width:700px;
`}
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

export const Center = styled.ul`
    display: flex;
    align-self: center;
    align-items: center;
    padding-top: 30px;
`;
