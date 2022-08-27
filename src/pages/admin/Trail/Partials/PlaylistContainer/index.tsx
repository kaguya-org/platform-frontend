import {
  HiMenuAlt4
} from 'react-icons/hi';
import {
  IoIosArrowForward
} from 'react-icons/io';

import {
  PlaylistContainerStyled
} from './styles';

type PlaylistContainerType = {
  data: {
    id: string;
    title: string;
    description: string;
    index: number;
  };
  isDraggable?: boolean;
};

export function PlaylistContainer({data, isDraggable}: PlaylistContainerType) {
  return (
    <PlaylistContainerStyled>
      <aside>
        <span>{data.index + 1}</span>
        <div>
          <h3>{data.title}</h3>
          <p>{data.description}</p>
        </div>
      </aside>
      {isDraggable ? <HiMenuAlt4 /> : <IoIosArrowForward />}
    </PlaylistContainerStyled>
  );
}