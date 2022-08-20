import { Cover } from '@/components/Cover';
import { TabContainer, TabItem } from '@/components/Tab';
import { useToast } from '@/hooks/useToast';
import { Block, Lesson } from '@/services/app_api/global/playlist_block/response';
import { LessonState } from '@/services/app_api/global/types';
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
import { api, baseApi, GlobalType } from '../../../services/api';
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

  const get_current_lesson_loading = useBoolean(true);
  
  const [blocks, setBlocks] = useState<Block[]>([]);
  
  const [playlist, setPlaylist] = useState<GlobalType.ShowPlaylistResponse | null>(null);
  const [trail, setTrail] = useState<GlobalType.TrailsResponse | null>(null);

  const [currentBlock, setCurrentBlock] = useState<Block | null>(null);
  const [currentLesson, setCurrentLesson] = useState<GlobalType.ShowLessonResponse | null>(null);

  async function getBlocks(playlist: GlobalType.ShowPlaylistResponse, get_trail: GlobalType.TrailsResponse) {
    try {
      const response = await api.global.playlist_block.listBlocks({
        query: {
          playlist_id: playlist.id
        }
      });

      const blocks = response.data;

      setBlocks(blocks);

      if(block_slug) {
        const currentBlock = blocks.find(block => block.slug === block_slug);

        if(currentBlock) {
          setCurrentBlock(currentBlock);
        }

        if(lesson_slug) {
          const currentLesson = currentBlock?.lessons.find(lesson => lesson.slug === lesson_slug);
  
          if(currentLesson) {
            setCurrentLesson(currentLesson);
          }
        }

        return;
      }

      if(!block_slug && !lesson_slug) {
        function findLastIndex<T>(array: Array<T>, predicate: (value: T, index: number, obj: T[]) => boolean): number {
          let length = array.length;
          while (length--) {
            if (predicate(array[length], length, array))
              return length;
          }
          return -1;
        }

        const b = blocks.find(block => {
          const a = findLastIndex(block.lessons, lesson => lesson.completed);
          
          if(blocks[a + 1] || blocks[a]) {
            console.log(a);
            return true;
          }
          return false;
        });

        console.log({b});
      }

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

  function handleSetCurrentBlock(block: Block) {
    setCurrentBlock(prevState => {
      if(prevState?.id === block.id) {
        return null;
      }

      return block;
    })
  }

  function setCurrentPath(block: Block, lesson: GlobalType.ShowLessonResponse) {
    const base_url = `/trail/${trail?.slug}/playlist/${playlist?.slug}`;
    const block_url = `block/${block.slug}`;
    const lesson_url = `lesson/${lesson.slug}`;

    return `${base_url}/${block_url}/${lesson_url}`;
  }

  async function handleLikeDislike(state: 'like' | 'dislike' | 'none') {
    try {
      const states: Record<string, LessonState> = {
        like: 'liked',
        dislike: 'disliked',
        none: 'none'
      };

      await baseApi.post('/likes', {
        lesson_id: currentLesson?.id,
        state
      });

      setCurrentLesson(prevState => {
        if(prevState) {
          let likes = prevState._count.likes;
          let dislikes = prevState._count.dislikes;

          switch (prevState.state) {
            case 'disliked':
              if(states[state] === 'liked') {
                dislikes -= 1;
                likes += 1;
              }
  
              if(states[state] === 'none') {
                dislikes -= 1;
              }
              break;
            case 'liked':
              if(states[state] === 'disliked') {
                likes -= 1;
                dislikes += 1;
              }
              
              if(states[state] === 'none') {
                likes -= 1;
              }
              break;
            case 'none':
              if(states[state] === 'liked') {
                likes += 1;
              }
  
              if(states[state] === 'disliked') {
                dislikes += 1;
              }
              break;
            default:
              break;
          }

          return {
            ...prevState,
            state: states[state],
            _count: {
              ...prevState._count,
              likes,
              dislikes,
            }
          }
        }

        return prevState;
      })
    } catch (error: any) {
      console.log(error);
    }
  }

  async function handleCompleteLesson(blockParam: Block, lessonParam: Lesson) {
    try {
      function mappedBlocks(blocks: Block[]) {
        return blocks.map(block => {
          if(block.id === blockParam.id) {
            return {
              ...block,
              lessons: block.lessons.map(lesson => {
                if(lesson.id === lessonParam.id) {
                  return {
                    ...lesson,
                    completed: !lesson.completed
                  }
                }

                return lesson;
              })
            }
          }

          return block;
        });
      }

      setBlocks(mappedBlocks);

      await baseApi.post('/lessons/change-complete-lesson', {
        lesson_id: lessonParam.id
      });

    } catch (error: any) {
      console.log({error})
    }
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

                  <div className="likes_dislikes">
                    {currentLesson?.state === 'liked' ? (
                      <button className={'lesson_liked'} onClick={() => handleLikeDislike('none')}>
                        {<AiFillLike />} 
                        <span>
                          {currentLesson?._count.likes}
                        </span>
                      </button>
                    ) : (
                      <button onClick={() => handleLikeDislike('like')}>
                        <AiOutlineLike />
                        <span>
                          {currentLesson?._count?.likes}
                        </span>
                      </button>
                    )}
                    {currentLesson?.state === 'disliked' ? (
                      <button className={'lesson_disliked'}  onClick={() => handleLikeDislike('none')}>
                        {<AiFillDislike />}
                        <span>
                          {currentLesson?._count.dislikes}
                        </span>
                      </button>
                    ) : (
                      <button onClick={() => handleLikeDislike('dislike')}>
                        <AiOutlineDislike />
                        <span>
                          {currentLesson?._count?.dislikes}
                        </span>
                      </button>
                    )}
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
                      <h2 className={`block_title ${block.id === currentBlock?.id && 'selected'}`}>{block.name}</h2>
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
                          buttonProps={{
                            onClick: () => handleCompleteLesson(block, lesson)
                          }}
                          key={lesson.id}
                          isCompleted={lesson.completed}
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