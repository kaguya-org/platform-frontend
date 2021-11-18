import { Link, useHistory } from 'react-router-dom';
import {
  Container,
  Content
} from './styles';

export function Header() {
  const links = ['/']
  const history = useHistory();
  
  return (
    <Container>
      <Content>
        <h2>Slinked</h2>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/">Quem somos?</Link>
          <Link to="/">Sobre o projeto</Link>
          {links.includes(history.location.pathname) && (
            <Link to="/login" className="login animation-none">Login</Link>
          )}
        </nav>
      </Content>
    </Container>
  )
}