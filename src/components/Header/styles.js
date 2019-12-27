import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.header`
    background: #000;
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Content = styled.div`
    height: 64px;
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    nav {
        display: flex;
        align-items: center;
    }
    li {
        float: left;
        padding: 0 35px;
        &:hover {
            background-color: grey;
            border-radius: 3px;
        }
    }
    a {
        color: #fff;
        font-size: 25px;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
    }
`;
