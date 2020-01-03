import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 750px;
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
`;

export const Center = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
    list-style: none;
    padding-top: 30px;
`;
export const Card = styled.div`
    background: #fff;
    border-radius: 4px;
    form {
        display: flex;
        flex-direction: column;
        background: #fff;
        border-radius: 4px;
        padding: 10px;
        input {
            background: grey;
            border: 0;
            border-radius: 4px;
            height: 40px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        select {
            background: grey;

            border-radius: 4px;
            height: 40px;
            padding: 0 17px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: #fff;
            }
        }
        span {
            color: red;
            margin: 0 0 10px;
            align-self: flex-start;
            font-weight: bold;
        }
        button {
            margin: 5px 0 0;
            height: 44px;
            background: #3b9eff;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 16px;
            transition: background 0.2;
            &:hover {
                background: ${darken(0.03, '#3b9eff')};
            }
        }
        a {
            color: #000;
            padding: 20px;
            font-size: 17px;
            opacity: 0.8;
        }
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
