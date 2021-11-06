import { Loading } from '../';
import { LoadingProps } from '../Loading';

import {
  Container,
  Content
} from './styles';

type ContainerProps = {
  loadingProps?: LoadingProps;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export function ContainerPage({ loadingProps, isLoading, children }: ContainerProps) {
  return (
    <Container>
      {isLoading ? (
        <Loading {...loadingProps} />
      ): (
        <>
          {children}
        </>
      )}
    </Container>
  );
}

type ContentProps = {
  children?: React.ReactNode;
}

export function ContentPage({ children }: ContentProps) {
  return (
    <Content>
      <>
        {children}
      </>
    </Content>
  );
}
