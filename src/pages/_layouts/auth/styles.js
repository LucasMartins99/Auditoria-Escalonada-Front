/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
    height: 100%;
    background: linear-gradient(-90deg, red, black);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Content = styled.div`
    img {
        height: 200px;
        width: 300px;
    }
    width: 100%;
    max-width: 315px;
    text-align: center;

    form {
        display: flex;
        flex-direction: column;
        input {
            background: rgb(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
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
    }
`;
