import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import {
  AdminSideBar,
  InputFile,
  Input,
  Button,
  Loading
} from '../../../components';
import { useBoolean } from '../../../hooks/useBoolean';

import { api } from '../../../services/api';
import { CreateTrailParams } from '../../../services/apiParams';
import { ListAllTrailsResponse } from '../../../services/apiResponse';
import { getValidationErrors } from '../../../utils/getValidationErrors';

import { 
  Container,
  Content,
  FormContainer,
  AllTrailsContainer,
  Trails,
  Trail
} from './styles';

import imgTest from '../../../assets/images/react.png';

export function AdminCreateTrail() {
  const history = useHistory();
  const createTrailFormRef = useRef<FormHandles>(null);

  const createTrailLoading = useBoolean(false);
  const listAllTrailsLoading = useBoolean(true);

  const [listAllTrail, setListAllTrail] = useState<ListAllTrailsResponse[]>([]);

  async function handleCreateTrailSubmit(data: CreateTrailParams) {
    createTrailLoading.changeToTrue();

    try {
      createTrailFormRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigátorio'),
        description: Yup.string().required('Descrição obrigátorio'),
        avatar: Yup.mixed().required('Avatar obrigátorio'),
      });
      
      await schema.validate(data, {
        abortEarly: false
      });

      const trailResponse = await api.admin.trail.create({
        name: data.name,
        description: data.description,
      });

      const { id } = trailResponse.data;

      if(trailResponse.data && data.avatar) {
        // console.log(data.avatar);
        const formData = new FormData();
        
        formData.append('trail_id', id);
        formData.append('avatar', data.avatar)

        const updateAvatarResponse = await api.admin.trail.updateAvatar(formData); 

        const { name } = updateAvatarResponse.data;

        if(updateAvatarResponse.data) {
          createTrailLoading.changeToFalse();

          history.push(`/admin/trail/${id}`);
          return;
        }
      }
    } catch(error) {
      createTrailLoading.changeToFalse();

      if(error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        
        createTrailFormRef.current?.setErrors(errors);

        return;
      }

      createTrailFormRef.current?.setErrors({
        name: 'Algum erro ocorreu. Tente novamente'
      });
    }
  }

  useEffect(() => {
    api.global.trail.listAll().then(response => {
      setListAllTrail(response.data);

      listAllTrailsLoading.changeToFalse();
    }).catch(error => {
      console.log(error);
      listAllTrailsLoading.changeToFalse();
    });
  }, [api]);

  return (
    <Container>
      <AdminSideBar />
      <Content>
        <FormContainer>
          <h1>Criar trilha</h1>
          
          <Form onSubmit={handleCreateTrailSubmit} ref={createTrailFormRef}>
            <InputFile 
              name="avatar"
            />
            <div className="trail_inputs">
              <Input 
                name="name"
                title="Nome da trilha"
              />
              <Input 
                name="description"
                title="Descrição"
                inputType="textarea"
              />
            </div>
            <Button type="submit" isLoading={createTrailLoading.state}>Criar</Button>
          </Form>
        </FormContainer>
        <AllTrailsContainer>
          <h1>Todas as trilhas</h1>
          <Trails isLoading={listAllTrailsLoading.state}>
            {listAllTrailsLoading.state ? (
              <Loading 
                type="circle" 
                size={{
                  height: '64px',
                  width: '64px'
                }} 
              />
            ) : (
              listAllTrail.map(trail => (
                <Trail to={`/admin/trail/${trail.id}`} >
                  <div className="trail_container">
                    <img src={trail.avatar_url ? trail.avatar_url : imgTest} alt={trail.name} />
                    <div>
                      <h3>{trail.name}</h3>
                      <p>{trail.description}</p>
                    </div>
                  </div>
                  <IoIosArrowForward />
                </Trail>
              ))
            )}
          </Trails>
        </AllTrailsContainer>
      </Content>
    </Container>
  )
}