import DEFAULT_TRAIL_IMAGE from '@/assets/images/default_trail.jpg';
import {
  Button, Navbar, ProgressBar
} from '@/components';
import { Cover } from '@/components/Cover';
import { ModalContainer } from '@/components/ModalContainer';
import { SeeMoreTrails } from '@/components/ModalContainer/SeeMoreTrails';
import { NoContent } from '@/components/NoContent';
import { PopoverContainer } from '@/components/PopoverContainer';
import { SeparatorLine } from '@/components/SeparatorLine';
import { useAuth, useBoolean } from '@/hooks';
import { useToast } from '@/hooks/useToast';
import {
  api,
  GlobalType,
  UserType
} from '@/services/api';
import { useEffect, useState } from 'react';
import { BiDotsHorizontalRounded, BiPlus, IoPlaySharp } from 'react-icons/all';
import { Lordicon } from 'react-lordicon';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './styles';

type ApiError = {
  status: string;
  message: string;
  statusCode: number;
}

type GetUserTrailsParams = {
  skip?: number;
  take?: number;
}

export function Dashboard() {
  const { user, isSubAdmin } = useAuth();

  const navigate = useNavigate();
  const { addToast } = useToast();

  const [disableUserTrailUniqLoading, setDisableUserTrailUniqLoading] = useState<string | null>(null);

  const userTrailLoading = useBoolean(true);
  const destroyOtherTrailLoading = useBoolean(false);
  const addTrailToMyTrailsLoading = useBoolean(false);

  const [userTrails, setUserTrails] = useState<UserType.ListTrailFromUserResponse[]>([]);
  const [otherTrails, setOtherTrails] = useState<GlobalType.TrailsResponse[]>([]);
  const [trailsCache, setTrailsCache] = useState<GlobalType.TrailsResponse[]>([]);
  const [history, setHistory] = useState<GlobalType.ShowHistoryResponse | null>(null);


  async function addTrailToMyTrails(trail_id: string) {
    try {
      addTrailToMyTrailsLoading.changeToTrue();

      const { data: myTrail } = await api.user.trail.addTrailInUser({
        trail_id
      })

      await getTrails()
      
      setUserTrails([...userTrails, myTrail]);

      addToast({
        appearance: 'success',
        title: 'Trilha adicionada em "Minhas trilhas"',
      })
    } catch(error) {
      addToast({
        appearance: 'error',
        title: 'Erro ao adicionar trilha',
        description: 'Não foi possível adicionar a trilha as suas trilhas'
      })
    } finally {
      addTrailToMyTrailsLoading.changeToFalse();
    }
  }

  async function getUserTrails(data?: GetUserTrailsParams) {
    try {
      const response = await api.user.trail.listTrailsFromUser();

      setUserTrails([...response.data]);

      return {
        data: response.data
      };
    } catch (error) {
      return {
        error: error as ApiError
      };
    }
  }
  
  async function updateOtherTrail(trail_id: string) {
    const props = {
      description: 'TypeScript description',
      name: 'TypeScript..x',
    }

    try {
      const trailIndex = otherTrails.findIndex(trail => trail.id === trail_id);

      if(trailIndex !== -1) {
        Object.assign(otherTrails[trailIndex], props);

        const newOtherTrails = [...otherTrails];

        setOtherTrails(newOtherTrails);

        await api.admin.trail.update({
          trail_id,
          ...props
        })
      }

    } catch {
      addToast({
        appearance: 'error',
        title: 'Erro ao atualizar trilha',
        description: 'Ocorreu um erro ao atualizar a trilha, tente novamente mais tarde.'
      })
    }
  }

  async function disableUserTrail(trail_id: string) {
    try {
      setDisableUserTrailUniqLoading(trail_id);
      
      const trailIndex = userTrails.findIndex(trail => trail.id === trail_id);

      if(trailIndex !== -1) {
        
        await api.user.trail.changeEnabled(trail_id);

        await getUserTrails()


        const { data: trail } = await api.global.trail.getInfo({
          query: {
            trail_id
          }
        });


        if(otherTrails.length < 6) {
          setOtherTrails([trail, ...otherTrails]);
        }
      }
    } catch (error) {
      addToast({
        appearance: 'error',
        title: 'Erro ao disabilitar trilha',
        description: 'Ocorreu um erro ao disabilitar a trilha, tente novamente mais tarde.'
      })
    } finally {
      setDisableUserTrailUniqLoading(null)
    }
  }

  async function destroyOtherTrail(trail_id: string) {
    try {
      destroyOtherTrailLoading.changeToTrue()

      await api.admin.trail.delete({
        trail_id
      })


      await getTrails()

    } catch {
      addToast({
        appearance: 'error',
        title: 'Erro ao deletar trilha',
        description: 'Ocorreu um erro ao deletar a trilha, tente novamente mais tarde.'
      })
    } finally {
      destroyOtherTrailLoading.changeToFalse()
    }
  }

  async function getTrails() {
    try {
      const response = await api.global.trail.list({
        take: 6,
        exclude_my_trails: true,
        order: 'desc'
      });

      setOtherTrails(response.data);

    } catch (error) {
      addToast({
        appearance: 'error',
        title: 'Erro ao listar trilhas',
        description: 'Ocorreu um erro ao listar as trilhas, tente novamente mais tarde.'
      })
    }
  }

  async function getHistory() {
    try {
      const { data: _history } = await api.global.history.show();


      setHistory(_history)

    } catch (error) {
      addToast({
        appearance: 'error',
        title: 'Erro ao carregar histórico',
        description: 'Ocorreu um erro ao carregar o histórico, tente novamente mais tarde.'
      })
    }
  }

  async function initializePage() {
    await getUserTrails();
    await getTrails();
    await getHistory();

    userTrailLoading.changeToFalse();
  }

  useEffect(() => {
    initializePage();
  }, []);

  return (
    <Cover 
      hasLoading={userTrailLoading.state}
    >
      <S.Container>
        <Navbar />
        <S.Content>
          <S.LeftContent>
            <S.Welcome>
              <div>
                <span>
                  Olá, {user?.name || user?.username}
                </span>
                <h1>Vamos estudar o que hoje? </h1>
              </div>
            </S.Welcome>

            {/* TODO - create a history api */}
            <S.LastLesson to={history?.redirect || '#'}>
              <div className="last_lesson_information">
                <img src={history?.trail.avatar_url || DEFAULT_TRAIL_IMAGE} alt="a" />
                <div>
                  <h2 className="title">{history?.lesson.name}</h2>
                  <span className="trail_name">{history?.playlist.name}</span>
                </div>
              </div>
              <strong>
                {history?.auto_generated ? 'Recomendamos para você' : 'Continuar Assistindo'}
                <span>
                  <IoPlaySharp />
                </span>
              </strong>
            </S.LastLesson>

            <div className="line_separator" />

            <S.MyTrailsSection>
              <header>
                <h1> Minhas trilhas </h1>
              </header>
              <S.MyTrailsContainer>
                {userTrails.map((trail) => (
                  <S.MyTrail to={`/trail/${trail.slug}`} key={trail.id}>
                    <header>
                      <img src={trail.avatar_url || DEFAULT_TRAIL_IMAGE} alt={trail.name} />
                      <Button  
                        loadingType='circle'
                        isLoading={disableUserTrailUniqLoading === trail.id}
                        onClick={(event) => {
                          event.preventDefault();

                          disableUserTrail(trail.id);
                        }} 
                      >
                        <Lordicon size={20} trigger='hover' icon='trash'  />
                      </Button>
                    </header>
                    <span>{trail.name}</span>

                    <ProgressBar percent={trail.user_trail.progress} />
                  </S.MyTrail>
                ))}
              </S.MyTrailsContainer>
              {userTrails.length === 0 && !userTrailLoading.state && (
                <NoContent />
              )}
            </S.MyTrailsSection>
          </S.LeftContent>

          <S.RightContent>
            <S.OtherTrailsSection>
              <div>
                <header className="other_trails_header">
                  <h1 className="other_trails_header_title">Outras trilhas</h1>
                 
                </header>
                <SeparatorLine />
              </div>
              <S.OtherTrailsContainer>
                {otherTrails.map((trail, index) => (
                  <S.OtherTrail isSubAdmin={isSubAdmin} key={trail.id} >
                    <img 
                      src={trail.avatar || DEFAULT_TRAIL_IMAGE} 
                      alt={trail.name} 
                    />

                    <div className="trail_information_container">
                      <Link 
                        to={`/trail/${trail.slug}`} className="trail_information"
                      >
                        <h2 className="title">{trail.name}</h2>

                        <span>{trail._count.playlists} playlists</span>
                        <span>{trail._count.lessons} aulas</span>
                      </Link>

                      <div className="trail_actions">
                            <PopoverContainer 
                              style={{
                                marginBottom: 20
                              }} 
                              triggerContent={<BiDotsHorizontalRounded  />} 
                              content={(
                                <S.OtherTrailsActions>
                                  <Button 
                                    styleType='quaternary' 
                                    onClick={() => addTrailToMyTrails(trail.id)}
                                  >
                                    <span>Adicionar a "Minhas trilhas"</span>
                                    <Lordicon icon='addCard' trigger='hover' size={40} />
                                  </Button>
                                  {isSubAdmin && (
                                    <>
                                      <Button 
                                        styleType='quaternary' 
                                        onClick={() => updateOtherTrail(trail.id)}
                                      >
                                        <span>Editar trilha</span>
                                        <Lordicon icon='edit' trigger='hover' size={40} />
                                      </Button>
                                      <Button 
                                        disabled={destroyOtherTrailLoading.state}
                                        styleType='quaternary' 
                                        onClick={() => destroyOtherTrail(trail.id)}
                                      >
                                        <span>Deletar trilha</span>
                                        <Lordicon icon='bin' trigger='hover' size={40}  />
                                      </Button>
                                    </>
                                  )}
                                </S.OtherTrailsActions>
                              )} 
                            />
                            
                        <Button 
                          onClick={() => 
                            navigate(`/trail/${trail.slug}`)
                          }
                        >
                          <Lordicon 
                            icon='flatArrow' 
                            size={30} 
                            trigger='hover' 
                          />
                        </Button>
                      </div>
                    </div>
                  </S.OtherTrail>
                ))}
              </S.OtherTrailsContainer>
              {otherTrails.length === 0 && !userTrailLoading.state && (
                <S.NoContent>
                  <Lordicon size={80} icon='clock' delay={3000} style={{ marginRight: 15 }} />
                  <span>Aguarde a crição de novas trilhas</span>
                </S.NoContent>
              )}
            {otherTrails.length === 6 && (
                <ModalContainer 
                  type='quiternary'
                  triggerContent={
                    <>
                      <BiPlus />
                      Ver mais
                    </>
                  } 
                  content={
                    <SeeMoreTrails 
                      trailsCache={trailsCache} 
                      setTrailsCache={setTrailsCache}  
                    />
                  }
                />
            )}
            </S.OtherTrailsSection>
          </S.RightContent>

        </S.Content>
      </S.Container>
    </Cover>
  );
}
