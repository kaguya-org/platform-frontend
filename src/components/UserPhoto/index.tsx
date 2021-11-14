import React from 'react';

import { 
  Container,
  AvatarImage
} from './styles';

import AVATAR_DEFAULT from '../../assets/images/eu.jpg';

export type UserPhotoProps = {
  imageUri: string | undefined;
  size: number;

  containerProps?: {
    style?: React.CSSProperties;
  };
  avatarProps?: {
    style?: React.CSSProperties;
  };
}

export function UserPhoto({
  imageUri, 
  size, 
  avatarProps, 
  containerProps,
}: UserPhotoProps) {

  return (
    <Container
      style={
        {
          ...containerProps?.style
        }
      }
    >
      <AvatarImage 
        src={imageUri || AVATAR_DEFAULT} 
        style={
          {
            width: `${size}px`,
            height: `${size}px`,
            ...avatarProps?.style,
          }
        }
        />
    </Container>
  );
}