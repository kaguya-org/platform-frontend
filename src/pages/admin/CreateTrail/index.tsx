import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

import {
  AdminSideBar, Button,
  ContainerPage, Input, InputFile
} from '../../../components';

import { useBoolean } from '../../../hooks';

import { AdminType, api, GlobalType } from '../../../services/api';

import { getValidationErrors } from '../../../utils/getValidationErrors';

import {
  AllTrailsContainer, Content,
  FormContainer, Trail, Trails
} from './styles';

import DEFAULT_TRAIL_IMAGE from '../../../assets/images/default_trail.jpg';

export function CreateTrail() {
  const history = useHistory();
  const createTrailFormRef = useRef<FormHandles>(null);

  const createTrailLoading = useBoolean(false);
  const listAllTrailsLoading = useBoolean(true);

  const [listAllTrail, setListAllTrail] = useState<GlobalType.ListAllTrailsResponse[]>([]);

  async function handleCreateTrailSubmit(data: AdminType.CreateTrailParams) {
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
      listAllTrailsLoading.changeToFalse();
    });

    return () => listAllTrailsLoading.changeToFalse();
  }, []);

  return (
    <ContainerPage 
      isLoading={listAllTrailsLoading.state} 
      loadingProps={{
        size: '64px',
      }}
    >
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
            {listAllTrail.map(trail => (
              <Trail to={`/admin/trail/${trail.id}`} key={trail.id}>
                <div className="trail_container">
                  <img src={trail.avatar ? trail.avatar : DEFAULT_TRAIL_IMAGE} alt={trail.name} />
                  <div>
                    <h3>{trail.name}</h3>
                    <p>{trail.description}</p>
                  </div>
                </div>
                <IoIosArrowForward />
              </Trail>
            ))}
          </Trails>
        </AllTrailsContainer>
      </Content>
    </ContainerPage>
  )
}