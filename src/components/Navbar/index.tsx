import { useState } from 'react';

import { RiUser3Fill } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { UserProfile } from '../UserProfile';

import { useAuth } from '@/hooks';

import * as S from './styles';

export function Navbar(): JSX.Element {
  const { signOut } = useAuth();

  const [submenu_open, setSubmenuOpen] = useState<'closed' | 'open'>('closed');

  function handleChangeSubMenu() {
    setSubmenuOpen(prevState => {
      return prevState === 'closed' ? 'open' : 'closed';
    })
  }

  return (
    <S.Container>
      <S.Content>
        <Link to="#" className="app_logo">
          <h1>Slinked</h1>
        </Link>

        <S.LinksContainer>
          <S.LinkItem to="#">
            <span>Link 1</span>
          </S.LinkItem>
          <S.LinkItem to="#">
            <span>Link 2</span>
          </S.LinkItem>
        </S.LinksContainer>
        
        <S.ViewProfile>
          <button
            className="open_submenu_profile"
            onClick={handleChangeSubMenu}
          >
            <UserProfile />
          </button>

          <S.SubMenuProfile
            className={submenu_open}
          >
            <div className="triangule" />
            <S.SubMenuProfileContent>
              
              <S.SubMenuProfileLinkItem to="/profile" title="Ir para o perfil">
                <RiUser3Fill />
                <span>Meu perfil</span>
              </S.SubMenuProfileLinkItem>

              <S.SubMenuProfileButtonItem onClick={signOut} title="Sair da conta">
                <FiLogOut />
                <span>Sair da conta</span>
              </S.SubMenuProfileButtonItem>

            </S.SubMenuProfileContent>
          </S.SubMenuProfile>
        </S.ViewProfile>

      </S.Content>
    </S.Container>
  );
}
