import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px solid #a90f64;
  padding: 2px;
  border-radius: 50%;

  width: min-content;
`;

type AvatarImageProps ={
  size: number;
}

export const AvatarImage = styled.img<AvatarImageProps>`
  width: ${props => `${props.size}rem`};
  height: ${props => `${props.size}rem`};

  object-fit: cover;

  border-radius: 50%;
`;