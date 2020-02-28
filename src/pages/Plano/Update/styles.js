import styled from 'styled-components';

export const Container = styled.div`
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
            color: #fff;
            font-size: 40px;
            margin: 0 15px;
        }
    }
`;

export const Center = styled.ul`
    display: flex;
    align-self: center;
    align-items: center;
    padding-top: 30px;
`;
