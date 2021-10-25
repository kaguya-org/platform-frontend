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

export function Register() {
  return (
    <Container>
      <Header />
      <Content>
        <div>
          <Link to="/login">Login</Link>
          <span>Register</span>
        </div>
        <section>
          <h1>Criar conta</h1>
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
              <Input 
                name="repeat_password" 
                title="Repetir senha" 
                type="password"
                icon={<FaLock />}
              />
              <label htmlFor="terms_input" className="terms">
                <input id="terms_input" type="checkbox" /> 
                Aceitar os termos de uso
              </label>
            </div>
            <Button>Criar</Button>
          </FormTag>
        </section>
      </Content>
    </Container>
  );
}