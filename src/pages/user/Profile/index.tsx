import axios from 'axios';

import { useRef } from 'react';
import { Link } from 'react-router-dom';

import * as Yup from 'yup';

import { CgProfile } from 'react-icons/cg';
 import { FiUser } from 'react-icons/fi';
import { IoRefresh } from 'react-icons/io5';

import Lordicon from '@/components/ReactLordicon';
import {
  Button, Input, Loading, Navbar, UserPhoto
} from '../../../components';

import { BACKGROUND } from '@/theme';
import { FormHandles } from '@unform/core';

import { useToast, useAuth, useBoolean } from '@/hooks';
import { baseApi } from '../../../services/api';
import { getValidationErrors } from '../../../utils/getValidationErrors';

import {
  AvatarContainer,
  Container,
  Content,
  FormContainer,
  FormTag
} from './styles';
import { User } from '@/services/app_api/user/types';

interface UpdateUser {
  name: string;
  username: string;
  password: string;
}

const updateUserSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Mínimo de 2 caracteres')
    .max(100, 'Máximo de 2 caracteres'),
  username: Yup.string()
    .min(2, 'Mínimo de 2 caracteres')
    .max(100, 'Máximo de 2 caracteres')
});

export function Profile() {
  const { user, setUser } = useAuth();

  const formUpdateUserRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const updateUserLoading = useBoolean(false);
  const updateUserAvatarLoading = useBoolean(false);

  async function handleUpdateUser(data: UpdateUser) {
    try {
      updateUserLoading.changeToTrue();
      
      formUpdateUserRef.current?.setErrors({});
      
      await updateUserSchema.validate(data, {
        abortEarly: false
      });

      const response = await baseApi.put<User>('/users/update-user', data);

      const userResponse = response.data;

      setUser((prev) => {
        return {
          ...prev,
          ...userResponse
        }
      });

      addToast({
        title: 'Atualização da conta',
        description: 'Sucesso! Seus dados foram atualizados.',
        appearance: 'success',
      });

      updateUserLoading.changeToFalse();
    } catch(error: any) {
      updateUserLoading.changeToFalse();

      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        
        return formUpdateUserRef.current?.setErrors(errors);
      }

      if(axios.isAxiosError(error) as any) {
        addToast({
          title: 'Erro na atualização do usuário',
          description: error?.response.data.message,
          appearance: 'error',
        })
      }

    }
  };

  async function handleUpdateUserAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      const files = event.target.files;

      const fileTypeAccepted = ['image/png', 'image/svg' ,'image/jpeg', 'image/gif'];

      const oneFile = files?.item(0);

      if(!oneFile) {
        throw new Error('Escolha uma avatar para atualiza-lo.')
      }
      
      if(!fileTypeAccepted.includes(oneFile.type)) {
        throw new Error('Tipos de arquivo válido são: .png | .svg+xml | .svg | .jpeg')
      }

      const formData = new FormData();
      formData.append('avatar', oneFile);

      updateUserAvatarLoading.changeToTrue();

      const response = await baseApi.patch<User>('/users/avatar', formData);

      const userResponse = response.data;

      setUser((prev) => {
        return {
          ...prev,
          ...userResponse
        }
      });

      addToast({
        title: 'Atualização da foto de perfil',
        description: 'Sucesso! Seu avatar foi alterado.',
        appearance: 'success',
      });

      updateUserAvatarLoading.changeToFalse();
    } catch(error: any) {
      if(error instanceof Error) {
        addToast({
          title: 'Erro na atualização do avatar',
          description: error.message,
          appearance: 'error',
        })
      }

      if(axios.isAxiosError(error) as any) {
        addToast({
          title: 'Erro na atualização do avatar',
          description: error?.response?.data.message,
          appearance: 'error',
        })
      }

      updateUserAvatarLoading.changeToFalse();
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Content>
          <FormContainer>
            <header>
              <h1>Perfil</h1>
              <Link to="/dashboard">
                Voltar
              </Link>
            </header>
            <section>
              <AvatarContainer>
                <div className="avatarInput">
                  <label htmlFor="avatarInputRef">
                    {updateUserAvatarLoading.state ? <Loading /> : (
                      <>
                        <input
                          id="avatarInputRef"
                          type="file"
                          onChange={handleUpdateUserAvatar}
                        />
                        <UserPhoto
                          size={14}
                          imageUri={user?.avatar_url}
                          css={{
                            container: {
                              borderWidth: '3px'
                            }
                          }}
                        />
                        <Lordicon
                          icon='camera'
                          size={36}
                          style={{
                            position: 'absolute',
                            right: '0',
                            bottom: '0',
                            background: BACKGROUND.SECONDARY,
                            borderRadius: '50%',
                            boxSizing: 'content-box',
                            padding: '4px',
                          }}
                        />
                      </>
                    )}
                  </label>
                </div>
              </AvatarContainer>
              <FormTag
                ref={formUpdateUserRef}
                onSubmit={handleUpdateUser}
              >
                <div className="inputs">
                  {/* <Input 
                    name="email" 
                    title="E-mail"
                    icon={<MdEmail/>}
                  /> */}
                  <Input 
                    name="username" 
                    title="Username"
                    type="text"
                    icon={<FiUser/>}
                    defaultValue={user?.username}
                  />
                  <Input 
                    name="name" 
                    title="Nome" 
                    type="text"
                    icon={<CgProfile />}
                    defaultValue={user?.name || undefined}
                  />
                </div>
                <Button
                  type="submit"
                  isLoading={updateUserLoading.state}
                >
                  <IoRefresh />
                  Atualizar
                </Button>
              </FormTag>
            </section>
          </FormContainer>
        </Content>
      </Container>
    </>
  );
}
