import { Cover } from '@/components/Cover';
import { NoContent } from '@/components/NoContent';
import Lordicon from '@/components/ReactLordicon';
import { useEffect, useState } from 'react';
import { BsDiscord } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import DEFAULT_TRAIL_IMAGE from '../../../assets/images/default_trail.jpg';
import {
  Button, Navbar, PagePath, ProgressBar
} from '../../../components';
import { useAuth, useBoolean } from '../../../hooks';
import { api, GlobalType } from '../../../services/api';
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

      if(trail.user_trail && trail.user_trail.enabled) {
        userHasTrail.changeToTrue();
      }

    } catch (error) {
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
    }
  }

  async function disableUserTrail() {
    try {
      if(trailInfo) {
        await api.user.trail.changeEnabled(trailInfo.id);
        
        userHasTrail.changeToFalse();
      }
    } catch (error) {
    }
  }


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
                          onClick={async () => {
                            await disableUserTrail();
                            playlistsByTrailLoading.changeToTrue()

                            getTrailInfo().finally(() => {
                              getPlaylistsByTrail().finally(() => {
                                playlistsByTrailLoading.changeToFalse()
                              })
                            })
                          }}
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
                          onClick={async () => { 
                            await createUserTrail();  
                            playlistsByTrailLoading.changeToTrue()

                            getTrailInfo().finally(() => {
                              getPlaylistsByTrail().finally(() => {
                                playlistsByTrailLoading.changeToFalse()
                              })
                            })
                          }}
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
                    {`${trailInfo?.description}`}
                  </p>
                  <p>
                    <HiOutlineArrowNarrowRight style={{
                      marginRight: 10
                    }} /> Contém {trailInfo?._count.playlists} playlists e {trailInfo?._count.lessons} aulas no total.
                  </p>
                  {trailInfo?._count.users && trailInfo?._count.users <= 1 ? (
                    <p>
                      <HiOutlineArrowNarrowRight style={{
                      marginRight: 10
                    }}  /> Atualmente {trailInfo?._count.users} aluno faz esta trilha{!userHasTrail && <>,<span>que tal se juntar a ele?</span></>}
                    </p>
                  ) : (
                    <p>
                      <HiOutlineArrowNarrowRight style={{
                      marginRight: 10
                    }}  /> Atualmente {trailInfo?._count.users} alunos fazem esta trilha{!userHasTrail && <>,<span>que tal se juntar a ele?</span></>}
                    </p>
                  )}
                </S.TrailInfo>
              </S.PrincipalTrailInfo>

              <div className="line_separator"/>
              <div style={{ 
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%'
              }}>
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

                     {!trailInfoLoading.state && trailInfo && !(trailInfo.user_trail?.enabled) && (
                      <>
                        <Lordicon 
                          colors={{
                            primary: '#fff',
                            secondary: '#fff',
                          }}
                          icon="error"
                          size={100}
                          delay={1000}
                          trigger='loop'  
                      />
                      <strong style={{fontSize: 15}}>Adicione esta trilha antes de acessar as playlists</strong>
                      </>

                     )}
                      {playlistsByTrail.length >= 1 ? (
                        playlistsByTrail.map((playlist, index) => (
                          <S.PlayListAndExercicie key={playlist.id}>
                            <S.PlayList disabled={!trailInfo?.user_trail?.enabled} to={`/trail/${trailInfo?.slug}/playlist/${playlist.slug}`}>
                              <div className="playlist_index">
                                <span>{index + 1}</span>
                              </div>
                              <div className="playlist_info">
                                <div>
                                  <h2 className="playlist_title">{playlist.name}</h2>
                                  {/* {userTrail && (
                                    <span className="playlist_lessons_total">122 de 144 aulas assistidas</span>
                                  )} */}
                                </div>
                                <p className="playlist_description">{`${playlist.description}`}</p>
                              </div>
                              {(trailInfo?.user_trail?.enabled) && (
                                <ProgressBar percent={playlist.user_playlist?.progress || 0}/>
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
                <S.FloatRight>
                  <h1>
                  <Lordicon size={60} icon='confetti' trigger='loop' delay={3000} style={{ marginRight: 15 }} />
                    Faça parte da nossa comunidade!</h1>
                  <a href="https://discord.gg/3wdCtmMTSx" target={"_blank"}><BsDiscord /> Discord</a>
                </S.FloatRight>
              </div>
              
          </S.TrailInfoContainer>

          </S.MainContent>
        </S.Content>
      </S.Container>
    </Cover>
  );
}
