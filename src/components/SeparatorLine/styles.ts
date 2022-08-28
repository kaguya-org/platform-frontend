import { BACKGROUND, COLORS } from '@/theme'
import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    margin: 24px 0;
    width: 100%;
    > div {
        height: 2px;
        background: -webkit-gradient(linear,0 0,100% 0, from(${BACKGROUND.SECONDARY}), to(${BACKGROUND.SECONDARY}), color-stop(50%, ${BACKGROUND.QUATERNARY}));
    }
    span {
        position: absolute;
        top: 50%;
        left: 50%;
        padding: 0 20px;
        transform: translate(-50%, -50%);
        font-size: 14px;
        background-color: ${BACKGROUND.SECONDARY};
    }

`