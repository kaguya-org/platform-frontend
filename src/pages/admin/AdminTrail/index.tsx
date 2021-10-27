import { useCallback, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";

import {
  AiFillEdit, 
  FiAlertCircle, 
  BsCheckCircle,
  FiPlus,
} from 'react-icons/all';

import {
  AdminSideBar,
  InputFile
} from '../../../components';

import {
  Container,
  Content,
  FormContainer,
  InputTrailName,
  InputTrailDescription,
  AllPlaylistTrailContainer,
  Playlists,
  Playlist,
  PlaylistDraggable
} from './styles';

import { PlaylistContainer } from './Partials/PlaylistContainer';

export function AdminTrail() {
  const [state, setState] = useState([
    {
      id: 'd12039ujdad',
      name: 'miranha',
      description: 'description'
    },
    {
      id: '12dasdf234513',
      name: 'batman 2',
      description: 'description 2'
    },
    {
      id: '2314dfadfa241rdsa',
      name: 'neymar 3',
      description: 'description 3'
    },
    {
      id: '2314dfdssadfa241rdsa',
      name: 'hulk',
      description: 'description 3dsadasdas'
    },
    {
      id: '2314dfaddddsdfa241rdsa',
      name: 'maisa',
      description: 'description 3dsadas'
    }
  ])
  const [openTrailInfoEditForm, setOpenTrailInfoEditForm] = useState(false);
  const [openPlaylistsDraggable, setOpenPlaylistsDraggable] = useState(false);

  function handleTrailInfoOpenEditForm() {
    setOpenTrailInfoEditForm(true);
  }

  function handleTrailInfoCloseEditForm() {
    setOpenTrailInfoEditForm(false);
  }

  function handlePlaylistsDraggableOpen() {
    setOpenPlaylistsDraggable(true);
  }

  function handlePlaylistsDraggableClose() {
    setOpenPlaylistsDraggable(false);
  }

  const savePlaylists = useCallback(() => {
    console.log(state);
    handlePlaylistsDraggableClose();
  }, [state]);

  const dragEndSetData = useCallback((params: DropResult) => {
    const srcIndex = params.source.index;
    const destinationIndex = params.destination?.index;
    console.log(params);
    if (destinationIndex) {
      state.splice(destinationIndex, 0, state.splice(srcIndex, 1)[0]);
      setState(state);
    }
  }, [state]);

  return (
    <Container>
      <AdminSideBar />
      <Content>
        <FormContainer>
          <form>
            <div>
              {openTrailInfoEditForm ? (
                <InputTrailName 
                  name="trail_name"
                  defaultValue="Javascript"
                />
              ) : (
                <>
                  <h1>Javascript</h1>
                  <button onClick={handleTrailInfoOpenEditForm}>
                    <AiFillEdit />
                  </button>
                </>
              )}
            </div>
            <aside>
              {openTrailInfoEditForm ? (
                <InputFile 
                name="trail_file"
                defaultValue="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png"
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
            {openTrailInfoEditForm ? (
              <>
                <InputTrailDescription
                  name="trail_description"
                  inputType="textarea"
                  defaultValue="Aqui você aprenderá sobre tudo do react, desde a criação de componentes à criar seus próprios hooks."
                  title="Descrição"
                />
    
                <div className="control_buttons">
                  <button type="submit">Confirmar</button>
                  <button onClick={handleTrailInfoCloseEditForm}>Cancelar</button>
                </div>
              </>
            ) : (
              <p>Aqui você aprenderá sobre tudo do react, desde a criação de componentes à criar seus próprios hooks.</p>
            )}
          </form>
        </FormContainer>
        <AllPlaylistTrailContainer>
          <div>
            <h1>Todas as playlists</h1>
            {openPlaylistsDraggable ? (
              <button 
                className="save_playlists_button"
                onClick={savePlaylists}
              >
                <BsCheckCircle />
                Salvar
              </button>
            ) : (
              <button onClick={handlePlaylistsDraggableOpen}>
                <AiFillEdit />
              </button>
            )}
          </div>
          {openPlaylistsDraggable && (
            <span>
              <FiAlertCircle />
              <p>Arraste os cards para cima ou para baixo para modificar a ordem das playlists.</p>
            </span>
          )}

          {openPlaylistsDraggable ? (
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
                    {state.map((playlist, index) => (
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
          ) : (
            <Playlists>
              {state.map((playlist, index) => (
                <Playlist key={playlist.id} to="/admin/trail/javascript">
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
          <button title="Nova playlist" onClick={() => setState([...state, {
            description: 'tt',
            id: String(Date.now()),
            name: 'dasdas'
            }])}><FiPlus /></button>
        </AllPlaylistTrailContainer>
      </Content>
    </Container>
  );
}