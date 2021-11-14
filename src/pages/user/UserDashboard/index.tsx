import { useEffect, useState } from 'react';

import {
  IoPlaySharp,
  BsDiscord
} from 'react-icons/all';

import { 
  ProgressBar,
  UserPhoto,
  ContainerPage,
} from '../../../components';

import {
  Content,
  LeftContent,
  Welcome,
  LastClasse,
  MyTrailsSection,
  MyTrailsContainer,
  MyTrail,
  ComunitySection,

  RightContent,
  OtherTrailsSection,
  OtherTrailsContainer,
  RightInternalContent,
  OtherTrail,
} from './styles';

import euImg from '../../../assets/images/eu.jpg';
import { api } from '../../../services/api';
import { ListAllTrailsFromUserResponse, ListAllTrailsResponse } from '../../../services/apiResponse';
import { useBoolean } from '../../../hooks/useBoolean';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const jsImg =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png';

export function UserDashboard(): JSX.Element {
  const { user } = useAuth();
  const [allTrailsFromUser, setAllTrailsFromUser] = useState<ListAllTrailsFromUserResponse[]>([]);
  const [allTrails, setAllTrails] = useState<ListAllTrailsResponse[]>([]);
  
  const loadingPage = useBoolean(true);

  useEffect(() => {
    api.user.userTrails.listAllTrailsFromUser().then(response => {
      setAllTrailsFromUser(response.data);
      loadingPage.changeToFalse();
    });

    api.global.trail.listAll().then(response => {
      setAllTrails(response.data);
    });

    return () => loadingPage.changeToFalse();
  }, []);

  return (
    <ContainerPage 
      isLoading={loadingPage.state}
      loadingProps={{
        size: '64px',
      }}
    >
      <Content>
        <LeftContent>
          <Welcome>
            <div>
              <span>
                Olá, {user?.name.split(' ')[0]}
              </span>
              <h1> Vamos estudar o que hoje? </h1>
            </div>
          </Welcome>

          <LastClasse to="#">
            <div className="last_classe_information">
              <img src={jsImg} alt="a" />
              <div>
                <h2 className="title">Entendendo const/let/var</h2>
                <span className="trail_name">Javascript</span>
              </div>
            </div>
            <strong>
              Continuar Assistindo
              <span>
                <IoPlaySharp />
              </span>
            </strong>
          </LastClasse>

          <div className="line_separator" />

          <MyTrailsSection>
            <header>
              <h1> Minhas trilhas </h1>
              <button type="button">Ver todas</button>
            </header>

            <MyTrailsContainer>
              {allTrailsFromUser.map(({trail, trail_percentage_completed}) => (
                <MyTrail to={`/trail/${trail.id}`} key={trail.id} >
                  <header>
                    <img src={trail.avatar_url || jsImg} alt={trail.name} />
                  </header>
                  <span>{trail.name}</span>

                  <ProgressBar percent={trail_percentage_completed} />
                </MyTrail>
              ))}
            </MyTrailsContainer>
          </MyTrailsSection>

          <ComunitySection>
            <BsDiscord />
            <div>
              <h1>Venha fazer parte da nossa comunidade no discord</h1>
              <p>Interaja e faça amigos, participe de call's e muito mais</p>
            </div>
          </ComunitySection>
        </LeftContent>

        <RightContent>
          <RightInternalContent>
            <header className="profile">
              <Link to="/profile">
                <span>{user?.name}</span>
                <UserPhoto
                  imageUri={user?.avatar || euImg} 
                  size={36}
                  containerProps={{
                    style: {
                      padding: '2px'
                    }
                  }}
                />
              </Link>
            </header>

            <OtherTrailsSection>
              <h1>Outras trilhas</h1>
              <OtherTrailsContainer>
                {allTrails.map(trail => (
                  <OtherTrail to={`/trail/${trail.id}`}>
                    <img src={trail.avatar_url || jsImg} alt={trail.name} />
                    <div className="trail_information">
                      <h2 className="title">{trail.name}</h2>
                      <span>{trail.playlists.length} playlists - 15 aulas</span>
                    </div>
                  </OtherTrail>
                ))}
              </OtherTrailsContainer>
            </OtherTrailsSection>
          </RightInternalContent>
        </RightContent>
      </Content>
    </ContainerPage>
  );
}
