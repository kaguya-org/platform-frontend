import {
  LoadingContainer,
  CircleLoading,
} from './styles';

type LoadingProps = {
  size?: {
    width?: string;
    height?: string;
  };
  type: 'circle'
};

export function Loading({type, ...rest}: LoadingProps) {
  const loadings = {
    circle: <CircleLoading {...rest}/>,
  }

  return (
    <LoadingContainer {...rest}>
      {loadings[type]}
    </LoadingContainer>
  );
}