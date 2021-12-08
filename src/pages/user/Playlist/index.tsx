import { useCallback, useEffect, useState } from 'react';
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
  SideBar,
  ContainerPage,
  PagePath
} from '../../../components';
import { useBoolean } from '../../../hooks';
import { api, UserType, GlobalType } from '../../../services/api';

import {
  Content,
  CurrentClasseContainer,
  CurrentClasse,
  ClasseInfo,
  BlocksAndClassesContainer,
  BlockAndClasses,
  Block,
  ClassesContainer,
  Classe
} from './styles';

type Params = {
  playlist_id: string;
  trail_id: string;
}

export function Playlist() {
  const { playlist_id, trail_id } = useParams<Params>();
  const isLiked = useBoolean(true);

  const loadingPage = useBoolean(true);

  const [blocks, setBlocks] = useState<GlobalType.ListAllBlocksResponse[]>([]);
  
  const [playlist, setPlaylist] = useState<GlobalType.ShowPlaylistResponse>({} as GlobalType.ShowPlaylistResponse);
  const [trail, setTrail] = useState<GlobalType.ShowTrailResponse>({} as GlobalType.ShowTrailResponse);

  const [selectedBlockId, setSelectedBlockId] = useState('');
  const [currentClasseId, setCurrentClasseId] = useState('');
  const [currentClasse, setCurrentClasse] = useState<GlobalType.Classe>({} as GlobalType.Classe);
 
  useEffect(() => {
    api.global.playlist_block.listAllBlocks({
      playlist_id
    }).then(response => {
      setBlocks(response.data);
      setCurrentClasse({
        ...response.data[0].classes[0],
        link: response.data[0].classes[0].link.replace('watch?v=', 'embed/')
      });
      setCurrentClasseId(response.data[0].classes[0].id);
    });

    api.global.trail.getInfo({trail_id}).then(response => {
      setTrail(response.data);
    });

    api.global.playlist.getInfo({playlist_id}).then(response => {
      setPlaylist(response.data);
    });
  }, []);

  function handleChangeBlocks(block_id: string) {
    setSelectedBlockId(block_id);

    if(selectedBlockId === block_id) {
      setSelectedBlockId('');
    };
  }

  function handleChangeCurrentClasse(classe: GlobalType.Classe) {
    setCurrentClasseId(classe.id);

    const classeModified = {
      ...classe,
      link: classe.link.replace('watch?v=', 'embed/'),
    }

    setCurrentClasse(classeModified);
  }

  return (
    <ContainerPage 
      isLoading={false}
      loadingProps={{
        size: '6.4rem',
      }}
    >
      <SideBar />
      <Content>
        <PagePath 
          previousPages={[
            {
              title: 'Dashboard',
              to: '/dashboard',
              order: 1,
            },
            {
              title: `${trail.name}`,
              to: `/trail/${trail.id}`,
              order: 2,
            }
          ]}
          currentPage={{
            title: `${playlist.name}`,
          }}
        />
        <section>
          <CurrentClasseContainer>
            <CurrentClasse>
              <iframe 
                src={currentClasse.link}
                title={currentClasse.name}
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
            </CurrentClasse>
            <ClasseInfo>
              <h1 className="current_classe_title">{currentClasse.name}</h1>
              <div className="classeInfo_switch_buttons">
                <button>Descrição</button>
                <button>Artigos</button>
              </div>
              <p className="current_classe_description">{currentClasse.description}</p>
            </ClasseInfo>
          </CurrentClasseContainer>

          <BlocksAndClassesContainer>
            {blocks.map(block => (
              <>
                <BlockAndClasses 
                  key={block.id}
                >
                  <Block onClick={() => handleChangeBlocks(block.id)}>
                    <div className="block_info">
                      <h2 className="block_title">{block.name}</h2>
                      <span className="block_classes_count">
                        {block.classes.length} 
                        {block.classes.length === 1 ? ' aula' : ' aulas'}
                      </span>
                    </div>
                    {block.id === selectedBlockId ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </Block>
                  <ClassesContainer
                    selectedBlock={block.id === selectedBlockId}
                  >
                    <ul className="classes">
                      {block.classes.map(classe => (
                        <BoxProgressBarStep 
                          key={classe.id}
                          isCurrent={classe.id === currentClasseId}
                        > 
                          <Classe 
                            isCurrent={classe.id === currentClasseId}
                            type="button"
                            onClick={() => handleChangeCurrentClasse(classe)}
                          >
                            {classe.name}
                          </Classe>
                        </BoxProgressBarStep>
                      ))}
                    </ul>
                  </ClassesContainer>
                </BlockAndClasses>
              </>
            ))}
          </BlocksAndClassesContainer>
        </section>
      </Content>
    </ContainerPage>
  );
}