import { useState } from 'react';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { BoxProgressBarStep } from '../../components/BoxProgressBarStep';
import { SideBar } from '../../components/SideBar';
import {
  Container,
  Content,
  CurrentClasseContainer,
  CurrentClasse,
  ClasseInfo,
  BlocksAndClassesContainer,
  BlockAndClasses,
  Block,
  Classes,
  Classe
} from './styles';

export function UserPlaylist() {
  const [isLiked, setIsLiked] = useState(true);
  const [blockOpen, setBlockOpen] = useState(false);

  function handleChangeLike() {
    setIsLiked(prevLike => !prevLike);
  }

  function handleChangeBlocks() {
    setBlockOpen(prevBlockState => !prevBlockState);
  }
  return (
    <Container>
      <SideBar />
      <Content>
        <CurrentClasseContainer>
          <CurrentClasse>
            <iframe src="https://www.youtube.com/embed/Ptbk2af68e8" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <div>
              <span>315 visualizações</span>

              <div>
                <span
                  onClick={handleChangeLike}
                  className={isLiked ? 'classe_liked' : ''}>
                    {isLiked ? <AiFillLike /> : <AiOutlineLike />} 
                    20
                </span>
                <span
                  onClick={handleChangeLike}
                  className={!isLiked ? 'classe_deslike' : ''}>
                    {!isLiked ? <AiFillDislike /> : <AiOutlineDislike />} 
                    32
                </span>
              </div>
            </div>
          </CurrentClasse>
          <ClasseInfo>
            <h1>Entendendo váriaveis</h1>
            <div className="classeInfo_switch_buttons">
              <button>Descrição</button>
              <button>Artigos</button>
            </div>
            <p>Uma bela descrição.</p>
          </ClasseInfo>
        </CurrentClasseContainer>
        <BlocksAndClassesContainer>
          <BlockAndClasses>
            <Block  onClick={handleChangeBlocks}>
              <div>
                <h2>Variaveis no Javascript</h2>
                <span>4 aulas</span>
              </div>
              <IoIosArrowDown />
            </Block>
            {blockOpen && (
              <Classes>
                <BoxProgressBarStep isCurrent> 
                  <Classe isCurrent >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>

                <BoxProgressBarStep isCompleted> 
                  <Classe isCompleted >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>

                <BoxProgressBarStep isCompleted> 
                  <Classe isCompleted >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>

                <BoxProgressBarStep isCompleted> 
                  <Classe isCompleted >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>
              </Classes>
            )}
          </BlockAndClasses>
          <BlockAndClasses>
            <Block  onClick={handleChangeBlocks}>
              <div>
                <h2>Variaveis no Javascript</h2>
                <span>4 aulas</span>
              </div>
              <IoIosArrowDown />
            </Block>
            {blockOpen && (
              <Classes>
                <BoxProgressBarStep isCurrent> 
                  <Classe isCurrent >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>

                <BoxProgressBarStep isCompleted> 
                  <Classe isCompleted >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>

                <BoxProgressBarStep isCompleted> 
                  <Classe isCompleted >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>

                <BoxProgressBarStep isCompleted> 
                  <Classe isCompleted >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>
              </Classes>
            )}
          </BlockAndClasses>
          <BlockAndClasses>
            <Block  onClick={handleChangeBlocks}>
              <div>
                <h2>Variaveis no Javascript</h2>
                <span>4 aulas</span>
              </div>
              <IoIosArrowDown />
            </Block>
            {blockOpen && (
              <Classes>
                <BoxProgressBarStep isCurrent> 
                  <Classe isCurrent >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>

                <BoxProgressBarStep isCompleted> 
                  <Classe isCompleted >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>

                <BoxProgressBarStep isCompleted> 
                  <Classe isCompleted >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>

                <BoxProgressBarStep isCompleted> 
                  <Classe isCompleted >
                    <button type="button">Nome da aula 3</button>
                  </Classe>
                </BoxProgressBarStep>
              </Classes>
            )}
          </BlockAndClasses>
        </BlocksAndClassesContainer>
      </Content>
    </Container>
  );
}