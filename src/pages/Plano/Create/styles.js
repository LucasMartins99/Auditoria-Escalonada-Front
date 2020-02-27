import styled from 'styled-components';
import { darken } from 'polished';

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
    max-width: 243px;
    border-radius: 5px;

    form {
        display: flex;
        flex-direction: column;
        background: #cbfcb2;
        border-radius: 5px;
        padding: 10px;
    }
    fieldset {
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        padding: 10px;
    }

    .avatar {
        display: inline-block;
        background: linear-gradient(top, #f9f9f9, #e3e3e3);
        border: 1px solid #999;
        border-radius: 3px;
        padding: 5px 7px;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        text-shadow: 1px 1px #fff;
        font-weight: 700;
        font-size: 10pt;
        max-width: 210px;
    }
    .button {
        height: 34px;
        background: #3b9eff;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 20px;
        transition: background 0.2;
        width: 203px;
        &:hover {
            background: ${darken(0.03, '#3b9eff')};
        }
    }
    .button2 {
        height: 32px;
        background: orange;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 18px;

        width: 203px;
    }
    span {
        color: black;
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
