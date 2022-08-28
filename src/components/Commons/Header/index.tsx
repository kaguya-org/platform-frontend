import Lordicon from '@/components/ReactLordicon';
import { Link } from 'react-router-dom';
import {
  Container,
  Content
} from './styles';

export function Header() {  
  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <Lordicon size={50} icon='nightSky' colors={{
            primary: '#fff',
            secondary: '#a90f64'
          }} trigger='loop' delay={3000} />
          <h2>Kaguya</h2>
        </Link>

        <nav>
          {/* <Link to="/">Home</Link>
          <Link to="/">Quem somos?</Link>
          <Link to="/">Sobre o projeto</Link> */}
          {/* {links.includes(history.location.pathname) && (
            <Link to="/login" className="login animation-none">Login</Link>
          )} */}
        </nav>
      </Content>
    </Container>
  )
}