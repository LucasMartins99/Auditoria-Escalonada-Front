import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Footer, Texto, Fixed } from './styles';
import Header from '~/components/Header';

// eslint-disable-next-line react/prop-types
export default function DefaultLayout({ children }) {
    return (
        <Wrapper>
            <Header />
            {children}
            <Fixed>
                <Footer>
                    <Texto> EQUIPE DE DESENVOLVIMENTO SOGEFI GROUP </Texto>
                </Footer>
            </Fixed>
        </Wrapper>
    );
}

DefaultLayout.prototype = {
    children: PropTypes.element.isRequired,
};
