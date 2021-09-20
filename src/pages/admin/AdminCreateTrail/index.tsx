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
            <Trail>
              <div className="trail_container">
                <img src="" alt="" />
                <div>
                  <h3>Javascript</h3>
                  <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
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