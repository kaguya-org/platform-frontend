import { HTMLAttributes } from 'react';
import {
  LoadingContainer,
  CircleLoading,
  SquareLoading
} from './styles';

export type LoadingType = 'circle' | 'square';

export type LoadingProps = HTMLAttributes<HTMLDivElement> & {
  size?: number; // media "px"
  type?: LoadingType;
};

export const Loading: React.FC<LoadingProps> = ({ type = 'square', size = 20, ...rest }) => {
  const loadings = {
    circle: ( 
      <LoadingContainer size={size} {...rest}>
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