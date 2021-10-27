import { useState } from 'react';

import {
  FaPlay,
  FaDiscord,
  BiDollarCircle,
  IoArrowRedoSharp,
  BsPlus,
  IoIosArrowForward,
} from 'react-icons/all';

import { SideBar } from '../../../components/SideBar';
import { ProgressBar } from '../../../components/ProgressBar';
import { Button } from '../../../components/HtmlPartials/Button';

import {
  Container,
  Content,
  LeftContent,
  RightContent,
  Welcome,
  LastClasseSection,
  ComunitySection,
  MyTrailsSection,
  MyTrailsContainer,
  MyTrail,
  OtherTrailsSection,
  OtherTrailsContainer,
  OtherTrail,
} from './styles';

import euImg from '../../../assets/images/eu.jpg';

const jsImg =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png';

export function UserDashboard(): JSX.Element {
  const [progressBar, setProgressBar] = useState(100);
  return (
    <Container>
      <SideBar />
      <Content>
        <LeftContent>
          <Welcome>
            <img src={euImg} alt="perfil" />
            <div>
              <h1>
                Bem vindo de Volta,
                <br /> <span>Tiago Gonçalves!</span>
              </h1>
              <span> Vamos estudar o que hoje? </span>
            </div>
          </Welcome>

          <MyTrailsSection>
            <header>
              <h1> Minhas trilhas </h1>
              <button type="button">Todas as minhas trilhas</button>
            </header>

            <MyTrailsContainer>
              <MyTrail>
                <header>
                  <img src={jsImg} alt="Js" />
                  <span>
                    <IoArrowRedoSharp />
                    Acessar
                  </span>
                </header>
                <span>Javascript</span>

                <ProgressBar percent={68} />
              </MyTrail>
              <MyTrail>
                <header>
                  <img src={jsImg} alt="Js" />
                  <button>
                    <IoIosArrowForward />
                  </button>
                </header>
                <span>Javascript</span>

                <ProgressBar percent={progressBar} />
              </MyTrail>
              <MyTrail>
                <header>
                  <img src={jsImg} alt="Js" />
                  <IoArrowRedoSharp />
                </header>
                <span>Javascript</span>

                <ProgressBar percent={4} />
              </MyTrail>
            </MyTrailsContainer>
          </MyTrailsSection>
        </LeftContent>

        <RightContent>
          <div>
            <LastClasseSection>
              <aside>
                <div>
                  <div>
                    <h1>Continuar de onde parou? </h1>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Error eligendi magni inventore sed eveniet impedit. Quidem
                      dolorem necessitatibus, nemo a sint quo ut maiores,
                      aspernatur nesciunt pariatur perferendis eum possimus!
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Vero id tenetur, quos non maxime neque obcaecati, quo quod
                      a ad ab dignissimos ducimus nulla harum, temporibus
                      recusandae est. Ea, fugit.
                    </p>
                  </div>
                  <img src={jsImg} alt="a" />
                </div>
                <span>
                  <Button>
                    <FaPlay /> Entendendo váriaveis
                  </Button>
                  <h2>Styled-components</h2>
                </span>
              </aside>
            </LastClasseSection>
            <ComunitySection>
              <aside>
                <h1>Junte-se ou apoie nossa Comunidade</h1>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem est itaque voluptatum optio amet ex a eius asperiores
                  nemo nulla? Maxime fugiat sit officia dolores rerum quasi
                  nihil illum hic!
                </p>
                <div>
                  <Button className="button-discord">
                    <FaDiscord /> Discord
                  </Button>
                  <Button className="button-contribute">
                    <BiDollarCircle /> Contribuir
                  </Button>
                </div>
              </aside>
            </ComunitySection>
          </div>
          <OtherTrailsSection>
            <header>
              <h1> Outras trilhas </h1>
              <button type="button">Ver todas as trilhas</button>
            </header>

            <OtherTrailsContainer>
              <OtherTrail>
                <header>
                  <img src={jsImg} alt="Js" />
                </header>
                <span>Styled-components</span>
                <Button><BsPlus /> Detalhes</Button>
              </OtherTrail>
            </OtherTrailsContainer>
          </OtherTrailsSection>
        </RightContent>
      </Content>
    </Container>
  );
}
