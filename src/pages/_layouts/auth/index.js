import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Content } from './styles';

// eslint-disable-next-line react/prop-types
export default function AuthLayout({ children }) {
    return (
        <Wrapper>
            <Content>{children}</Content>
        </Wrapper>
    );
}

AuthLayout.prototype = {
    children: PropTypes.element.isRequired,
};
