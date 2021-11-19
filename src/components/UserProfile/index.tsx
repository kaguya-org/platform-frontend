import { Link } from 'react-router-dom';

import { UserPhoto } from '../';
import { useAuth } from '../../hooks/useAuth';

import { Container } from './styles';

export function UserProfile() {
  const { user } = useAuth();
  return (
    <Container className="profile">
      <Link to="/profile">
        <span>{user?.name || 'Tiago Gonçalves'}</span>
        <UserPhoto
          imageUri={user?.avatar} 
          size={36}
          containerProps={{
            style: {
              padding: '2px'
            }
          }}
        />
      </Link>
    </Container>
  )
}