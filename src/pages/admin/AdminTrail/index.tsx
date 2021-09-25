import { useState } from 'react';

import {
  AiFillEdit, 
  FiAlertCircle, 
  IoIosArrowForward,
  BsCheckCircle,
  FiPlus,
  HiMenuAlt4
} from 'react-icons/all';

import { AdminSideBar } from 'components/AdminSideBar';
import { InputFile } from 'components/HtmlPartials/InputFile';

import {
  Container,
  Content,
  FormContainer,
  InputTrailName,
  InputTrailDescription,
  AllPlaylistTrailContainer,
  Playlists,
  Playlist,
  Draggable
} from './styles';

export function AdminTrail() {
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
                onClick={handlePlaylistsDraggableClose}
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
          <Playlists>
            {openPlaylistsDraggable ? (
              <Draggable >
                <div className="playlist_container">
                  <span>1</span>
                  <div>
                    <h3>Introdução ao javascript</h3>
                    <p>Entendo o inicio de javascript, porque usar e outras coisas.</p>
                  </div>
                </div>
                <HiMenuAlt4 /> 
              </Draggable>
            ) : (
              <Playlist to="/admin/trail/javascript">
                <div className="playlist_container">
                  <span>1</span>
                  <div>
                    <h3>Introdução ao javascript</h3>
                    <p>Entendo o inicio de javascript, porque usar e outras coisas.</p>
                  </div>
                </div>
                <IoIosArrowForward />
              </Playlist>
            )}
          </Playlists>
          <button title="Nova playlist"><FiPlus /></button>
        </AllPlaylistTrailContainer>
      </Content>
    </Container>
  );
}