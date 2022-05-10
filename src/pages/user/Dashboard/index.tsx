import DEFAULT_TRAIL_IMAGE from '@/assets/images/default_trail.jpg';
import {
  Button, Navbar, ProgressBar, Tooltip
} from '@/components';
import { Cover } from '@/components/Cover';
import { SeeMoreTrails } from '@/components/Modals/SeeMoreTrails';
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
import { SHADOW_COLORS } from '@/theme';
import { parseToSlugLowerCase } from '@/utils/formatText';
import { useModal } from '@tg0/react-modal';
import { useEffect, useMemo, useState } from 'react';
import { BiDotsHorizontalRounded, GoPlus, IoPlaySharp } from 'react-icons/all';
import { Lordicon } from 'react-lordicon';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './styles';

type ApiError = {
  status: string;
  message: string;
  statusCode: number;
}

export function Dashboard() {
  const { user, isSubAdmin } = useAuth();

  const seeMoreTrailsModal = useModal(false);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const userTrailLoading = useBoolean(true);
  const disableUserTrailLoading = useBoolean(false);
  const destroyOtherTrailLoading = useBoolean(false);
  const addTrailToMyTrailsLoading = useBoolean(false);

  const [userTrails, setUserTrails] = useState<UserType.ListTrailFromUserResponse[]>([]);
  const [otherTrails, setOtherTrails] = useState<GlobalType.TrailsResponse[]>([]);

  const filteredUserTrails = useMemo(() => {
    return userTrails.filter(where => {
      return where.user_trail.enabled;
    });
  }, [userTrails]);

  async function addTrailToMyTrails(trail_id: string) {
    try {
      addTrailToMyTrailsLoading.changeToTrue();

      const response = await api.user.trail.addTrailInUser({
        trail_id
      })

      const myTrail = response.data;

      const filteredOtherTrails = otherTrails.filter(trail => {
        return trail.id !== myTrail.id
      });

      setOtherTrails([...filteredOtherTrails]);
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

  async function getUserTrails() {
    try {
      // TODO: Passar params take para pegar no máximo 3
      const response = await api.user.trail.listTrailsFromUser();

      setUserTrails(response.data);

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
      disableUserTrailLoading.changeToTrue()
      
      const trailIndex = filteredUserTrails.findIndex(trail => trail.id === trail_id);

      if(trailIndex !== -1) {
        const newUserTrails = [...filteredUserTrails];

        newUserTrails[trailIndex].user_trail.enabled = false;
        
        setUserTrails(newUserTrails);

        await api.user.trail.changeEnabled(trail_id);


        const { data: trail } = await api.global.trail.getInfo({
          query: {
            trail_id
          }
        });

        setOtherTrails([trail, ...otherTrails]);
      }
    } catch (error) {
      addToast({
        appearance: 'error',
        title: 'Erro ao disabilitar trilha',
        description: 'Ocorreu um erro ao disabilitar a trilha, tente novamente mais tarde.'
      })
    } finally {
      disableUserTrailLoading.changeToFalse()
    }
  }

  async function destroyOtherTrail(trail_id: string) {
    try {
      destroyOtherTrailLoading.changeToTrue()

      const filteredOtherTrails = otherTrails.filter(trail => trail.id !== trail_id);

      setOtherTrails(filteredOtherTrails);

      await api.admin.trail.delete({
        trail_id
      })

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

      return {
        data: response.data
      }
    } catch (error: any) {
      return {
        error: error as ApiError
      }
    }
  }

  async function initializePage() {
    const userTrails = await getUserTrails();
    const trails = await getTrails();

    if(userTrails && trails) {
      userTrailLoading.changeToFalse();
    }
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
            <S.LastClasse to="#">
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
            </S.LastClasse>

            <div className="line_separator" />

            <S.MyTrailsSection>
              <header>
                <h1> Minhas trilhas </h1>
                {userTrails.length === 3 && (
                  <button type="button">Ver todas</button>
                )}
              </header>
              <S.MyTrailsContainer>
                {filteredUserTrails.map((trail) => (
                  <S.MyTrail to={`/trail/${trail.name}`} key={trail.id}>
                    <header>
                      <img src={trail.avatar_url || DEFAULT_TRAIL_IMAGE} alt={trail.name} />
                      <Button  
                        disabled={disableUserTrailLoading.state}
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
              {filteredUserTrails.length === 0 && !userTrailLoading.state && (
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
                        to={`/trail/${parseToSlugLowerCase(trail.name)}`} className="trail_information"
                      >
                        <h2 className="title">{trail.name}</h2>

                        <span>{trail._count.playlists} playlists</span>
                        <span>{trail._count.classes} aulas</span>
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
                                    <span>Adicionar as minhas trilhas</span>
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
                            navigate(`/trail/${parseToSlugLowerCase(trail.name)}`)
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
              <div style={{
                position: 'relative',
                zIndex: 3,
                top: '-20px',
              }}>
                <Tooltip showIcon={false} title='Ver mais' >
                  <Button
                    style={{
                      boxShadow: `2px 2px 10px ${SHADOW_COLORS.BLACK_OPACITY_10}, -2px -2px 10px ${SHADOW_COLORS.BLACK_OPACITY_10}`,
                    }}
                    className="see_more_trails"
                    onClick={() => seeMoreTrailsModal.handleOpen()}
                  >
                    <GoPlus />
                  </Button>
                </Tooltip>
              </div>
            )}
            </S.OtherTrailsSection>
          </S.RightContent>

        </S.Content>

        <SeeMoreTrails 
          isOpen={seeMoreTrailsModal.state}
          handleClose={seeMoreTrailsModal.handleClose}
          trails={otherTrails}
        />

      </S.Container>
    </Cover>
  );
}
