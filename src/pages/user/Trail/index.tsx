import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { 
  BiListPlus, 
  BiListMinus,
  HiOutlineArrowNarrowRight,
  AiOutlineInfoCircle,
  BsDiscord
} from 'react-icons/all';

import {
  ProgressBar,
  SideBar,
  ContainerPage,
  Button,
  PagePath
} from '../../../components';

import { api, UserType, GlobalType } from '../../../services/api';

import { useBoolean } from '../../../hooks';

import DEFAULT_TRAIL_IMAGE from '../../../assets/images/default_trail.jpg';
import NOT_FOUND_PLAYLIST_IMAGE from '../../../assets/images/not_found_playlists.svg';

import { 
  Content,
  TrailInfoContainer,
  PrincipalTrailInfo,
  TrailInfo,
  OthersTrailInfo,
  PlayListAndExerciciesContainer,
  PlayListAndExercicie,
  PlayList,
  // Exercicie,

  NotFoundPlaylists,
} from './styles';

type LocationParams = {
  trail_id: string;
}
  
export function Trail() {
  const loadingPage = useBoolean(true);
  const loadingAddTrail = useBoolean(false);
  const loadingRemoveTrail = useBoolean(false);

  const { trail_id } = useParams<LocationParams>();

  const [userTrail, setUserTrail] = useState<UserType.ListAllTrailsFromUserResponse | undefined>(undefined);
  const [trailInfo, setTrailInfo] = useState<GlobalType.ShowTrailResponse | null>(null);
  const [listAllPlaylistByTrail, setListAllPlaylistByTrail] = useState<GlobalType.ListAllPlaylistsByTrailResponse[]>([]);

  function getTrail() {
    api.user.trail.listAllTrailsFromUser().then(response => {
      if(response.data.length > 0) {
        response.data.some(({trail}) => {
          if(trail.id === trail_id) {
            const trailFinded = response.data.find(where => where.trail.id === trail_id);
            setUserTrail(trailFinded);
          }
        });
      }
    });

    api.global.trail.getInfo({trail_id}).then(response => {
      setTrailInfo(response.data);
    });
  }

  const handleAddTrailInUser = useCallback(() => {
    loadingAddTrail.changeToTrue();

    api.user.trail.addTrailInUser({trail_id}).then(response => {
      getTrail();
      loadingAddTrail.changeToFalse();
    });
  }, [trail_id]);

  const handleRemoveTrailInUser = useCallback(() => {
    loadingRemoveTrail.changeToTrue();

    if(userTrail) {
      api.user.trail.removeTrailInUser({user_trail_id: userTrail?.id}).then(r => {
        setUserTrail(undefined);
        getTrail();
        loadingRemoveTrail.changeToFalse();
      });
    }
  }, [userTrail]);

  useEffect(() => {
    getTrail();
    
    api.global.playlist.listAllByTrail({
      trail_id
    }).then(response => {
      setListAllPlaylistByTrail(response.data);
    });

    loadingPage.changeToFalse();

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
        <PagePath
          previousPages={[
            {
              title: 'Dashborad',
              to: '/dashboard',
              order: 1,
            }
          ]}
          currentPage={{
            title: trailInfo?.name
          }}
        />
        <section>
          <TrailInfoContainer>
            <PrincipalTrailInfo className="principal_trail_info">
              <TrailInfo className="trail_info">
                <header>
                  <img src={trailInfo?.avatar_url || DEFAULT_TRAIL_IMAGE} alt={trailInfo?.name} />

                  <div>
                    <h1 className="trail_title">Trilha de 
                      <span className="trail_title">
                        {trailInfo?.name}
                      </span>
                    </h1>
                    {userTrail ? (
                      <Button 
                        isLoading={loadingRemoveTrail.state}
                        onClick={handleRemoveTrailInUser}
                        title="Remover trilha"
                      >
                        <BiListMinus/> <span>Remover trilha</span>
                      </Button>
                    ) : (
                      <Button 
                        isLoading={loadingAddTrail.state}
                        onClick={handleAddTrailInUser}
                        title="Adicionar trilha"
                      >
                        <BiListPlus/> <span>Adicionar trilha</span>
                      </Button>
                    )}
                  </div>
                </header>
                <p className="trail_description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque dicta a rerum placeat aut dolorum earum esse ipsum vero. Iste rem placeat nostrum laudantium nisi quas officiis soluta nulla totam.</p>
              </TrailInfo>
              
              <button className="open_others_trail_info" title="Mais informações da trilha">
                <AiOutlineInfoCircle />
              </button>
            </PrincipalTrailInfo>
            
            <OthersTrailInfo className="others_trail_info">
              <header>
                <h1>Outras informações desta trilha</h1>
              </header>

              <div className="others_info_container">
                <p><HiOutlineArrowNarrowRight /> Contém 12 playlists e 154 aulas no total.</p>
                <p><HiOutlineArrowNarrowRight /> Atualmente 36 alunos fazem está trilha, <span>que tal se juntar a eles?</span></p>
              </div>
            </OthersTrailInfo>

            <div className="line_separator"/>
          </TrailInfoContainer>

          {listAllPlaylistByTrail.length ? (
            <PlayListAndExerciciesContainer>
              {listAllPlaylistByTrail.map((playlist, index) => (
                <PlayListAndExercicie key={playlist.id}>
                  <PlayList to={`/trail/${trail_id}/${playlist.id}`}>
                    <div className="playlist_index">
                      <span>{index + 1}</span>
                    </div>
                    <div className="playlist_info">
                      <div>
                        <h2 className="playlist_title">{playlist.name}</h2>
                        <span className="playlist_classes_total">122 de 144 aulas assistidas</span>
                      </div>
                      <p className="playlist_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat possimus veniam minima earum doloremque doloribus a sit accusantium quae saepe soluta repellendus quibusdam ea, vero exercitationem maiores, voluptatibus, eum esse.</p>
                    </div>
                    <ProgressBar percent={50}/>
                  </PlayList>
                  {/* <Exercicie>
                    <aside>
                      <MdComputer />
                      <div>
                        <h2>Calculadora grande</h2>
                        <span>Nível 1</span>
                      </div>
                    </aside>
                    <div> */}
                      {/* <span className="exercicie_notStarted">
                        <VscDebugBreakpointData /> Não iniciado
                      </span> */}
                      {/* <span className="exercicie_started">
                        <VscDebugBreakpointData /> Iniciado
                      </span> */}
                      {/* <span className="exercicie_completed">
                        <VscDebugBreakpointData /> Completado
                      </span>
                      <button>Ver exercício <IoIosArrowRoundForward /></button>
                    </div>
                  </Exercicie> */}
                </PlayListAndExercicie>
              ))}
            </PlayListAndExerciciesContainer>
          ) : (
            <NotFoundPlaylists>
              <img src={NOT_FOUND_PLAYLIST_IMAGE} alt="Imagem de lista de playlist não encontradas"/>
              <div className="not_found_playlists_text">
                <h1>Me parece que não criamos playlists para esta trilha</h1>
                <h2>Fique tranquilo, em breve começaremos adicionar algumas</h2>
                <div>
                  <span>Enquanto isso participe da nossa comunidade</span>
                  <Button 
                    iconConfig={{
                      icon: <BsDiscord />,
                      isSide: 'left'
                    }}
                  >Clicando aqui</Button>
                </div>
              </div>
            </NotFoundPlaylists>
          )}
        </section>
      </Content>
    </ContainerPage>
  );
}
