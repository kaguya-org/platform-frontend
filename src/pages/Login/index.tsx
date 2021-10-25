import { Header } from '../../components/Header';
import { Button } from '../../components/HtmlPartials/Button';
import { Input } from '../../components/HtmlPartials/Input';
import { FaLock, FaUser } from 'react-icons/all';
import { Link } from 'react-router-dom';

import {
  Container,
  Content,
  FormTag
} from './styles';

export function Login() {
  return (
    <Container>
      <Header />
      <Content>
        <div>
          <span>Login</span>
          <Link to="/register">Register</Link>
        </div>
        <section>
          <h1>Logar na plataforma</h1>
          <FormTag>
            <div>
              <Input 
                name="email" 
                title="E-mail"
                icon={<FaUser/>}
              />
              <Input 
                name="password" 
                title="Senha" 
                type="password"
                icon={<FaLock />}
              />
            <span className="forgot_password">Esqueceu a senha? 
              <button>Redefina agora</button>
            </span>
            </div>
            <Button>Entrar</Button>
          </FormTag>
        </section>
      </Content>
    </Container>
  );
}