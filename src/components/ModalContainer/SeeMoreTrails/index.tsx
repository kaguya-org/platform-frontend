import React, { useCallback, useEffect, useState } from 'react';
import {
  GoPlus
} from 'react-icons/go';
import DEFAULT_TRAIL_IMAGE from '../../../assets/images/default_trail.jpg';
import { api } from '../../../services/api';
import { GlobalType } from '../../../services/app_api';
import {
  Container, Trail, TrailsContainer, TrailsSection
} from './styles';

type SeeMoreTrailsProps = {
  trailsCache: GlobalType.TrailsResponse[]
  setTrailsCache: React.Dispatch<React.SetStateAction<GlobalType.TrailsResponse[]>>
}

export const SeeMoreTrails: React.FC<SeeMoreTrailsProps> = ({
  trailsCache,
  setTrailsCache
}) => {
  const [trails, setTrails] = useState<GlobalType.TrailsResponse[]>([]);

  const getTrails = useCallback(async () => {
    const { data: __trails } = await api.global.trail.list({
      exclude_my_trails: true,
      take: 30,
      skip: trails.length
    })

    const _trails = [...trails, ...__trails]

    setTrails(_trails);
    setTrailsCache(_trails);
    
  }, [trails]);

  useEffect(() => {
    if(trailsCache.length === 0) {
      getTrails();
    } else {
      setTrails(trailsCache);
    }
  }, [trailsCache])


  return (
  
      <Container>
        <TrailsSection>
          <header>
            <h1>Trilhas ({trails.length})</h1>
          </header>
          <TrailsContainer>
            {trails && trails.map(trail => (
              <Trail to={`/trail/${trail.slug}`} key={trail.id} >
                <img src={trail.avatar || DEFAULT_TRAIL_IMAGE} alt={trail.name} />
                <div className="trail_information">
                  <h2 className="title">{trail.name}</h2>
                  <span>{trail._count.playlists} playlists - {trail._count.lessons} aulas</span>
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
  )
}