import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FaLock, MdEmail } from 'react-icons/all';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { 
  Header, 
  Button, 
  Input,
  ContainerPage,
} from '../../components';

import { UserType } from '../../services/api';

import { getValidationErrors } from '../../utils/getValidationErrors';

import { useAuth } from '../../hooks/useAuth';
import { useBoolean } from '../../hooks/useBoolean';

import {
  Content,
  FormTag
} from './styles';

export function Login() {
  const page_navigate = useNavigate();

  const loginFormRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  
  const loading = useBoolean(false);

  async function handleSubmitLogin(data: UserType.LoginParams) {
    loading.changeToTrue();

    const schema = Yup.object().shape({
      email: Yup.string().email('E-mail inválido').required('Email obrigatório'),
      password: Yup.string().required('Senha obrigatória'),
    });
    
    try {
      loginFormRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false
      });
      
      const signIn_response = await signIn(data);

      if(signIn_response) {
        page_navigate('/user');
      }
      
    } catch(error) {
      loading.changeToFalse();

      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        
        return loginFormRef.current?.setErrors(errors);
      }

      console.log(error);
    }
  };
  
  return (
    <ContainerPage 
      containerStyle={{
        alignItems: 'center',
        height: '100vh'
      }}
    >
      <Header />
      <Content>
        <nav className="login_register_navigation">
          <span>Logar</span>
          <Link to="/register">Registrar</Link>
        </nav>
        <section>
          <h1>Logar na plataforma</h1>
          <FormTag ref={loginFormRef} onSubmit={handleSubmitLogin}>
            <div>
              <Input 
                name="email" 
                title="E-mail"
                icon={<MdEmail/>}
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
            <Button type="submit" isLoading={loading.state} >Entrar</Button>
          </FormTag>
        </section>
      </Content>
    </ContainerPage>
  );
}
