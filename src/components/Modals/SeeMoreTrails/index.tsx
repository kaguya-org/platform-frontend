import { useEffect, useState, useCallback } from 'react';
import { Modal, ModalProps } from '@tg0/react-modal';
import {
  IoClose,
  GoPlus
} from 'react-icons/all';

import { GlobalType } from '../../../services/app_api';

import {
  Container,
  TrailsSection,
  TrailsContainer,
  Trail
} from './styles';

import { api } from '../../../services/api';

import DEFAULT_TRAIL_IMAGE from '../../../assets/images/default_trail.jpg';

type Props = ModalProps & {
  handleClose?: () => void;

  trails: GlobalType.ListAllTrailsResponse[];
}

export function SeeMoreTrails(props: Props) {
  const { trails, handleClose, isOpen } = props;

  const [allTrails, setAllTrails] = useState<GlobalType.ListAllTrailsResponse[]>(trails);

  const getTrails = useCallback(() => {
    if(allTrails && isOpen) {
      api.global.trail.listAll({
        exclude_my_trails: true,
        take: 4,
        skip: allTrails.length
      }).then(response => {
      });
    }
  }, [isOpen, allTrails]);

  useEffect(() => {
    setAllTrails(trails);
  }, [trails]);

  return (
    <Modal {...props} containerTag={{
      style: {
        zIndex: 1000
      }
    }}>
      <Container>
        <TrailsSection>
          <header>
            <h1>Trilhas ({allTrails?.length})</h1>
            <button 
              onClick={handleClose} 
              title="Fechar modal"
            >
              <IoClose />
            </button>
          </header>
          <TrailsContainer>
            {allTrails && allTrails.map(trail => (
              <Trail to={`/trail/${trail.id}`} key={trail.id} >
                <img src={trail.avatar || DEFAULT_TRAIL_IMAGE} alt={trail.name} />
                <div className="trail_information">
                  <h2 className="title">{trail.name}</h2>
                  <span>{trail._count.playlists} playlists - {trail._count.classes} aulas</span>
                </div>
              </Trail>
            ))}
          </TrailsContainer>

          <button
            title="Mostrar mais trilhas"
            onClick={() => getTrails()}
          >
            <GoPlus />
          </button>
        </TrailsSection>
      </Container>
    </Modal>
  )
}