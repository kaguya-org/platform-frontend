import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { 
  BiListPlus, 
  BiListMinus,
  HiOutlineArrowNarrowRight,
} from 'react-icons/all';

import {
  ProgressBar,
  Navbar,
  Button,
  PagePath
} from '../../../components';

import { api, UserType, GlobalType } from '../../../services/api';

import { useBoolean } from '../../../hooks';

import DEFAULT_TRAIL_IMAGE from '../../../assets/images/default_trail.jpg';

import * as S from './styles';
import { parseToSlugLowerCase } from '@/utils/formatText';

type LocationParams = {
  trail_name?: string;
}
  
export function Trail() {
  const loadingAddTrail = useBoolean(false);
  const loadingRemoveTrail = useBoolean(false);
  const user_has_trail = useBoolean(false);

  const { trail_name } = useParams<LocationParams>();
  const [user_trail, setUserTrail] = useState<UserType.ListTrailFromUserResponse | null>(null);
  const [trail_info, setTrailInfo] = useState<GlobalType.ShowTrailResponse | null>(null);
  const [playlists_by_trail, setPlaylistsByTrail] = useState<GlobalType.ListAllPlaylistsByTrailResponse[]>([]);

  async function getTrailInfo() {
    try {
      const response = await api.global.trail.getInfo({
        query: {
          name: trail_name
        }
      });

      setTrailInfo(response.data);

    } catch (error: any) {
      console.log(error);
    }
  }
  
  async function getPlaylistsByTrail() {
    try {
      const response = await api.global.playlist.listAllByTrail({
        query: {
          trail_id: trail_info?.id,
        }
      });

      setPlaylistsByTrail(response.data);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTrailInfo();
  }, []);

  useEffect(() => {
    if(trail_info) {
      getPlaylistsByTrail();
    }
  }, [trail_info]);

  async function handleCreateUserTrail() {
    try {
      if(trail_info) {
        const response = await api.user.trail.addTrailInUser({
          trail_id: trail_info?.id
        });

        if(response.data) {
          user_has_trail.changeToTrue();
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async function handleDisabledUserTrail() {
    try {
      if(trail_info) {
        const response = await api.user.trail.addTrailInUser({
          trail_id: trail_info?.id
        });

        if(response.data) {
          user_has_trail.changeToTrue();
        }
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <S.Container>
      <Navbar />
      <S.Content>
        <PagePath
          previousPages={[
            {
              title: 'Dashborad',
              to: '/dashboard',
              order: 1,
            }
          ]}
          currentPage={{
            title: trail_info?.name
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
                      trail_info?.avatar_url ||
                      DEFAULT_TRAIL_IMAGE} 
                    alt={trail_info?.name} 
                  />

                  <div className="trail_name_and_user_action">
                    <h1 className="trail_title">Trilha de 
                      <span className="trail_title">
                        {trail_info?.name}
                      </span>
                    </h1>
                    {user_has_trail.state && !user_trail?.user_trail.enabled ? (
                      <Button 
                        isLoading={loadingRemoveTrail.state}
                        title="Desativar trilha"
                      >
                        <BiListMinus/> <span>Desativar trilha</span>
                      </Button>
                    ) : (
                      <Button 
                        isLoading={loadingAddTrail.state}
                        title="Adicionar trilha"
                        onClick={handleCreateUserTrail}
                      >
                        <BiListPlus/> <span>Adicionar trilha</span>
                      </Button>
                    )}
                  </div>
                </header>
                <p className="trail_description">
                  {trail_info?.description}
                </p>
              </S.TrailInfo>
            </S.PrincipalTrailInfo>

            <div className="line_separator"/>

            {playlists_by_trail.length >= 1 && (
              <S.PlayListAndExerciciesContainer>
                {playlists_by_trail.map((playlist, index) => (
                  <S.PlayListAndExercicie key={playlist.id}>
                    <S.PlayList to={`/trail/${parseToSlugLowerCase(trail_info?.name)}/playlist/${parseToSlugLowerCase(playlist.name)}`}>
                      <div className="playlist_index">
                        <span>{index + 1}</span>
                      </div>
                      <div className="playlist_info">
                        <div>
                          <h2 className="playlist_title">{playlist.name}</h2>
                          {user_trail && (
                            <span className="playlist_classes_total">122 de 144 aulas assistidas</span>
                          )}
                        </div>
                        <p className="playlist_description">{playlist.description}</p>
                      </div>
                      {user_trail && (
                        <ProgressBar percent={user_trail.user_trail.progress}/>
                      )}
                    </S.PlayList>
                  </S.PlayListAndExercicie>
                ))}
              </S.PlayListAndExerciciesContainer>
            )}
          </S.TrailInfoContainer>

          <S.OtherTrailInfo>
            <header>
              <h1>Outras informações desta trilha</h1>
            </header>

            <div className="others_trail_info_container">
              <p>
                <HiOutlineArrowNarrowRight /> Contém {trail_info?._count.playlists} playlists e {trail_info?._count.classes} aulas no total.
              </p>
              {trail_info?._count.users && trail_info?._count.users <= 1 ? (
                <p>
                  <HiOutlineArrowNarrowRight /> Atualmente {trail_info?._count.users} aluno faz está trilha, <span>que tal se juntar a ele?</span>
                </p>
              ) : (
                <p>
                  <HiOutlineArrowNarrowRight /> Atualmente {trail_info?._count.users} alunos fazem está trilha, <span>que tal se juntar a eles?</span>
                </p>
              )}
            </div>
          </S.OtherTrailInfo>

        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}
