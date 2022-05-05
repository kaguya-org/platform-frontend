import styled from 'styled-components';

type NoContentProps = {
  fontSize?: string;
}
export const NoContent = styled.div<NoContentProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  flex: 1;
  align-items: center;
  span {
    font-size: ${({ fontSize }) => fontSize || '1.5rem'};
  }
`;
