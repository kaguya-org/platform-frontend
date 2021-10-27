import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FaLock, FaUser } from 'react-icons/all';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import { 
  Header, 
  Button, 
  Input,
  Loading
} from '../../components';

import { LoginParams } from '../../services/apiParams';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/useAuth';

import {
  Container,
  Content,
  FormTag
} from './styles';
import { useLoading } from '../../hooks/useLoading';

export function Login() {
  const history = useHistory();
  const loginFormRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const loading = useLoading(false);

  async function handleSubmitLogin(data: LoginParams) {
    loading.startLoading();

    try {
      loginFormRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('Email obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });
      
      await schema.validate(data, {
        abortEarly: false
      });

      await signIn(data);

      loading.stopLoading();

      history.push('/dashboard');

    } catch(error) {
      loading.stopLoading();

      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        
        loginFormRef.current?.setErrors(errors);

        return;
      }

      loginFormRef.current?.setErrors({
        email: 'Cheque as credenciais'
      });
    }
  };
  
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
          <FormTag ref={loginFormRef} onSubmit={handleSubmitLogin}>
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
            <Button type="submit" disabled={loading.state} >
              {loading.state 
                ? <Loading type="circle"/> 
                : 'Entrar'
              }
            </Button>
          </FormTag>
        </section>
      </Content>
    </Container>
  );
}
