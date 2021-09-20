import { IoIosArrowForward } from 'react-icons/all';

import { AdminSideBar } from '../../../components/AdminSideBar';
import { InputFile } from '../../../components/HtmlPartials/InputFile';
import { Input } from '../../../components/HtmlPartials/Input';

import { 
  Container,
  Content,
  FormContainer,
  AllTrailsContainer,
  Trails,
  Trail
} from './styles';

export function AdminCreateTrail() {

  return (
    <Container>
      <AdminSideBar />
      <Content>
        <FormContainer>
          <h1>Criar trilha</h1>
          <form>
            <InputFile 
              name="trail_file"
            />
            <div className="trail_inputs">
              <Input 
                name="trail_name"
                title="Nome da trilha"
              />
              <Input 
                name="trail_Description"
                title="Descrição"
                inputType="textarea"
              />
            </div>
            <button>Criar</button>
          </form>
        </FormContainer>
        <AllTrailsContainer>
          <h1>Todas as trilhas</h1>
          <Trails>
            <Trail to="/javascript">
              <div className="trail_container">
                <img src="https://w7.pngwing.com/pngs/452/495/png-transparent-react-javascript-angularjs-ionic-github-text-logo-symmetry-thumbnail.png" alt="" />
                <div>
                  <h3>React Js</h3>
                  <p>Aqui você aprenderá sobre tudo do react, desde a criação de componentes à criar seus próprios hooks.</p>
                </div>
              </div>
              <IoIosArrowForward />
            </Trail>
            <Trail to="/javascript">
              <div className="trail_container">
                <img src="https://w7.pngwing.com/pngs/266/560/png-transparent-python-computer-icons-programmer-javascript-programming-language-python-logo-angle-text-logo.png" alt="" />
                <div>
                  <h3>Python</h3>
                  <p>Entendendo todo o mundo de python. Criando controle de dados e muito mais.</p>
                </div>
              </div>
              <IoIosArrowForward />
            </Trail>
          </Trails>
        </AllTrailsContainer>
      </Content>
    </Container>
  )
}