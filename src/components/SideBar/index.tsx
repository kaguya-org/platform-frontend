import { Link } from 'react-router-dom';

import {
  MdPlaylistPlay,
  MdSettings,
  RiLogoutCircleRLine,
  GiHamburgerMenu,
  AiOutlineClose,
  AiFillHome,
} from 'react-icons/all';

import { 
  Container, 
  Content, 
} from './styles';

import { UserProfile } from '../UserProfile';
import { useAuth } from '../../hooks/useAuth';
import { useBoolean } from '../../hooks/useBoolean';

export function SideBar(): JSX.Element {
  const { signOut } = useAuth();

  const sidebarStatus = useBoolean(false);
  
  function handleChangeSidebarStatus() {
    sidebarStatus.setState(prevState => !prevState);
  }

  const principalLinks = [
    {
      icon: <AiFillHome />,
      title: 'Dashboard',
      to: '/dashboard'
    },
    {
      icon: <MdPlaylistPlay />,
      title: 'Minhas trilhas',
      to: "#"
    },
  ];

  return (
    <Container className={sidebarStatus.state ? 'container_sidebar_open' : 'container_sidebar_close'}>
      <Content className={`${sidebarStatus.state ? 'content_sidebar_open' : 'content_sidebar_close'} content_sidebar`}>
        <div className="content_top">
          <button onClick={handleChangeSidebarStatus} className="close_open_button">
            <div>
              <span className="icon">{sidebarStatus.state ? <AiOutlineClose /> : <GiHamburgerMenu />}</span>
              <span className="logo title">Slinked</span>
            </div>
          </button>

          <div className="line_separator"/>

          <div className="principal_links">
            <h2>Links principais </h2>
            <nav className="links">
            {principalLinks.map(link => (
              <Link to={link.to} className="link_container" key={link.title}>
                <div>
                  <span className="icon">{link.icon}</span>
                  <span className="title">{link.title}</span>
                </div>
              </Link>
            ))}
            </nav>
          </div>
        </div>

        <nav className="configuration_links">
          <div className="line_separator"/>

          <Link to="#" className="link_container first_link">
            <div>
              <span className="icon"><MdSettings /></span>
              <span className="title">Configurações</span>
            </div>
          </Link>
          <button onClick={signOut} className="link_container">
            <div>
              <span className="icon"><RiLogoutCircleRLine /></span>
              <span className="title">Sair</span>
            </div>
          </button>

          <UserProfile
            css={{
              link: {
                gap: '0',
                paddingLeft: '2rem',
                justifyContent: 'flex-end',
                flexFlow: 'row-reverse',
              },
              name: {
                marginLeft: '2rem',
              }
            }}
          />
        </nav>
      </Content>
      <button className="close_sidebar" onClick={() => sidebarStatus.changeToFalse()} />
    </Container>
  );
}
