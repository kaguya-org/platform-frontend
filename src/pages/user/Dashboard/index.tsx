import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  IoPlaySharp,
  BsDiscord,
  IoIosRocket
} from 'react-icons/all';

import { 
  ProgressBar,
  ContainerPage,
  Button,
  SideBar,
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

  NotFoundMyTrails,
} from './styles';

import DEFAULT_TRAIL_IMAGE from '../../../assets/images/default_trail.jpg';
import NOT_FOUND_MY_TRAILS_IMAGE from '../../../assets/images/not_found_my_trails.svg';

import { GlobalType, UserType, api } from '../../../services/api';
import { useBoolean, useAuth } from '../../../hooks';
import { UserProfile } from '../../../components/';

export function Dashboard(): JSX.Element {
  const { user } = useAuth();
  const [allTrailsFromUser, setAllTrailsFromUser] = useState<UserType.ListAllTrailsFromUserResponse[]>([]);
  const [allTrails, setAllTrails] = useState<GlobalType.ListAllTrailsResponse[]>([]);
  
  const loadingPage = useBoolean(true);

  useEffect(() => {
    api.user.trail.listAllTrailsFromUser().then(response => {
      setAllTrailsFromUser(response.data);
      loadingPage.changeToFalse();
    });

    api.global.trail.listAll({
      exclude_my_trails: true,
      take: 4,
      order: 'desc'
    }).then(response => {
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
      <SideBar />
      <Content>
        <LeftContent>
          <Welcome>
            <div>
              <span>
                Olá, Tiago
              </span>
              <h1> Vamos estudar o que hoje? </h1>
            </div>
            <UserProfile />
          </Welcome>

          <LastClasse to="#">
            <div className="last_classe_information">
              <img src={DEFAULT_TRAIL_IMAGE} alt="a" />
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
              {allTrailsFromUser.length > 0 && (
                <button type="button">Ver todas</button>
              )}
            </header>
            {!allTrailsFromUser.length ? (
              <NotFoundMyTrails>
                <img src={NOT_FOUND_MY_TRAILS_IMAGE} alt="Minhas trilhas não foram encontradas" />
                <div className="not_found_my_trails_texts">
                  <h2 className="title">Me parece que você não possuí trilhas</h2>
                  <p>Comece fazer alguma imediatamente e turbine seu aprendizado</p>
                  <Button 
                    className="show_all_trails"
                    iconConfig={{
                      icon: <IoIosRocket />,
                      isSide: 'left',
                    }}
                  >
                    Ver trilhas disponíveis
                  </Button>
                </div>
              </NotFoundMyTrails>
            ): (
              <MyTrailsContainer>
                {allTrailsFromUser.map(({trail, trail_percentage_completed}) => (
                  <MyTrail to={`/trail/${trail.id}`} key={trail.id} >
                    <header>
                      <img src={trail.avatar_url || DEFAULT_TRAIL_IMAGE} alt={trail.name} />
                    </header>
                    <span>{trail.name}</span>

                    <ProgressBar percent={trail_percentage_completed} />
                  </MyTrail>
                ))}
              </MyTrailsContainer>
            )}
            
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
            <UserProfile />

            <OtherTrailsSection>
              <h1>Outras trilhas</h1>
              <OtherTrailsContainer>
                {allTrails.map(trail => (
                  <OtherTrail to={`/trail/${trail.id}`} key={trail.id} >
                    <img src={trail.avatar || DEFAULT_TRAIL_IMAGE} alt={trail.name} />
                    <div className="trail_information">
                      <h2 className="title">{trail.name}</h2>
                      <span>{trail._count.playlists} playlists - {trail._count.classes} aulas</span>
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
