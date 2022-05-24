import { BACKGROUND, SHADOW_COLORS } from '@/theme';
import styled, { css, keyframes } from 'styled-components';


const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: translate3d(-50%, -50%, 0) scale(0.6);
    }

    80% {
        transform: translate3d(-50%, -50%, 0) scale(1.1);
    }

    100% {
        opacity: 1;
        transform: translate3d(-50%, -50%, 0) scale(1);
    }
`

const fadeOut = keyframes`
    0% {
        transform: translate3d(-50%, -50%, 0) scale(1);
        opacity: 1;
    }

    100% {
        transform: translate3d(-50%, -50%, 0) scale(.8);
        opacity: 0;
    }
`

type ContainerProps = {
    fadeOut: boolean;
}

export const Container = styled.section<ContainerProps>`
    z-index: 3;
    padding: 16px 20px;
    height: 80vh;

    overflow-y: auto;
    width: 80vw;
    box-shadow: 0 0 6px 5px ${SHADOW_COLORS.BLACK_OPACITY_10};
    animation: ${fadeIn} 0.2s ease-in-out;
    transform: translate3d(-50%, -50%, 0);

    ${(props) => props.fadeOut && css`
        animation: ${fadeOut} 0.1s ease-out;
        transform: translate3d(-50%, -50%, 0);
        opacity: 0;
    `}

    position: fixed;
    
    top: 50%;
    left: 50%;

    background-color: ${BACKGROUND.SECONDARY};
    font-size: 2rem;
    border-radius: 5px;
`;

