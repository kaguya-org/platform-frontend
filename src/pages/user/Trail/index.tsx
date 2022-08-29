import { Cover } from '@/components/Cover';
import { NoContent } from '@/components/NoContent';
import Lordicon from '@/components/ReactLordicon';
import { SeparatorLine } from '@/components/SeparatorLine';
import { getRandomInt } from '@/utils/getRandomInt';
import { useEffect, useMemo, useState } from 'react';
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

  const quotes = [
    {
      quote: 'Na casa de um rico não há lugar para se cuspir, a não ser em sua cara.',
      philosopher: 'Diógenes de Sínope',
      wikipedia: 'https://pt.wikipedia.org/wiki/Di%C3%B3genes_de_Sinope'
    },
    {
      quote: 'Não se pode pisar duas vezes no mesmo rio.',
      philosopher: 'Heráclito',
      wikipedia: 'https://pt.wikipedia.org/wiki/Heráclito'
    },
    {
      quote: 'O homem só pode ser homem mediante a educação.',
      philosopher: 'Immanuel Kant',
      wikipedia: 'https://pt.wikipedia.org/wiki/Immanuel_Kant'
    },
    {
      quote: 'Ser é ser percebido.',
      philosopher: 'George Berkley',
      wikipedia: 'https://pt.wikipedia.org/wiki/George_Berkeley'
    },
    {
      quote: 'A vida não é um problema a ser resolvido, mas uma realidade a ser experimentada.',
      philosopher: 'Soren Kierkegaard',
      wikipedia: 'https://pt.wikipedia.org/wiki/Søren_Kierkegaard'
    },
    {
      quote: 'É necessário que, ao menos uma vez na vida, você duvide, tanto quanto possível, de todas as coisas.',
      philosopher: 'René Descartes',
      wikipedia: 'https://pt.wikipedia.org/wiki/René_Descartes'
    },
    {
      quote: 'Conhece-te a ti mesmo e conhecerás o universo e os deuses.',
      philosopher: 'Sócrates',
      wikipedia: 'https://pt.wikipedia.org/wiki/Sócrates'
    },
    {
      quote: 'Existe apenas um bem, o saber, e apenas um mal, a ignorância.',
      philosopher: 'Sócrates',
      wikipedia: 'https://pt.wikipedia.org/wiki/Sócrates'
    },
  ];

  const generatedQuote = useMemo(() => {
    const quoteIndex = getRandomInt(0, quotes.length - 1)

    const quote = quotes[quoteIndex]
    
    return quote
  }, [quotes])


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
                  {!trailInfoLoading.state && trailInfo && !(trailInfo.user_trail?.enabled) && (
                      <div className='warn'>
                        <Lordicon 
                          colors={{
                            primary: '#c93464',
                            secondary: '#c93464',
                          }}
                          icon="error"
                          size={70}
                          delay={1000}
                          trigger='loop'  
                        />
                        <strong style={{fontSize: 15, color: '#c93464'}}>Adicione esta trilha antes de acessar as playlists</strong>

                        <SeparatorLine />
                      </ div>

                    )}
                  <header className="trail_info_header">
                    

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
                </S.TrailInfo>
              </S.PrincipalTrailInfo>

              <S.Quotes>
                <Lordicon size={70} icon='book' colors={{
                  primary: '#a90f64',
                  secondary: '#fff'
                }} trigger='loop' delay={3000} />
                <p>"{generatedQuote.quote}" <br /> <strong> <a href={generatedQuote.wikipedia} target={'_blank'} >- {generatedQuote.philosopher} <Lordicon size={40} icon='share' trigger='loop' delay={3000} /></a></strong></p>              
              </S.Quotes>

              <SeparatorLine />
              <S.PlaylistContent>
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

                     <h1>Playlists</h1>
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
                  <div className="image_container">
                    <img 
                        src={
                          trailInfo?.avatar_url ||
                          DEFAULT_TRAIL_IMAGE} 
                        alt={trailInfo?.name} 
                      />
                    <h1>Informações da Trilha</h1>
                  </div>
                  <p>
                    <HiOutlineArrowNarrowRight style={{
                      marginRight: 10
                    }} />
                      Contém {trailInfo?._count.playlists || 0} {trailInfo?._count.playlists === 1 ? 'playlist' : 'playlists'} e {trailInfo?._count.lessons || 0} {trailInfo?._count.lessons === 1 ? 'aula' : 'aulas'} no total.
                  </p>
                  {trailInfo?._count.users && trailInfo?._count.users <= 1 ? (
                    <p>
                      <HiOutlineArrowNarrowRight style={{
                      marginRight: 10
                    }}  />Atualmente {trailInfo?._count.users} aluno faz esta trilha {!userHasTrail && (<>, <span>que tal se juntar a ele?</span></>)}
                    </p>
                  ) : (
                    <p>
                      <HiOutlineArrowNarrowRight style={{
                      marginRight: 10
                    }}  />Atualmente {trailInfo?._count.users} alunos fazem esta trilha {!userHasTrail && (<>, <span>que tal se juntar a eles?</span></>)}
                    </p>
                  )}
                  <SeparatorLine />
                  <S.Community>
                    <h1>Comunidade <Lordicon size={40} icon='confetti' trigger='loop' delay={3000} /></h1>
                    <p>Faça parte da nossa comunidade!</p>
                    
                    <a href="https://discord.gg/3wdCtmMTSx" target={"_blank"}><BsDiscord /> Discord</a>

                  </S.Community>
                </S.FloatRight>
              </S.PlaylistContent>
              
          </S.TrailInfoContainer>

          </S.MainContent>
        </S.Content>
      </S.Container>
    </Cover>
  );
}
