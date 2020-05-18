/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
    background: -webkit-linear-gradient(-70deg, white, grey);

    ${media.lessThan('medium')`
    min-width: 900px;
    min-height:1200px;
    height: 100%;
    background: linear-gradient(-90deg, white, grey);
    `}
    ${media.lessThan('small')`
        height: 100%;
        background-color: -webkit-linear-gradient(-70deg, white, grey);
     `}
`;
export const Fixed = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
`;
export const Footer = styled.footer`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
`;
export const Texto = styled.p`
    color: #fff;
    font-size: 23px;
`;
