import { useEffect, useMemo, useState } from 'react';
import { useModal } from '@tg0/react-modal';

import {
  IoPlaySharp,
} from 'react-icons/all';

import { 
  ProgressBar,
  Navbar,
} from '@/components';

import { useAuth } from '@/hooks';

import { 
  api,
  GlobalType, 
  UserType,
} from '@/services/api';

import { SeeMoreTrails } from '@/components/Modals/SeeMoreTrails';

import DEFAULT_TRAIL_IMAGE from '@/assets/images/default_trail.jpg';

import * as S from './styles';

export function Dashboard() {
  const { user } = useAuth();

  const seeMoreTrailsModal = useModal(false);

  const [user_trails, setUserTrails] = useState<UserType.ListTrailFromUserResponse[]>([]);
  const [other_trails, setOtherTrails] = useState<GlobalType.ListTrailsResponse[]>([]);

  async function getUserTrails() {
    try {
      // TODO: Passar params take para pegar no máximo 3
      const response = await api.user.trail.listTrailsFromUser();

      setUserTrails(response.data);
    } catch (error: any) {
      console.log(error.message);
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
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getUserTrails();
    getTrails();
  }, []);

  const filter_user_trail = useMemo(() => {
    return user_trails.filter(where => {
      return where.user_trail.enabled;
    });
  }, [user_trails]);

  return (
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
                <S.MyTrail to={`/trail/${trail.name}`} key={trail.id} >
                  <header>
                    <img src={trail.avatar_url || DEFAULT_TRAIL_IMAGE} alt={trail.name} />
                  </header>
                  <span>{trail.name}</span>

                  <ProgressBar percent={trail.user_trail.progress} />
                </S.MyTrail>
              ))}
            </S.MyTrailsContainer>
          </S.MyTrailsSection>
        </S.LeftContent>

        <S.RightContent>
          <S.OtherTrailsSection>

            <header className="other_trails_header">
              <h1 className="other_trails_header_title">Outras trilhas</h1>
              {other_trails.length === 6 && (
                <button
                  className="see_more_trails"
                  type="button" 
                  onClick={() => seeMoreTrailsModal.handleOpen()}
                >
                  Ver mais
                </button>
              )}
            </header>

            <S.OtherTrailsContainer>
              {other_trails.map((trail) => (
                <S.OtherTrail to={`/trail/${trail.id}`} key={trail.id} >
                  <img src={trail.avatar || DEFAULT_TRAIL_IMAGE} alt={trail.name} />
                  <div className="trail_information">
                    <h2 className="title">{trail.name}</h2>
                    <span>{trail._count.playlists} playlists - </span>
                    <span>{trail._count.classes} aulas</span>
                  </div>
                </S.OtherTrail>
              ))}
            </S.OtherTrailsContainer>

          </S.OtherTrailsSection>
        </S.RightContent>

      </S.Content>

      <SeeMoreTrails 
        isOpen={seeMoreTrailsModal.state}
        handleClose={seeMoreTrailsModal.handleClose}
        trails={other_trails}
      />

    </S.Container>
  );
}
