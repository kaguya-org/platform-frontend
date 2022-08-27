import { BACKGROUND } from '@/theme'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Button } from '../Commons/Button'
import { Lordicon } from '../ReactLordicon'
import { Box, Container } from './styles'

type KaguyaErrorProps = {
  message: string,
  open?: boolean
  close: () => void,
}
const KaguyaError: React.FC<KaguyaErrorProps> = ({
  message,
  close,
  open = true
}) => {
  if(!open) return null
  
  return <Container>
    <Box>
      <header>
        <Lordicon 
            colors={{
              primary: '#c93464',
              secondary: '#c93464',
            }}
            icon="error"
            size={200}
            delay={1000}
            trigger='loop'  
        />
        <span>
        {message}
        </span>
      </header>

      <Link to={'/'}>
        <Button styleType='primary' style={{
          padding: '20px 50px',
          backgroundColor: BACKGROUND.PRIMARY
        }}> <AiOutlineArrowLeft />Voltar para home</Button>

      </Link>
    </Box>
  </Container>
}

export { KaguyaError }
