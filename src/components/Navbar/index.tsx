import { useState } from 'react';

import { RiUser3Fill } from 'react-icons/ri';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { UserProfile } from '../UserProfile';

import { useAuth } from '@/hooks';

import * as S from './styles';
import { PopoverContainer } from '../PopoverContainer';
import Lordicon from '../ReactLordicon';

export function Navbar(): JSX.Element {
  const { signOut } = useAuth();




  return (
    <S.Container>
      <S.Content>
        <Link to="/dashboard" className="app_logo">
          <Lordicon size={50} icon='nightSky' colors={{
            primary: '#fff',
            secondary: '#a90f64'
          }} trigger='loop' delay={3000} />
          <h1>Kaguya</h1>
        </Link>

        {/* <S.LinksContainer> */}
          {/* <S.LinkItem to="#">
            <span>Link 1</span>
          </S.LinkItem>
          <S.LinkItem to="#">
            <span>Link 2</span>
          </S.LinkItem> */}
        {/* </S.LinksContainer> */}
        
        <S.ViewProfile>
         

            <div className="triangule" />
            <PopoverContainer 
              triggerContent={ 
                <UserProfile />
              }
              content={(
                <S.SubMenuProfileContent>
                  <S.SubMenuProfileLinkItem to={'/profile'}>
                    <RiUser3Fill />
                    <span>Meu perfil</span>
                  </S.SubMenuProfileLinkItem>
                  <S.SubMenuProfileButtonItem onClick={signOut}>
                    <FiLogOut />
                    <span>Sair da conta</span>
                  </S.SubMenuProfileButtonItem>
                </S.SubMenuProfileContent>
              )} 
            />
              
        </S.ViewProfile>

      </S.Content>
    </S.Container>
  );
}
