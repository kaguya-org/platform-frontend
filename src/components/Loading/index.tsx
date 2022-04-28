import {
  LoadingContainer,
  CircleLoading,
  SquareLoading
} from './styles';

export type LoadingProps = {
  size?: string;
  type?: 'circle' | 'square';
};

export const Loading: React.FC<LoadingProps> = ({ type = 'circle', size = '20px', ...rest }) => {
  const loadings = {
    circle: ( 
      <LoadingContainer size={size}>
        <CircleLoading />
      </LoadingContainer> 
    ),
    square: (
      <SquareLoading size={size} {...rest}>
        <span />
        <span />
        <span />
        <span />
      </SquareLoading>
    )
  };

  return loadings[type]
}