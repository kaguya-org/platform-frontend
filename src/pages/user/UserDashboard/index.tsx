import { useEffect, useState } from 'react';

import {
  FaPlay,
  FaDiscord,
  BiDollarCircle,
  IoArrowRedoSharp,
  BsPlus,
} from 'react-icons/all';

import { 
  SideBar,
  ProgressBar,
  Button,
  UserPhoto,
  ContainerPage
} from '../../../components';

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
import { api } from '../../../services/api';
import { ListAllTrailsFromUserResponse } from '../../../services/apiResponse';
import { useBoolean } from '../../../hooks/useBoolean';

const jsImg =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png';

export function UserDashboard(): JSX.Element {
  const [allTrailsFromUser, setAllTrailsFromUser] = useState<ListAllTrailsFromUserResponse[]>([]);
  
  const loadingPage = useBoolean(true);
  useEffect(() => {
    api.user.userTrails.listAllTrailsFromUser().then(response => {
      setAllTrailsFromUser(response.data);
      loadingPage.changeToFalse();
    });

    return () => loadingPage.changeToFalse();
  }, []);

  return (
    <ContainerPage 
      isLoading={loadingPage.state}
      loadingProps={{
        size: '64px',
      }}
    >
      <SideBar />
      <Content>
        <LeftContent>
          <Welcome>
            <UserPhoto 
              imageUri={euImg} 
              size={{
                avatarSize: '128px',
              }}
            />
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
              {allTrailsFromUser.map(({trail, trail_percentage_completed}) => (
                <MyTrail to={`/trail/${trail.id}`} key={trail.id}>
                  <header>
                    <img src={trail.avatar_url ? trail.avatar_url : jsImg} alt={trail.name} />
                    <IoArrowRedoSharp />
                  </header>
                  <span>{trail.name}</span>

                  <ProgressBar percent={trail_percentage_completed} />
                </MyTrail>
              ))}
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
    </ContainerPage>
  );
}
