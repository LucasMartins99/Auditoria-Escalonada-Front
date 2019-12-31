import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    padding: 40px;
    background: #fff;
    border-radius: 4px;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        input {
            background: grey;
            border-radius: 3px;
            height: 40px;
            padding: 20px;
            color: #fff;
            margin: 0 0 10px;
            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }
        }

        select {
            background: grey;
            border-radius: 3px;
            height: 44px;
            padding: 0 15px;
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
            border-radius: 3px;
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
`;
