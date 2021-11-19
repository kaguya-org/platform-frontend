import { useBoolean } from '../../../hooks/useBoolean';
import { useCallback, useEffect, useState } from 'react';
import { 
  BiListPlus, 
  MdComputer, 
  MdOndemandVideo, 
  MdPlaylistPlay, 
  FaUserFriends, 
  IoIosArrowRoundForward, 
  VscDebugBreakpointData, 
  BiListMinus
} from 'react-icons/all';
import { useParams } from 'react-router';

import {
  ProgressBar,
  SideBar,
  ContainerPage,
  Button
} from '../../../components';
import { api } from '../../../services/api';
import { ListAllPlaylistsByTrailResponse, ListAllTrailsFromUserResponse, ShowTrailResponse } from '../../../services/apiResponse';

import { 
  Content,
  TrailInfo,
  PlayListAndExerciciesContainer,
  PlayListAndExercicie,
  PlayList,
  Exercicie
} from './styles';

const jsImg =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png';


type LocationParams = {
  trail_id: string;
}
  
export function Trail() {
  const loadingPage = useBoolean(true);
  const loadingAddTrail = useBoolean(false);
  const loadingRemoveTrail = useBoolean(false);

  const { trail_id } = useParams<LocationParams>();

  const [userTrail, setUserTrail] = useState<ListAllTrailsFromUserResponse | undefined>(undefined);
  const [trailInfo, setTrailInfo] = useState<ShowTrailResponse | null>(null);
  const [listAllPlaylistByTrail, setListAllPlaylistByTrail] = useState<ListAllPlaylistsByTrailResponse[]>([]);

  function getTrail() {
    api.user.userTrails.listAllTrailsFromUser().then(response => {
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

    api.user.userTrails.addTrailInUser({trail_id}).then(response => {
      getTrail();
      loadingAddTrail.changeToFalse();
    });
  }, [trail_id]);

  const handleRemoveTrailInUser = useCallback(() => {
    loadingRemoveTrail.changeToTrue();

    if(userTrail) {
      api.user.userTrails.removeTrailInUser({user_trail_id: userTrail?.id}).then(r => {
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
        {!userTrail ? (
          <TrailInfo>
            <div>
              <img src={trailInfo?.avatar_url || jsImg} alt={trailInfo?.name} />
              <span><MdPlaylistPlay /> 12 playlists </span>
              <span><MdOndemandVideo /> 154 aulas </span>
              <span><MdComputer /> 12 exercícios </span>
              <span><FaUserFriends /> 36 alunos </span>
            </div>
            <aside>
              <div>
                <h1>Trilha de <span>{trailInfo?.name}</span></h1>
                <Button 
                  isLoading={loadingAddTrail.state}
                  onClick={handleAddTrailInUser}
                  loadingSize="1.2rem"
                >
                  <BiListPlus/> Adicionar trilha
                </Button>
              </div>
              <p>{trailInfo?.description}</p>
            </aside>
          </TrailInfo>
        ) : (
          <TrailInfo>
            <div>
              <img src={userTrail.trail.avatar_url || jsImg} alt={userTrail.trail.name} />
              <span><MdPlaylistPlay /> 12 playlists </span>
              <span><MdOndemandVideo /> 154 aulas </span>
              <span><MdComputer /> 12 exercícios </span>
              <span><FaUserFriends /> 36 alunos </span>
            </div>
            <aside>
              <div>
                <h1>Trilha de <span>{userTrail.trail.name}</span></h1>
                <Button 
                  isLoading={loadingRemoveTrail.state}
                  loadingSize="1.2rem"
                  onClick={handleRemoveTrailInUser}
                >
                  <BiListMinus/> Remover trilha
                </Button>
              </div>
              <p>{trailInfo?.description}</p>
            </aside>
          </TrailInfo>
        )}
          
        <PlayListAndExerciciesContainer>
          {listAllPlaylistByTrail.map(playlist => (
            <PlayListAndExercicie key={playlist.id}>
              <PlayList to={`/trail/${trail_id}/${playlist.id}`} >
                <aside>
                  <div>
                    <h2>{playlist.name}</h2>
                    <span>122 de 144 aulas assistidas</span>
                  </div>
                  <p>{playlist.description}</p>
                </aside>
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
      </Content>
    </ContainerPage>
  );
}