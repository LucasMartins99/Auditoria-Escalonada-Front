import styled from 'styled-components';
import media from 'styled-media-query';

export const Container = styled.div`
    min-height: 448px;
    max-width: 630px;
    ${media.lessThan('small')`
        height: 100%;
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
            font-size: 25px;
            margin: 0 15px;
        }
    }
    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 15px;
        margin-top: 30px;
    }
`;
export const Time = styled.li`
    padding: 20px;
    border-radius: 4px;
    background: #fff;
    strong {
        display: block;
        color: ${props => (props.atrasado ? 'red' : '#7159c1')};
        font-size: 24px;
        font-weight: normal;
    }
    div {
        display: flex;
        justify-content: flex-end;
    }
    opacity: ${props => (props.realizado ? 0.6 : 1)};
    p {
        color: ${props => (props.atrasado ? 'red' : 'black')};
        font-size: 18px;
        padding-top: 18px;
    }
    span {
        display: block;
        margin-top: 3px;
        color: ${props => (props.atrasado ? 'red' : 'black')};
        font-size: 23px;
        font-weight: 700;
    }
`;
