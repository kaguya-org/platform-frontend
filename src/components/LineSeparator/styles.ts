import { BACKGROUND } from '@/theme'
import styled from 'styled-components'

export const Container = styled.div`
    position: relative;
    margin: 24px 0;

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