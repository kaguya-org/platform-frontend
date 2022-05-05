import { BACKGROUND, SHADOW_COLORS } from '@/theme';
import styled, { css, keyframes } from 'styled-components';

export const Overlay = styled.main`
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translate3d(0, -10%, 0);
    }

    100% {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
`

const fadeOut = keyframes`
    0% {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
    
    100% {
        transform: translate3d(0, -10%, 0);
        opacity: 0;
    }
`

type ContainerProps = {
    fadeout: boolean;
}

export const Container = styled.section<ContainerProps>`
    z-index: 3;
    box-shadow: 0 0 10px 5px ${SHADOW_COLORS.BLACK_OPACITY_10};
    animation: ${fadeIn} 0.15s ease-out;
    transform: translate3d(0, 0, 0);
    ${(props) => props.fadeout && css`
        animation: ${fadeOut} 0.15s ease-out;
        transform: translate3d(0, -10%, 0);
        opacity: 0;
    `}
    position: absolute;
    right: 0;
    top: calc(100% + 5px);

    background-color: ${BACKGROUND.SECONDARY};
    padding: 20px;
    font-size: 2rem;
    border-radius: 5px;
`;