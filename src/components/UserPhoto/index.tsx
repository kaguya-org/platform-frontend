import React from 'react';

import { 
  Container,
  AvatarImage
} from './styles';

import AVATAR_DEFAULT from '../../assets/images/eu.jpg';

type Props = {
  imageUri: string | undefined;
  size?: {
    containerSize?: string;
    avatarSize?: string;
  };
}

export function UserPhoto({ imageUri, size }: Props){

  return (
    <Container
      style={
        {
          width: size?.containerSize,
          height: size?.containerSize,
          borderRadius: '50%',
        }
      }
    >
      <AvatarImage 
        src={imageUri || AVATAR_DEFAULT} 
        style={
          {
            width: size?.avatarSize,
            height: size?.avatarSize,
            borderRadius: '50%',
          }
        }
        />
    </Container>
  );
}