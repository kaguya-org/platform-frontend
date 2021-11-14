import { Loading } from '../';
import { LoadingProps } from '../Loading';

import {
  Container,
} from './styles';

type ContainerProps = {
  loadingProps?: LoadingProps;
  isLoading?: boolean;
  children?: React.ReactNode;

  containerStyle?: React.CSSProperties;
}

export function ContainerPage({ loadingProps, isLoading, containerStyle, children }: ContainerProps) {
  return (
    <Container style={containerStyle}>
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