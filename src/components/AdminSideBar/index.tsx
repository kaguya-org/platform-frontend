import { useState } from 'react';
import {
  MdOndemandVideo,
  MdPlaylistPlay,
  RiHistoryFill,
  IoNotificationsSharp,
  MdSettings,
  RiLogoutCircleRLine,
} from 'react-icons/all';

import {
  Container,
  Content
} from './styles';

import euImg from '../../assets/images/eu.jpg';
import logoImg from '../../assets/images/default_trail.jpg';

export function AdminSideBar() {
  return (
    <Container>
      <Content>
        <nav>
          <div>
            <img src={logoImg} alt="Eu" />
            <h1>Minha logo </h1>
          </div>
          <ul>
            <a href="/">
              <MdPlaylistPlay />
              <p>Dashboard</p>
            </a>
            <a href="/">
              <MdPlaylistPlay />
              <p>Sugestões</p>
            </a>

            <a href="/">
              <MdOndemandVideo />
              <p>Criar trilha</p>
            </a>

            <a href="/">
              <RiHistoryFill />
              <p>Histórico da plataforma</p>
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
      </Content>
    </Container>
  );
}