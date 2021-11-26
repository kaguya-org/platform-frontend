import { useMemo } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';

import {
  Container
} from './styles';

export type PagePathProps = {
  previousPages: Array<{
    title: string | undefined | null;
    to?: string;
    order: number;
    restProps?: React.HTMLAttributes<HTMLDivElement>;
  }>;
  currentPage: {
    title: string | undefined | null;
    restProps?: React.HTMLAttributes<HTMLSpanElement>
  };
}

export function PagePath({
  previousPages,
  currentPage
}: PagePathProps) {

  const previousPagesSorted = useMemo(() => {
    return previousPages.sort((itemA, itemB) => {
      return Number(itemA.order - itemB.order);
    });
  }, [previousPages]);

  return (
    <Container>
      <div className="previous_pages">
        {previousPagesSorted.map(previous => (
          <div key={previous.title} {...previous.restProps}>
            <Link to={previous.to || '#'}>{previous.title}</Link>
            <IoIosArrowForward />
          </div>
        ))}
      </div>
      <span className="current_page" {...currentPage.restProps}>{currentPage.title}</span>
    </Container>
  )
}