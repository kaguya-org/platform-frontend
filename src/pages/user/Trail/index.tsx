import { Cover } from '@/components/Cover';
import { NoContent } from '@/components/NoContent';
import { useEffect, useState } from 'react';
import {
  HiOutlineArrowNarrowRight
} from 'react-icons/all';
import Lordicon from 'react-lordicon';
import { useParams } from 'react-router';
import DEFAULT_TRAIL_IMAGE from '../../../assets/images/default_trail.jpg';
import {
  Button, Navbar, PagePath, ProgressBar
} from '../../../components';
import { useAuth, useBoolean } from '../../../hooks';
import { api, GlobalType, UserType } from '../../../services/api';
import * as S from './styles';

type LocationParams = {
  trail_slug?: string;
}
  
export function Trail() {
  const { loading_page } = useAuth();

  const loadingAddTrail = useBoolean(false);
  const loadingRemoveTrail = useBoolean(false);
  const userHasTrail = useBoolean(false);

  const trailInfoLoading = useBoolean(true);
  const playlistsByTrailLoading = useBoolean(true);

  const { trail_slug } = useParams<LocationParams>();
  const [userTrail, setUserTrail] = useState<UserType.ListTrailFromUserResponse | null>(null);
  const [trailInfo, setTrailInfo] = useState<GlobalType.TrailsResponse | null>(null);
  const [playlistsByTrail, setPlaylistsByTrail] = useState<GlobalType.ListAllPlaylistsByTrailResponse[]>([]);

  async function getTrailInfo() {
    try {
      const { data: trail } = await api.global.trail.getInfo({
        query: {
          slug: trail_slug
        }
      });

      setTrailInfo(trail);

      console.log('sjahgdjhags', trail.user_trail)
      if(trail.user_trail && trail.user_trail.enabled) {
        userHasTrail.changeToTrue();
      }

    } catch (error) {
      console.log(error);
    } finally {
      trailInfoLoading.changeToFalse();
    }
  }
  
  async function getPlaylistsByTrail() {
    try {
      const response = await api.global.playlist.listAllByTrail({
        query: {
          trail_id: trailInfo?.id,
        }
      });

      setPlaylistsByTrail(response.data);
    } catch (error: any) {
      console.log(error);
    } finally {
      playlistsByTrailLoading.changeToFalse();
    }
  }

  useEffect(() => {
    getTrailInfo();
  }, []);

  useEffect(() => {
    if(trailInfo) {
      getPlaylistsByTrail();
    }
  }, [trailInfo]);

  async function createUserTrail() {
    try {
      if(trailInfo) {
        const { data: trail } = await api.user.trail.addTrailInUser({
          trail_id: trailInfo?.id
        });
        

        if(trail.user_trail && trail.user_trail.enabled) {
          userHasTrail.changeToTrue();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function disableUserTrail() {
    try {
      if(trailInfo) {
        await api.user.trail.changeEnabled(trailInfo.id);
        
        userHasTrail.changeToFalse();
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(userHasTrail.state)

  return (
    <Cover
      hasLoading={trailInfoLoading.state && !loading_page}
    >
      <S.Container>
        <Navbar />
        
        <S.Content>
          <PagePath
            previousPages={[
              {
                title: 'Dashboard',
                to: '/dashboard',
                order: 1,
              }
            ]}
            currentPage={{
              title: trailInfo?.name
            }}
          />
          <S.MainContent>
            <S.TrailInfoContainer>
              <S.PrincipalTrailInfo>
                <S.TrailInfo>
                  <header className="trail_info_header">
                    <img 
                      className="trail_image"
                      src={
                        trailInfo?.avatar_url ||
                        DEFAULT_TRAIL_IMAGE} 
                      alt={trailInfo?.name} 
                    />

                    <div className="trail_name_and_user_action">
                      <h1 className="trail_title">Trilha de 
                        <span className="trail_title">
                          {trailInfo?.name}
                        </span>
                      </h1>
                      {userHasTrail.state ? (
                        <Button 
                          isLoading={loadingRemoveTrail.state}
                          title={`Remover trilha`}
                          onClick={() => disableUserTrail()}
                        >
                          <Lordicon 
                            trigger='hover'
                            icon='trash'
                          /> <span>Remover trilha</span>
                        </Button>
                      ) : (
                        <Button 
                          isLoading={loadingAddTrail.state}
                          title="Adicionar trilha"
                          onClick={createUserTrail}
                        >
                          <Lordicon 
                            trigger='hover'
                            icon='addCard'
                          /> <span>Adicionar trilha</span>
                        </Button>
                      )}
                    </div>
                  </header>
                  <p className="trail_description">
                    {trailInfo?.description}
                  </p>
                </S.TrailInfo>
              </S.PrincipalTrailInfo>

              <div className="line_separator"/>

              <S.PlayListAndExerciciesContainer>
                {playlistsByTrailLoading.state ? (
                  <Cover
                    style={{
                      position: 'relative',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                    hasLoading={playlistsByTrailLoading.state}
                  />    
                 
                ): (
                  <>
                    {playlistsByTrail.length >= 1 ? (
                      playlistsByTrail.map((playlist, index) => (
                        <S.PlayListAndExercicie key={playlist.id}>
                          <S.PlayList to={`/trail/${trailInfo?.slug}/playlist/${playlist.slug}`}>
                            <div className="playlist_index">
                              <span>{index + 1}</span>
                            </div>
                            <div className="playlist_info">
                              <div>
                                <h2 className="playlist_title">{playlist.name}</h2>
                                {userTrail && (
                                  <span className="playlist_lessons_total">122 de 144 aulas assistidas</span>
                                )}
                              </div>
                              <p className="playlist_description">{playlist.description}</p>
                            </div>
                            {userTrail && (
                              <ProgressBar percent={userTrail.user_trail.progress}/>
                            )}
                          </S.PlayList>
                        </S.PlayListAndExercicie>
                      ))
                    ) : (
                      <NoContent text="Aguarde a criação de novas playlists"/>
                    )}
                  </>
                )}
              </S.PlayListAndExerciciesContainer>
          </S.TrailInfoContainer>

            <S.OtherTrailInfo>
              <header>
                <h1>Outras informações desta trilha</h1>
              </header>

              <div className="others_trail_info_container">
                <p>
                  <HiOutlineArrowNarrowRight /> Contém {trailInfo?._count.playlists} playlists e {trailInfo?._count.lessons} aulas no total.
                </p>
                {trailInfo?._count.users && trailInfo?._count.users <= 1 ? (
                  <p>
                    <HiOutlineArrowNarrowRight /> Atualmente {trailInfo?._count.users} aluno faz está trilha, <span>que tal se juntar a ele?</span>
                  </p>
                ) : (
                  <p>
                    <HiOutlineArrowNarrowRight /> Atualmente {trailInfo?._count.users} alunos fazem está trilha, <span>que tal se juntar a eles?</span>
                  </p>
                )}
              </div>
            </S.OtherTrailInfo>

          </S.MainContent>
        </S.Content>
      </S.Container>
    </Cover>
  );
}
