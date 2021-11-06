import styled, { css } from 'styled-components';

type ContainerProps = {
  isLoading?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  ${(props) => props.isLoading && css`
    align-items: center;
    justify-content: center;
  `};
  height: 100%;
  width: 100%;
`;

export const Content = styled.main`
  display: flex;
  gap: 18px;

  width: 100%;
  margin: 64px;
`;
