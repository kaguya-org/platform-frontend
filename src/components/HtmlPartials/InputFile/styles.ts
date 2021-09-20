import styled from 'styled-components';

export const ContainerFile = styled.div`
  &.file {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 8px;
    
    img, input[type="file"], label {
      width: 100%;
      height: 100%;
      position: absolute;
      cursor: pointer;
    }

    img {
      border-radius: 8px;
      z-index: 3;
      object-fit: cover;
    }

    input[type="file"] {
      opacity: 0;
      z-index: 5;
    }

    label {
      background: #262832;
      border-radius: 8px;
    }

    > svg {
      position: absolute;
      bottom: -8px;
      right: -8px;
      z-index: 4;
      cursor: pointer;
      
      width: 36px;
      height: 36px;

      path {
        color: var(--third-color);
      }
    }
  }
`