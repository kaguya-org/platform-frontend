import { FormHandles } from '@unform/core';
import { useRef, useState } from 'react';
import { MdEmail, FaLock, FaUser } from 'react-icons/all';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import {
  Header,
  Input,
  Button,
  ContainerPage
} from '../../components';

import { InputCheckbox } from '../../components';

import { useAuth, useBoolean } from '../../hooks';

import { UserType } from '../../services/api';

import { getValidationErrors } from '../../utils/getValidationErrors';

import {
  Content,
  FormTag
} from './styles';

export function Register() {
  const page_navigate = useNavigate();

  const loading = useBoolean(false);
  const { register } = useAuth();

  const registerFormRef = useRef<FormHandles>(null);

  const [termsAccepted, setTermsAccepted] = useState(false);

  async function registerUserSubmit(data: UserType.RegisterUserParams) {
    const schema = Yup.object().shape({
      email: Yup.string().email('E-mail inválido').required('Email obrigatório'),
      password: Yup.string().required('Senha obrigatória').min(6, 'Minimo de 6 digitos'),
      username: Yup.string().required('Username obrigatório'),
      terms: Yup.boolean().isTrue('Aceite os termos')
    });

    const customData = {
      ...data,
      terms: termsAccepted,
    }

    const dataToRegister = {
      email: data.email,
      password: data.password,
      username: data.username,
    }

    await schema.validate(customData, {
      abortEarly: false
    });

    try {
      const response = await register(dataToRegister);

      if(response) {
        return page_navigate('/user');
      }

    } catch(error: any) {
      loading.changeToFalse();

      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        
        return registerFormRef.current?.setErrors(errors);
      }

      console.log(error);
    }
  }

  function termsChange(event: React.FormEvent<HTMLInputElement>) {
    setTermsAccepted(event.currentTarget.checked);
  }

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
          <Link to="/login">Logar</Link>
          <span>Registrar</span>
        </nav>
        <section>
          <h1>Criar conta</h1>
          <FormTag onSubmit={registerUserSubmit} ref={registerFormRef}>
            <div>
              <Input 
                name="email" 
                title="E-mail"
                icon={<MdEmail/>}
              />
              <Input 
                name="username" 
                title="Username" 
                type="text"
                icon={<FaUser />}
              />
              <Input 
                name="password" 
                title="Senha" 
                type="password"
                icon={<FaLock />}
              />
              <InputCheckbox
                
                name="terms" 
                onChange={termsChange}
                title="Aceitar os termos de uso"
              /> 
            </div>
            <Button type="submit">Criar</Button>
          </FormTag>
        </section>
      </Content>
    </ContainerPage>
  );
}