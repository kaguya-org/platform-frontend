import { SeparatorLine } from '@/components/LineSeparator';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useToast } from '@/hooks/useToast';
import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import { AiFillGithub, FaLock, FcGoogle, MdEmail } from 'react-icons/all';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Button, ContainerPage, Header, Input
} from '../../components';
import { useAuth } from '../../hooks/useAuth';
import { useBoolean } from '../../hooks/useBoolean';
import { UserType } from '../../services/api';
import { getValidationErrors } from '../../utils/getValidationErrors';
import {
  Content,
  FormContainer,
  FormTag
} from './styles';

export function Login() {
  const page_navigate = useNavigate();

  const loginFormRef = useRef<FormHandles>(null);
  const { signIn } = useAuth();
  const { addToast } = useToast();

  const loading = useBoolean(false);
  const { popupSignInWithGoogle, popupSignInWithGithub } = useFirebaseAuth();

  async function handleSubmitLogin(data: UserType.LoginParams) {
    try {
      loading.changeToTrue();

      const schema = Yup.object().shape({
        email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
        password: Yup.string().required('Senha obrigatória'),
      });
      
      loginFormRef.current?.setErrors({});
      
      await schema.validate(data, {
        abortEarly: false
      });
      
      const signIn_response = await signIn(data);
      
      if(signIn_response) {
        page_navigate('/dashboard');
      }
      
    } catch(error) {
      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        
        return loginFormRef.current?.setErrors(errors);
      }

      addToast({
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
        type: 'error',
      })
    } finally {
      loading.changeToFalse();
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
        <FormContainer>
          <nav className="login_register_navigation">
            <span>Logar</span>
            <Link to="/register">Registrar</Link>
          </nav>
          <section>
            <h1>Logar na plataforma</h1>
            <Button 
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
              <Button type="submit" isLoading={loading.state}>Entrar</Button>
            </FormTag>
          </section>
        </FormContainer>
      </Content>
    </ContainerPage>
  );
}
