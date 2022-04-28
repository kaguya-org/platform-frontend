import { COLORS } from '@/theme';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(to right bottom, ${COLORS.SECONDARY}, ${COLORS.TERTIARY});
  padding: 0.4rem;
  border-radius: 50%;

  width: min-content;
`;

type AvatarImageProps ={
  size: number;
}

export const AvatarImage = styled.img<AvatarImageProps>`
  border: 0.4rem solid var(--third-background);

  width: ${props => `${props.size}rem`};
  height: ${props => `${props.size}rem`};

  object-fit: cover;

  border-radius: 50%;
`;