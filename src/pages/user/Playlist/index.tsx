import { Cover } from '@/components/Cover';
import { TabContainer, TabItem } from '@/components/Tab';
import { useToast } from '@/hooks/useToast';
import { modifyYoutubeUrl } from '@/utils/formatText';
import { useEffect, useState } from 'react';
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
  IoIosArrowDown,
  IoIosArrowUp
} from 'react-icons/all';
import { useNavigate, useParams } from 'react-router';
import {
  BoxProgressBarStep,
  Navbar,
  PagePath
} from '../../../components';
import { useBoolean } from '../../../hooks';
import { api, GlobalType } from '../../../services/api';
import * as S from './styles';

type Params = {
  playlist_slug: string;
  trail_slug: string;
  block_slug?: string;
  lesson_slug?: string;
}

export function Playlist() {
  const { 
    trail_slug,
    playlist_slug, 
    block_slug,
    lesson_slug
  } = useParams<Params>();
  const { addToast } = useToast();
  const navigate_to = useNavigate();

  const isLiked = useBoolean(true);

  const get_current_lesson_loading = useBoolean(true);
  
  const [blocks, setBlocks] = useState<GlobalType.Block[]>([]);
  
  const liked = useBoolean(false);
  const disliked = useBoolean(false);
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  
  const [playlist, setPlaylist] = useState<GlobalType.ShowPlaylistResponse | null>(null);
  const [trail, setTrail] = useState<GlobalType.TrailsResponse | null>(null);

  const [currentBlock, setCurrentBlock] = useState<GlobalType.Block | null>(null);
  const [currentLesson, setCurrentLesson] = useState<GlobalType.ShowLessonResponse | null>(null);

  async function getBlocks(playlist: GlobalType.ShowPlaylistResponse, get_trail: GlobalType.TrailsResponse) {
    try {
      const response = await api.global.playlist_block.listBlocks({
        query: {
          playlist_id: playlist.id
        }
      });

      const currentBlock = response.data[0]

      if(!currentBlock) {
        throw new Error('No block found')
      }

      const currentLesson = response.data[0].lessons[0]

      if(!currentLesson) {
        throw new Error('No lesson found')
      }
      console.log('getCurrentLesson:', currentLesson.id)
      await getCurrentLesson(currentLesson.id)

      setCurrentBlock(currentBlock);

      setBlocks(response.data);
    } catch (error) {
      addToast({
        appearance: 'error',
        description: 'Não foi possível carregar os blocos',
        title: 'Erro'
      })

      navigate_to('/dashboard')
    }
  }

  async function getPlaylist() {
    try {
      const get_trail = await api.global.trail.getInfo({
        query: {
          slug: trail_slug
        }
      });

      const trail = get_trail.data;

      setTrail(trail);

      if(trail) {
        const response = await api.global.playlist.getInfo({
          query: {
            playlist_slug: playlist_slug,
            trail_slug: trail_slug
          }
        });

        getBlocks(response.data, trail);

        setPlaylist(response.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  }

  async function getCurrentLesson(lesson_id?: string) {
    try {
        if((block_slug && lesson_slug) || lesson_id) {
          const { data: lesson  } = await api.global.lesson.show({
            query: {
              ...(lesson_id ? {
                lesson_id
              } : {
                block_slug,
                lesson_slug
              })
            }
          })

          setLikes(lesson._count.likes);
          setDislikes(lesson._count.dislikes);

          setCurrentLesson(lesson);
        }
      } catch {
        addToast({
          title: 'Ops!',
          description: 'Ocorreu um erro ao carregar a aula, tente novamente mais tarde.',
          appearance: 'error'
        })

        navigate_to(`/dashboard`)
      }
      get_current_lesson_loading.changeToFalse();
  }

  useEffect(() => {
    getPlaylist();
  }, [playlist_slug, trail_slug]);

  useEffect(() => {
    getCurrentLesson();
  }, [block_slug, lesson_slug]);

  function handleSetCurrentBlock(block: GlobalType.Block) {
    setCurrentBlock(prevState => {
      if(prevState?.id === block.id) {
        return null;
      }

      return block;
    })
  }

  function setCurrentPath(block: GlobalType.Block, lesson: GlobalType.ShowLessonResponse) {
    const base_url = `/trail/${trail?.slug}/playlist/${playlist?.slug}`;
    const block_url = `block/${block.slug}`;
    const lesson_url = `lesson/${lesson.slug}`;

    return `${base_url}/${block_url}/${lesson_url}`;
  }

  return (
    <Cover
      hasLoading={get_current_lesson_loading.state}
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
              },
              {
                title: `${trail?.name}`,
                to: `/trail/${trail?.slug}`,
                order: 2,
              }
            ]}
            currentPage={{
              title: `${playlist?.name}`,
            }}
          />
          <S.MainContent>
            <S.CurrentLessonContainer>
              <S.CurrentLesson>
                <iframe 
                  src={modifyYoutubeUrl(currentLesson?.link)}
                  title={currentLesson?.name}
                  frameBorder="0"
                  allowFullScreen 
                />

                <div className="lesson_counts_container">
                  <span className="views_count">{currentLesson?._count?.views} visualizações</span>

                  <div className="likes_deslikes">
                    <span
                      className={isLiked ? 'lesson_liked' : ''}>
                        {isLiked ? <AiFillLike /> : <AiOutlineLike />} 
                        <span>
                          {likes}
                        </span>
                    </span>
                    <span
                      className={!isLiked ? 'lesson_desliked' : ''}>
                        {!isLiked ? <AiFillDislike /> : <AiOutlineDislike />} 
                        <span>
                          {dislikes}
                        </span>
                    </span>
                  </div>
                </div>
              </S.CurrentLesson>
              <S.LessonInfo>
                <h1 className="current_lesson_title">{currentLesson?.name}</h1>
                <TabContainer>
                  <TabItem tabTitle="Descrição">
                    <p>{currentLesson?.description}</p>
                  </TabItem>
                  <TabItem tabTitle="Artigos">
                    <p>TODO - adicionar artigos mais pra frente</p>
                  </TabItem>
                </TabContainer>
              </S.LessonInfo>
            </S.CurrentLessonContainer>

            <S.BlocksAndLessonsContainer>
              {blocks.map(block => (
                <S.BlockAndLessons 
                  key={block.id}
                >
                  <S.Block onClick={() => handleSetCurrentBlock(block)}>
                    <div className="block_info">
                      <h2 className="block_title">{block.name}</h2>
                      <span className="block_lessons_count">
                        {block.lessons.length} 
                        {block.lessons.length === 1 ? ' aula' : ' aulas'}
                      </span>
                    </div>
                    {block.id === currentBlock?.id ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}
                  </S.Block>
                  <S.LessonsContainer
                    selectedBlock={block.id === currentBlock?.id}
                  >
                    <ul className="lessons">
                      {block.lessons.map(lesson => (
                        <BoxProgressBarStep
                          key={lesson.id}
                          isCurrent={lesson.id === currentLesson?.id}
                        > 
                          <S.Lesson
                            $isCurrent={lesson.id === currentLesson?.id}
                            to={setCurrentPath(block, lesson)}
                          >
                            {lesson.name}
                          </S.Lesson>
                        </BoxProgressBarStep>
                      ))}
                    </ul>
                  </S.LessonsContainer>
                </S.BlockAndLessons>
              ))}
            </S.BlocksAndLessonsContainer>
          </S.MainContent>
        </S.Content>
      </S.Container>
    </Cover>
  );
}