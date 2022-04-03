import { TabContainer, TabItem } from '@/components/Tab';
import { modifyYoutubeUrl, parseToSlugLowerCase } from '@/utils/formatText';
import { useEffect, useLayoutEffect, useState } from 'react';
import { 
  AiFillDislike, 
  AiFillLike, 
  AiOutlineDislike, 
  AiOutlineLike, 
  IoIosArrowDown,
  IoIosArrowUp
} from 'react-icons/all';

import { useParams } from 'react-router';

import {
  BoxProgressBarStep,
  Navbar,
  PagePath
} from '../../../components';
import { useBoolean } from '../../../hooks';
import { api, GlobalType } from '../../../services/api';

import * as S from './styles';

type Params = {
  playlist_name: string;
  trail_name: string;
  block_name?: string;
  classe_name?: string;
}

export function Playlist() {
  const { 
    playlist_name, 
    trail_name,
    block_name,
    classe_name
  } = useParams<Params>();
  const isLiked = useBoolean(true);

  const [blocks, setBlocks] = useState<GlobalType.Block[]>([]);
  
  const [playlist, setPlaylist] = useState<GlobalType.ShowPlaylistResponse | null>(null);
  const [trail, setTrail] = useState<GlobalType.ShowTrailResponse | null>(null);

  const [currentBlock, setCurrentBlock] = useState<GlobalType.Block | null>(null);
  const [currentClasse, setCurrentClasse] = useState<GlobalType.Classe | null>(null);

  async function getBlocks(playlist: GlobalType.ShowPlaylistResponse) {
    try {
      const response = await api.global.playlist_block.listBlocks({
        query: {
          playlist_id: playlist.id
        }
      });

      setCurrentBlock(response.data[0]);
      
      setCurrentClasse(response.data[0].classes[0]);

      setBlocks(response.data);

    } catch (error: any) {
      console.log(error);
    }
  }

  async function getPlaylist() {
    try {
      const get_trail = await api.global.trail.getInfo({
        query: {
          name: trail_name
        }
      });

      setTrail(get_trail.data);

      if(get_trail.data) {
        const response = await api.global.playlist.getInfo({
          query: {
            name: playlist_name,
            trail_id: get_trail.data.id
          }
        });

        getBlocks(response.data);

        setPlaylist(response.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getCurrentClasse() {
    if(block_name && classe_name) {
      const block = blocks.find((where) => {
        return parseToSlugLowerCase(where.name) === parseToSlugLowerCase(block_name);
      });

      if(block) {
        const current_classe = block.classes.find((where) => {
          return parseToSlugLowerCase(where.name) === parseToSlugLowerCase(classe_name)
        });
        
        if(current_classe) {
          setCurrentClasse(current_classe);
        }
      }
    }
  }

  useEffect(() => {
    getPlaylist();
  }, [playlist_name, trail_name]);

  useEffect(() => {
    getCurrentClasse();
  }, [block_name, classe_name, blocks]);

  function handleSetCurrentBlock(block: GlobalType.Block) {
    setCurrentBlock(prevState => {
      if(prevState?.id === block.id) {
        return null;
      }

      return block;
    })
  }

  function setCurrentPath(block: GlobalType.Block, classe: GlobalType.Classe) {
    const base_url = `/trail/${parseToSlugLowerCase(trail?.name)}/playlist/${parseToSlugLowerCase(playlist?.name)}`;
    const block_url = `block/${parseToSlugLowerCase(block.name)}`;
    const classe_url = `classe/${parseToSlugLowerCase(classe.name)}`;

    return `${base_url}/${block_url}/${classe_url}`;
  }

  return (
    <S.Container>
      <Navbar />
      
      <S.Content>
        <PagePath 
          previousPages={[
            {
              title: 'Dashboard',
              to: '/dashboard',
              order: 1,
            },
            {
              title: `${trail?.name}`,
              to: `/trail/${trail?.name}`,
              order: 2,
            }
          ]}
          currentPage={{
            title: `${playlist?.name}`,
          }}
        />
        <S.MainContent>
          <S.CurrentClasseContainer>
            <S.CurrentClasse>
              <iframe 
                src={modifyYoutubeUrl(currentClasse?.link)}
                title={currentClasse?.name}
                frameBorder="0"
                allowFullScreen 
              />

              <div className="classe_counts_container">
                <span className="views_count">315 visualizações</span>

                <div className="likes_deslikes">
                  <span
                    className={isLiked ? 'classe_liked' : ''}>
                      {isLiked ? <AiFillLike /> : <AiOutlineLike />} 
                      20
                  </span>
                  <span
                    className={!isLiked ? 'classe_desliked' : ''}>
                      {!isLiked ? <AiFillDislike /> : <AiOutlineDislike />} 
                      32
                  </span>
                </div>
              </div>
            </S.CurrentClasse>
            <S.ClasseInfo>
              <h1 className="current_classe_title">{currentClasse?.name}</h1>
              <TabContainer>
                <TabItem tabTitle="Descrição">
                  <p>{currentClasse?.description}</p>
                </TabItem>
                <TabItem tabTitle="Artigos">
                  <p>TODO - adicionar artigos mais pra frente</p>
                </TabItem>
              </TabContainer>
            </S.ClasseInfo>
          </S.CurrentClasseContainer>

          <S.BlocksAndClassesContainer>
            {blocks.map(block => (
              <S.BlockAndClasses 
                key={block.id}
              >
                <S.Block onClick={() => handleSetCurrentBlock(block)}>
                  <div className="block_info">
                    <h2 className="block_title">{block.name}</h2>
                    <span className="block_classes_count">
                      {block.classes.length} 
                      {block.classes.length === 1 ? ' aula' : ' aulas'}
                    </span>
                  </div>
                  {block.id === currentBlock?.id ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </S.Block>
                <S.ClassesContainer
                  selectedBlock={block.id === currentBlock?.id}
                >
                  <ul className="classes">
                    {block.classes.map(classe => (
                      <BoxProgressBarStep 
                        isCurrent={classe.id === currentClasse?.id}
                      > 
                        <S.Classe
                          to={setCurrentPath(block, classe)}
                          isCurrent={classe.id === currentClasse?.id}
                        >
                          {classe.name}
                        </S.Classe>
                      </BoxProgressBarStep>
                    ))}
                  </ul>
                </S.ClassesContainer>
              </S.BlockAndClasses>
            ))}
          </S.BlocksAndClassesContainer>
        </S.MainContent>
      </S.Content>
    </S.Container>
  );
}