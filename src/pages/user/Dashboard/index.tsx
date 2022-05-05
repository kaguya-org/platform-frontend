import DEFAULT_TRAIL_IMAGE from '@/assets/images/default_trail.jpg';
import {
  Button, Navbar, ProgressBar, Tooltip
} from '@/components';
import { Cover } from '@/components/Cover';
import { SeparatorLine } from '@/components/LineSeparator';
import { Lordicon } from '@/components/Lordicon';
import { SeeMoreTrails } from '@/components/Modals/SeeMoreTrails';
import { PopoverContainer } from '@/components/PopoverContainer';
import { useAuth, useBoolean } from '@/hooks';
import { parseToSlugLowerCase } from '@/utils/formatText';
import {
  api,
  GlobalType,
  UserType
} from '@/services/api';
import { SHADOW_COLORS } from '@/theme';
import { useModal } from '@tg0/react-modal';
import { useEffect, useMemo, useState } from 'react';
import {
  GoPlus, IoPlaySharp, BiDotsHorizontalRounded
} from 'react-icons/all';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './styles';
import { useToast } from '@/hooks/useToast';
import { Popover } from '@/components/PopoverContainer/Popover';
import { NoContent } from '@/components/NoContent';

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

  const user_trail_loading = useBoolean(true);

  const [user_trails, setUserTrails] = useState<UserType.ListTrailFromUserResponse[]>([]);
  const [other_trails, setOtherTrails] = useState<GlobalType.ListTrailsResponse[]>([]);

  async function addTrailToMyTrails(trail_id: string) {
    try {

      const response = await api.user.trail.addTrailInUser({
        trail_id
      })

      const userTrail = response.data;
      const filteredOtherTrails = other_trails.filter(trail => trail.id !== userTrail.id);

      setOtherTrails([...filteredOtherTrails]);
      setUserTrails([...user_trails, userTrail]);
    } catch(error) {
      addToast({
        appearance: 'error',
        title: 'Erro ao adicionar trilha',
        description: 'Não foi possível adicionar a trilha as suas trilhas'
      })
    } finally {
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
      const trailIndex = other_trails.findIndex(trail => trail.id === trail_id);

      if(trailIndex !== -1) {
        Object.assign(other_trails[trailIndex], props);

        const newOtherTrails = [...other_trails];

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
      const trailIndex = user_trails.findIndex(trail => trail.id === trail_id);

      if(trailIndex !== -1) {
        const newUserTrails = [...user_trails];

        newUserTrails[trailIndex].user_trail.enabled = false;
        
        setUserTrails(newUserTrails);

        await api.user.trail.changeEnabled(trail_id);
      }
    } catch (error) {

    } finally {

    }
  }
  async function destroyOtherTrail(trail_id: string) {
    try {
      const otherTrails = other_trails.filter(trail => trail.id !== trail_id);

      setOtherTrails(otherTrails);

      await api.admin.trail.delete({
        trail_id
      })

    } catch {
      addToast({
        appearance: 'error',
        title: 'Erro ao deletar trilha',
        description: 'Ocorreu um erro ao deletar a trilha, tente novamente mais tarde.'
      })
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
    const get_user_trails = await getUserTrails();
    const get_trails = await getTrails();

    if(get_user_trails && get_trails) {
      user_trail_loading.changeToFalse();
    }
  }

  useEffect(() => {
    initializePage();
  }, []);

  const filter_user_trail = useMemo(() => {
    return user_trails.filter(where => {
      return where.user_trail.enabled;
    });
  }, [user_trails]);
  
  return (
    
    <Cover 
      hasLoading={user_trail_loading.state}
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
                {user_trails.length === 3 && (
                  <button type="button">Ver todas</button>
                )}
              </header>
              <S.MyTrailsContainer>
                {filter_user_trail.map((trail) => (
                  <S.MyTrail to={`/trail/${trail.name}`} key={trail.id}>
                    <header>
                      <img src={trail.avatar_url || DEFAULT_TRAIL_IMAGE} alt={trail.name} />
                      <Button  
                        
                      onClick={(event) => {
                        event.preventDefault();
                        disableUserTrail(trail.id);
                      }} >
                        <Lordicon size={20} icon='trash' />
                      </Button>
                    </header>
                    <span>{trail.name}</span>

                    <ProgressBar percent={trail.user_trail.progress} />
                  </S.MyTrail>
                ))}
              </S.MyTrailsContainer>
              {filter_user_trail.length === 0 && !user_trail_loading.state && (
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
                {other_trails.map((trail, index) => (
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
              {other_trails.length === 0 && !user_trail_loading.state && (
                <S.NoContent>
                  <Lordicon size={80} icon='clock' delay={3000} style={{ marginRight: 15 }} />
                  <span>Aguarde a crição de novas trilhas</span>
                </S.NoContent>
              )}
            {other_trails.length === 6 && (
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
          trails={other_trails}
        />

      </S.Container>
    </Cover>
  );
}
