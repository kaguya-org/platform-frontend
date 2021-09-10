import { useState } from 'react';

import {
  MdOndemandVideo,
  MdPlaylistPlay,
  RiHistoryFill,
  IoNotificationsSharp,
  MdSettings,
  BsArrowRight,
  BsArrowLeft,
  RiLogoutCircleRLine,
} from 'react-icons/all';
import { Container, Content, ClosedSideBar, OpenSideBar } from './styles';

import euImg from '../../assets/images/eu.jpg';
import logoImg from '../../assets/images/react.png';

export function SideBar(): JSX.Element {
  const [sideBar, setSideBar] = useState(false);

  function handleChangeSideBar(): void {
    setSideBar(prevState => !prevState);
  }
  return (
    <Container>
      <Content>
        {!sideBar ? (
          <ClosedSideBar>
            <nav>
              <button type="button" onClick={handleChangeSideBar}>
                <BsArrowRight />
              </button>

              <img src={logoImg} alt="Eu" />

              <ul>
                <a href="/" title="Minhas Trilhas">
                  <MdPlaylistPlay />
                </a>

                <a href="/" title="Ver Aulas">
                  <MdOndemandVideo />
                </a>

                <a href="/" title="Meu histórico">
                  <RiHistoryFill />
                </a>
              </ul>
            </nav>
            <div>
              <ul>
                <a href="/" title="Notificações">
                  <IoNotificationsSharp />
                </a>
                <a href="/" title="Configurações">
                  <MdSettings />
                </a>
                <a href="/" title="Sair da conta">
                  <RiLogoutCircleRLine />
                </a>
              </ul>

              <span>
                <img src={euImg} alt="Eu" />
              </span>
            </div>
          </ClosedSideBar>
        ) : (
          <OpenSideBar>
            <section>
              <nav>
                <span>
                  <button type="button" onClick={handleChangeSideBar}>
                    <BsArrowLeft />
                  </button>
                </span>
                <div>
                  <img src={logoImg} alt="Eu" />
                  <h1>Minha logo </h1>
                </div>
                <ul>
                  <a href="/">
                    <MdPlaylistPlay />
                    <p>Minhas Trilhas</p>
                  </a>

                  <a href="/">
                    <MdOndemandVideo />
                    <p>Ver Aulas</p>
                  </a>

                  <a href="/">
                    <RiHistoryFill />
                    <p>Meu Histórico</p>
                  </a>
                </ul>
              </nav>
              <div>
                <ul>
                  <a href="/">
                    <IoNotificationsSharp />
                    <p>Notificações</p>
                  </a>
                  <a href="/">
                    <MdSettings />
                    <p>Configurações</p>
                  </a>
                  <a href="/">
                    <RiLogoutCircleRLine />
                    <p> Sair da conta </p>
                  </a>
                </ul>

                <span>
                  <img src={euImg} alt="Eu" />
                  <p>Tiago Gonçalves de Castro</p>
                </span>
              </div>
            </section>
            <aside onClick={handleChangeSideBar} />
          </OpenSideBar>
        )}
      </Content>
    </Container>
  );
}
