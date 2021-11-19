import styled, { css } from 'styled-components';

type ContainerProps = {
  isLoading?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  ${(props) => props.isLoading && css`
    align-items: center;
    justify-content: center;
    height: 100%;
  `};
`;
