import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right bottom, var(--primary-color), var(--third-color));
  padding: 4px;
`;

export const AvatarImage = styled.img`
  border:4px solid var(--third-background);
  object-fit: cover;
`;