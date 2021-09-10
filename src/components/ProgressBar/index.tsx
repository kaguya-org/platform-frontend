import { BsCheck } from 'react-icons/all';

import { Container, Background, Progress } from './styles';

type ProgressBarProps = {
  percent: number;
};

export function ProgressBar({ percent }: ProgressBarProps): JSX.Element {
  return (
    <Container percent={percent}>
      <span>
        <p>{percent}% </p>
      </span>
      <Background />
      <Progress percent={percent} />
      <strong>
        <BsCheck />
      </strong>
    </Container>
  );
}
