import { useEffect, useState } from 'react';
import { useModal } from '@tg0/react-modal';

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
  Loading
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
import { SeeMoreTrails } from '../../../components/Modals/SeeMoreTrails';

export function Dashboard(): JSX.Element {
  const { user } = useAuth();

  const seeMoreTrailsModal = useModal(false);

  const [otherTrailsFromUser, setAllTrailsFromUser] = useState<UserType.ListAllTrailsFromUserResponse[]>([]);
  const [otherTrails, setAllTrails] = useState<GlobalType.ListAllTrailsResponse[]>([]);
  
  const loadingPage = useBoolean(true);
  const trailsFromUserLoading = useBoolean(true);
  const otherTrailsLoading = useBoolean(true);

  useEffect(() => {
    window.addEventListener('load', (event) => {
      loadingPage.changeToFalse()
    })

    api.user.trail.listAllTrailsFromUser()
      .then(response => {
        setAllTrailsFromUser(response.data);
      })
      .finally(() => {
        trailsFromUserLoading.changeToFalse();
      });

    api.global.trail.listAll({
      exclude_my_trails: true,
      take: 4,
    })
    .then(response => {
      setAllTrails(response.data);
    })
    .finally(() => {
      otherTrailsLoading.changeToFalse();
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
                Olá, {user?.name.split(' ')[0]}
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
              {otherTrailsFromUser.length > 3 && (
                <button type="button">Ver mais</button>
              )}
            </header>
            {!otherTrailsFromUser.length ? (
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
                {otherTrailsFromUser.map(({trail, trail_percentage_completed}) => (
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
            Comunidade
          </ComunitySection>
        </LeftContent>

        <RightContent>
          <RightInternalContent>
            <UserProfile />

            <OtherTrailsSection>
              <header>
                <h1>Outras trilhas</h1>
                {otherTrails.length > 0 && (
                  <button type="button" onClick={() => seeMoreTrailsModal.handleOpen()}>Ver mais</button>
                )}
              </header>
              <OtherTrailsContainer>
                {!otherTrails.length && (
                  <span>Não foi possivel encontrar outras trilhas no momento</span>
                )}
                {otherTrailsLoading.state ? (
                  <Loading 
                    size='64px'
                  />
                ) : otherTrails.map(trail => (
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

      <SeeMoreTrails 
        isOpen={seeMoreTrailsModal.state}
        handleClose={seeMoreTrailsModal.handleClose}
        trails={otherTrails}
      />

    </ContainerPage>
  );
}
