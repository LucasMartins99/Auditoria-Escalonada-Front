/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import media from 'styled-media-query';

export const Wrapper = styled.div`
    height: 100%;

    ${media.lessThan('medium')`
    min-width: 900px;
    min-height:1200px;
    `}
    background: linear-gradient(-90deg, white, grey);
`;
