import { useState } from 'react';
import {AiFillEdit} from 'react-icons/all';

import { AdminSideBar } from '../../../components/AdminSideBar';
import { Input } from '../../../components/HtmlPartials/Input';
import { InputFile } from '../../../components/HtmlPartials/InputFile';
import {
  Container,
  Content,
  FormContainer,
  InputTrailName,
  InputTrailDescription
} from './styles';

export function AdminTrail() {
  const [openEditForm, setOpenEditForm] = useState(false);

  function handleOpenEditForm() {
    setOpenEditForm(true);
  }

  function handleCloseEditForm() {
    setOpenEditForm(false);
  }

  return (
    <Container>
      <AdminSideBar />
      <Content>
        <FormContainer>
          <form>
            <div>
              {openEditForm ? (
                <InputTrailName 
                  name="trail_name"
                  defaultValue="Javascript"
                />
              ) : (
                <>
                  <h1>Javascript</h1>
                  <button onClick={handleOpenEditForm}>
                    <AiFillEdit />
                  </button>
                </>
              )}
            </div>
            <aside>
              {openEditForm ? (
                <InputFile 
                name="trail_file"
                defaultValue="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png"
                />
              ) : (
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/480px-Unofficial_JavaScript_logo_2.svg.png" />
              )}
              
              <div className="created_updated_values">
                <span>Criado em 21/09/2021</span>
                <span>Editado em 21/09/2021</span>
              </div>
            </aside>
            <span className="line"></span>
            {openEditForm ? (
              <>
                <InputTrailDescription
                  name="trail_description"
                  inputType="textarea"
                  defaultValue="Aqui você aprenderá sobre tudo do react, desde a criação de componentes à criar seus próprios hooks."
                  title="Descrição"
                />
    
                <div className="control_buttons">
                  <button type="submit">Confirmar</button>
                  <button onClick={handleCloseEditForm}>Cancelar</button>
                </div>
              </>
            ) : (
              <p>Aqui você aprenderá sobre tudo do react, desde a criação de componentes à criar seus próprios hooks.</p>
            )}
          </form>
        </FormContainer>
        {/* <AllPlaylistsContainer>
          <h1>Todas as playlists</h1>
          <Playlists>
            <Playlist to="/admin/playlist/1">
              <div className="playlist_container">
                <div>
                  <h3>React Js</h3>
                  <p>Aqui você aprenderá sobre tudo do react, desde a criação de componentes à criar seus próprios hooks.</p>
                </div>
              </div>
              <IoIosArrowForward />
            </Playlist>
            <Playlist to="/admin/playlist/1">
              <div className="playlist_container">
                <div>
                  <h3>Python</h3>
                  <p>Entendendo todo o mundo de python. Criando controle de dados e muito mais.</p>
                </div>
              </div>
              <IoIosArrowForward />
            </Playlist>
          </Playlists>
        </AllPlaylistsContainer> */}
      </Content>
    </Container>
  );
}