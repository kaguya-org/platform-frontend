import { Link } from 'react-router-dom';

import { UserPhoto } from '../';
import { useAuth } from '../../hooks/useAuth';

import { Container, CSSProfileType } from './styles';

type UserProfileProps = {
  container?: React.HTMLAttributes<HTMLHeadingElement>;
  css?: CSSProfileType;
}

export function UserProfile({
  container,
  css
}: UserProfileProps) {
  const { user } = useAuth();

  return (
    <Container 
      className="profile" 
      {...container} 
      style={css?.container}
    >
      <Link to="/profile" style={css?.link}>
        <span style={css?.name}>{user?.name || user?.username || 'Default name'}</span>

        <UserPhoto
          imageUri={user?.avatar} 
          size={3.6}
          css={{
            container: {
              padding: '0.2rem',
            }
          }}
        />
      </Link>
    </Container>
  )
}