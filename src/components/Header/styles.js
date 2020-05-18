import styled from 'styled-components';
import media from 'styled-media-query';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled.header`
    background: #000;
    padding: 0 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    ${media.lessThan('medium')`
    min-width: 1300px;
    `}
    ${media.lessThan('small')`
    min-width: 100px;
    `}
`;
export const Content = styled.div`
    nav {
        display: flex;
        align-items: center;
    }
    li {
        float: left;
        padding: 15px;

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
