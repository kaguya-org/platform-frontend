import { BsCheck } from 'react-icons/bs';

import { BackgroundProgress, Progress } from './styles';

type ProgressBarProps = {
  percent: number;
};

export function ProgressBar({ percent }: ProgressBarProps): JSX.Element {
  return (
    <BackgroundProgress percent={percent}>
      <Progress percent={percent}>
        <span>{percent}%</span>
        <span>
          {percent >= 90 && (
            <BsCheck size={15} />
          )}
        </span>
      </Progress>
      <span>
        <BsCheck size={18} />
      </span>
    </BackgroundProgress>
  );
}
