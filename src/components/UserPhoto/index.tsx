import React from 'react';

import { 
  Container,
  AvatarImage
} from './styles';

import AVATAR_DEFAULT from '../../assets/images/default_avatar.png';

export type UserPhotoProps = {
  imageUri?: string | null;
  size: number;
  css?: {
    container?: React.CSSProperties;
    avatar?: React.CSSProperties;
  }
}

export function UserPhoto({
  imageUri, 
  size, 
  css
}: UserPhotoProps) {

  return (
    <Container
      style={css?.container}
      className="user_photo"
    >
      <AvatarImage
        size={size} 
        src={imageUri || AVATAR_DEFAULT} 
        style={css?.container}
      />
    </Container>
  );
}