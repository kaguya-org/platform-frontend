import { 
  BiListPlus, 
  MdComputer, 
  MdOndemandVideo, 
  MdPlaylistPlay, 
  FaUserFriends, 
  IoIosArrowRoundForward, 
  VscDebugBreakpointData 
} from 'react-icons/all';

import {
  ProgressBar,
  SideBar
} from '../../../components';

import { 
  Container,
  Content,
  TrailInfo,
  PlayListAndExerciciesContainer,
  PlayListAndExercicie,
  PlayList,
  Exercicie
} from './styles';

const jsImg =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/2048px-Unofficial_JavaScript_logo_2.svg.png';

export function UserTrail() {
  return (
    <Container>
      <SideBar />
      <Content>
        <TrailInfo>
          <div>
            <img src={jsImg} alt="Trail name"/>
            <span><MdPlaylistPlay /> 12 playlists </span>
            <span><MdOndemandVideo /> 154 aulas </span>
            <span><MdComputer /> 12 exercícios </span>
            <span><FaUserFriends /> 36 alunos </span>
          </div>
          <aside>
            <div>
              <h1>Trilha de <span>Styled-components</span></h1>
              <button><BiListPlus/> Adicionar trilha</button>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Error eligendi magni inventore sed eveniet impedit. Quidem
              dolorem necessitatibus, nemo a sint quo ut maiores,
              aspernatur nesciunt pariatur perferendis eum possimus!
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Vero id tenetur, quos non maxime neque obcaecati, quo quod.
            </p>
          </aside>
         
          {/* <aside>

            <div>
              <span> 32 pessoas fazem esta trilha </span>
            </div>
          </aside> */}
        </TrailInfo>
        <PlayListAndExerciciesContainer>
          <PlayListAndExercicie>
            <PlayList to="/javascript/id">
              <aside>
                <div>
                  <h2>Conhecendo o Styled-components</h2>
                  <span>122 de 144 aulas assistidas</span>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </aside>
              <ProgressBar percent={50}/>
            </PlayList>
            <Exercicie>
              <aside>
                <MdComputer />
                <div>
                  <h2>Calculadora grande</h2>
                  <span>Nível 1</span>
                </div>
              </aside>
              <div>
                {/* <span className="exercicie_notStarted">
                  <VscDebugBreakpointData /> Não iniciado
                </span> */}
                {/* <span className="exercicie_started">
                  <VscDebugBreakpointData /> Iniciado
                </span> */}
                <span className="exercicie_completed">
                  <VscDebugBreakpointData /> Completado
                </span>
                <button>Ver exercício <IoIosArrowRoundForward /></button>
              </div>
            </Exercicie>
          </PlayListAndExercicie>
          <PlayListAndExercicie>
            <PlayList to="/javascript/id">
              <aside>
                <div>
                  <h2>Conhecendo o Styled-components</h2>
                  <span>122 de 144 aulas assistidas</span>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </aside>
              <ProgressBar percent={50}/>
            </PlayList>
            <Exercicie>
              <aside>
                <MdComputer />
                <div>
                  <h2>Calculadora grande</h2>
                  <span>Nível 1</span>
                </div>
              </aside>
              <div>
                <span className="exercicie_notStarted">
                  <VscDebugBreakpointData /> Não iniciado
                </span>
                {/* <span className="exercicie_started">
                  <VscDebugBreakpointData /> Iniciado
                </span> */}
                {/* <span className="exercicie_completed">
                  <VscDebugBreakpointData /> Completado
                </span> */}
                <button>Ver exercício <IoIosArrowRoundForward /></button>
              </div>
            </Exercicie>
          </PlayListAndExercicie>
          <PlayListAndExercicie>
            <PlayList to="/javascript/id">
              <aside>
                <div>
                  <h2>Conhecendo o Styled-components</h2>
                  <span>122 de 144 aulas assistidas</span>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </aside>
              <ProgressBar percent={50}/>
            </PlayList>
            <Exercicie>
              <aside>
                <MdComputer />
                <div>
                  <h2>Calculadora grande</h2>
                  <span>Nível 1</span>
                </div>
              </aside>
              <div>
                {/* <span className="exercicie_notStarted">
                  <VscDebugBreakpointData /> Não iniciado
                </span> */}
                <span className="exercicie_started">
                  <VscDebugBreakpointData /> Iniciado
                </span>
                {/* <span className="exercicie_completed">
                  <VscDebugBreakpointData /> Completado
                </span> */}
                <button>Ver exercício <IoIosArrowRoundForward /></button>
              </div>
            </Exercicie>
          </PlayListAndExercicie>
        </PlayListAndExerciciesContainer>
      </Content>
    </Container>
  );
}