import { Link } from 'react-router-dom';

import { UserPhoto } from '../';
import { useAuth } from '../../hooks/useAuth';

import * as S from './styles';

type UserProfileProps = {
  container?: React.HTMLAttributes<HTMLHeadingElement>;
  css?: S.CSSProfileType;
}

export function UserProfile({
  container,
  css
}: UserProfileProps) {
  const { user } = useAuth();

  return (
    <S.Container 
      className="profile" 
      {...container} 
      style={css?.container}
    >
      <S.Content>
        {user && (
          <span style={css?.name}>{user.name || user.username}</span>
        )}

        <UserPhoto
          imageUri={user?.avatar} 
          size={3.6}
          css={{
            container: {
              padding: '0.2rem',
            }
          }}
        />
      </S.Content>
    </S.Container>
  );
}