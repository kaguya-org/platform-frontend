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

import { 
  Container, 
  Content, 
} from './styles';

import euImg from '../../assets/images/eu.jpg';
import logoImg from '../../assets/images/default_trail.jpg';

export function SideBar(): JSX.Element {
  const [sideBar, setSideBar] = useState(false);

  function handleChangeSideBar(): void {
    setSideBar(prevState => !prevState);
  }
  return (
    <Container>
      <Content>
        
      </Content>
    </Container>
  );
}
