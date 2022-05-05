import { SeparatorLine } from '@/components/LineSeparator';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useToast } from '@/hooks/useToast';
import { FormHandles } from '@unform/core';
import { useRef, useState } from 'react';
import { MdEmail, FaLock, FaUser, AiFillGithub, FcGoogle } from 'react-icons/all';
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
  FormContainer,
  FormTag
} from './styles';

export function Register() {
  const page_navigate = useNavigate();
  const { popupSignInWithGoogle, popupSignInWithGithub } = useFirebaseAuth();

  const loading = useBoolean(false);
  const { register } = useAuth();
  const { addToast } = useToast();

  const registerFormRef = useRef<FormHandles>(null);

  const [termsAccepted, setTermsAccepted] = useState(false);

  async function registerUserSubmit(data: UserType.RegisterUserParams) {
    try {
      loading.changeToTrue();

      const schema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('Email obrigatório'),
        password: Yup.string().required('Senha obrigatória').min(8, 'Minimo de 8 digitos'),
        username: Yup.string().required('Username obrigatório').min(2, 'Minimo de 2 caracteres'),
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
      
      const response = await register(dataToRegister);
      
      if(response) {
        return page_navigate('/dashboard');
      }
      
    } catch(error: any) {
      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        
        return registerFormRef.current?.setErrors(errors);
      }

      addToast({
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer o cadastro, tente novamente.',
        appearance: 'error',
      })

      console.log(error);
    } finally {
      loading.changeToFalse();
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
        <FormContainer>
          <nav className="login_register_navigation">
            <Link to="/login">Logar</Link>
            <span>Registrar</span>
          </nav>
          <section>
            <h1>Criar conta</h1>
            <Button 
              disabled
              style={{
                width: '100%',
                padding: '17px 35px'
              }}
              iconConfig={{
                icon: <AiFillGithub style={{
                  width: 22,
                  height: 22
                }} />,
                isSide: 'left'
              }} 
              type="button" 
              onClick={() => popupSignInWithGithub()}
            >Continuar com Github</Button>
            <Button 
              disabled
              style={{
                width: '100%',
                marginTop: 10,
                padding: '17px 35px'
              }}
              iconConfig={{
                icon: <FcGoogle style={{
                  width: 22,
                  height: 22
                }} />,
                isSide: 'left'
              }} 
              type="button" 
              onClick={() => popupSignInWithGoogle()}
            >Continuar com Google</Button>
          
            <SeparatorLine children={'ou'}/>
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
              <Button type="submit" isLoading={loading.state}>Criar</Button>
            </FormTag>
          </section>
        </FormContainer>
      </Content>
    </ContainerPage>
  );
}