import { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useModal } from '@tg0/react-modal';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { AxiosError } from 'axios';
import { useParams, useHistory } from 'react-router';

import {
  AiFillEdit, 
  FiAlertCircle, 
  BsCheckCircle,
  FiPlus,
} from 'react-icons/all';

import {
  AdminSideBar,
  ContainerPage,
  Input,
  InputFile,
} from '../../../components';

import {
  Content,
  FormContainer,
  inputTrailName,
  inputTrailDescription,
  AllPlaylistTrailContainer,
  Playlists,
  Playlist,
  PlaylistDraggable
} from './styles';

import { PlaylistContainer } from './Partials/PlaylistContainer';

import { useBoolean } from '../../../hooks';

import { api, GlobalType } from '../../../services/api';

type LocationParams = {
  trail_id: string;
}

export function Trail() {
  const updateTrailFormRef = useRef<FormHandles>(null);

  const history = useHistory();
  const { trail_id } = useParams<LocationParams>();

  const [playlistsByTrail, setPlaylistsByTrail] = useState<GlobalType.ListAllPlaylistsByTrailResponse[]>([]);

  const openTrailInfoEditForm = useBoolean(false);
  const openPlaylistsDraggable = useBoolean(false);

  const loadingPage = useBoolean(true);

  const newPlaylistModal = useModal()
  
  const savePlaylists = useCallback(() => {
    openPlaylistsDraggable.changeToFalse();
  }, [playlistsByTrail, openPlaylistsDraggable]);

  const dragEndSetData = useCallback((params: DropResult) => {
    const srcIndex = params.source.index;
    const destinationIndex = params.destination?.index;

    if (destinationIndex) {
      playlistsByTrail.splice(destinationIndex, 0, playlistsByTrail.splice(srcIndex, 1)[0]);

      setPlaylistsByTrail(playlistsByTrail);
    }

    console.log(playlistsByTrail)
  }, [playlistsByTrail]);

  function handleUpdateTrailInfo(data: any) {
    console.log(data);
  }

  useEffect(() => {
    api.global.playlist.listAllByTrail({
      trail_id,
    }).then(response => {
      setPlaylistsByTrail(response.data);
      loadingPage.changeToFalse();
    }).catch((err: AxiosError) => {
      if(err) {
        loadingPage.changeToFalse();
        history.push('/admin/trail/create');
      }
    });

    return () => loadingPage.changeToFalse();
  }, [history, trail_id]);

  return (
    <ContainerPage
      isLoading={loadingPage.state}
      loadingProps={{
        size: '64px',
      }}
    >
      <AdminSideBar />
      <Content>
        <FormContainer>
          <Form ref={updateTrailFormRef} onSubmit={handleUpdateTrailInfo}>
            <div>
              {openTrailInfoEditForm.state ? (
                <Input
                  name="name"
                  defaultValue="Javascript"
                  containerProps={{
                    style: inputTrailName.container
                  }}
                  style={{
                    ...inputTrailName.input
                  }}
                />
              ) : (
                <>
                  <h1>Javascript</h1>
                  <button onClick={() => openTrailInfoEditForm.changeToTrue()}>
                    <AiFillEdit />
                  </button>
                </>
              )}
            </div>
            <aside>
              {openTrailInfoEditForm.state ? (
                <InputFile 
                  name="avatar"
                />
              ) : (
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" alt="a" />
              )}
              
              <div className="created_updated_values">
                <span>Criado em 21/09/2021</span>
                <span>Editado em 21/09/2021</span>
              </div>
            </aside>
            <span className="line"></span>
            {openTrailInfoEditForm.state ? (
              <>
                <Input
                  name="description"
                  inputType="textarea"
                  defaultValue="Aqui você aprenderá sobre tudo do react, desde a criação de componentes à criar seus próprios hooks."
                  title="Descrição"
                  containerProps={{
                    style: inputTrailDescription
                  }}
                />
    
                <div className="control_buttons">
                  <button type="submit">Confirmar</button>
                  <button onClick={() => openTrailInfoEditForm.changeToFalse()}>Cancelar</button>
                </div>
              </>
            ) : (
              <p>Aqui você aprenderá sobre tudo do react, desde a criação de componentes à criar seus próprios hooks.</p>
            )}
          </Form>
        </FormContainer>
        <AllPlaylistTrailContainer>
          <div>
            <h1>Todas as playlists</h1>
            {openPlaylistsDraggable.state ? (
              <button 
                className="save_playlists_button"
                onClick={savePlaylists}
              >
                <BsCheckCircle />
                Salvar
              </button>
            ) : (
              <button onClick={() => openPlaylistsDraggable.changeToTrue()}>
                <AiFillEdit />
              </button>
            )}
          </div>

          {openPlaylistsDraggable.state ? (
            <>
              <span>
                <FiAlertCircle />
                <p>Arraste os cards para cima ou para baixo para modificar a ordem das playlists.</p>
              </span>

              <DragDropContext
                onDragEnd={(params) => {
                  dragEndSetData(params);
                }}
              >
                <Droppable droppableId="droppable-1">
                  {(provided, _) => (
                    <Playlists 
                      ref={provided.innerRef} 
                      {...provided.droppableProps}
                    >
                      {playlistsByTrail.map((playlist, index) => (
                        <Draggable
                          key={playlist.id}
                          draggableId={`droppable-`+ playlist.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <PlaylistDraggable 
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              style={{
                                ...provided.draggableProps.style,
                                boxShadow: snapshot.isDragging
                                  ? "0 0 .4rem #666"
                                  : "none",
                              }}
                            >
                              <PlaylistContainer
                                isDraggable
                                data={{
                                  id: playlist.id,
                                  title: playlist.name,
                                  description: playlist.description,
                                  index: index
                                }}
                              /> 
                            </PlaylistDraggable>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Playlists>
                  )}
                </Droppable>
              </DragDropContext>
            </>
          ) : (
            <Playlists>
              {playlistsByTrail.map((playlist, index) => (
                <Playlist key={playlist.id} to={`/admin/playlist/${playlist.id}`}>
                  <PlaylistContainer 
                    data={{
                      id: playlist.id,
                      title: playlist.name,
                      description: playlist.description,
                      index: index
                    }}
                  />
                </Playlist>
              ))}
            </Playlists>
          )}
          <button 
            title="Nova playlist" 
            onClick={() => newPlaylistModal.handleOpen()}
          >
            <FiPlus />
          </button>
        </AllPlaylistTrailContainer>
      </Content>
    </ContainerPage>
  );
}