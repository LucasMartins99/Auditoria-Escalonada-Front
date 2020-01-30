import styled from 'styled-components';

export const Container = styled.div`
    padding-top: 30px;
    max-width: 750px;
    margin: 0px auto;
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
`;

export const Center = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 60px;
    list-style: none;
    padding-top: 50px;
`;
export const Card = styled.div`
    background: #fff;
    border-radius: 4px;
    max-width: 250px;

    form {
        display: flex;
        flex-direction: column;
        background: #fff;
        border-radius: 4px;
        padding: 10px;
    }
    span {
        color: red;
        margin: 0 0 10px;
        align-self: flex-start;
        font-weight: bold;
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
