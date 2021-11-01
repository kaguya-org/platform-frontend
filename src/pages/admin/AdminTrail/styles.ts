import { Link } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import { Input } from '../../../components/HtmlPartials/Input';

type ContainerProps = {
  isLoading?: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  ${(props) => props.isLoading && css`
    align-items: center;
    justify-content: center;
  `};
  height: 100%;
  width: 100%;
`;

export const Content = styled.main`
  display: flex;
  gap: 18px;

  width: 100%;
  margin: 64px;
`;

export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  padding: 32px;
  max-width: 480px;
  height: min-content;

  background: var(--second-background);
  border-radius: 8px;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    > div:first-child {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      h1 {
        font-size: 32px;
        margin-bottom: 16px;
      }

      button {
        &:hover {
          svg path {
            transition: all 0.2s;
            color: var(--third-color);
          }
        }

        svg {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      }
    }

    > aside {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      img {
        width: 120px;
        height: 120px;
        border-radius: 8px;
      }

      div.created_updated_values {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        span {
          color: #c4c4c4;
          font-size: 12px;
          letter-spacing: 0.9px;

          &:first-child {
            margin-bottom: 8px;
          }
        }
      }
    }

    > span.line {
      height: 2px;
      margin: 32px 0 0;
      background: black;
      background: 
        -webkit-gradient(linear, 0 0, 100% 0, 
        from(var(--second-background)), 
        to(var(--second-background)), 
        color-stop(50%, #353535));
    }

    > p {
      margin: 16px 0 32px;
      color: #c4c4c4;
    }

    div.control_buttons {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      gap: 8px;
      max-width: 350px;
      
      > button:first-child {
        background: #242731;
  
        width: 100%;
        padding: 12px 18px;
        border-radius: 6px;
  
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
  
        font-size: 14px;
        letter-spacing: 0.9px;
  
        transition: all 0.2s;
        &:hover {
          filter: brightness(110%);
          box-shadow: 0 2px 0 var(--third-color);
        }
        svg {
          width: 22px;
          height: 22px;
        }
      }

      > button:nth-child(2) {
        width: 100%;
        padding: 12px 28px;

        color: #f44;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        font-size: 14px;
        letter-spacing: 0.9px;

        transition: all 0.2s;
        border-bottom: 2px solid transparent;

        &:hover {
          border-bottom: 2px solid #f44;
        }
        
        svg {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
`;

export const inputTrailName = {
  container: {
    background: 'none',
    padding: 0,
    
    'border-bottom': '1px solid #353535',
    'margin-bottom': '16px',
    'border-radius': 0,
  },

  input: {
    'font-size': '32px',
    'fontWeight': 700,
    'font-family': 'var(--second-font)',
  },
};

export const inputTrailDescription = {
  margin: '16px 0 32px',
}

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-60px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AllPlaylistTrailContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;

  width: 100%;
  padding: 32px;

  background: var(--second-background);
  border-radius: 8px;

 > div:first-child {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h1 {
      font-size: 32px;
    }

    button {
      margin-right: 16px;

      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        svg path {
          transition: all 0.2s;
          color: var(--third-color);
        }
      }

      svg {
        width: 24px;
        height: 24px;
        cursor: pointer;
      }

      &.save_playlists_button {
        font-weight: 600;
        font-size: 16px;

        transition: all 0.2s;
        svg {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }

        &:hover {
          color: var(--third-color);
        }
      }
    }
  }

  > span {
    display: flex;
    align-items: center;
    gap: 16px;

    margin-left: 24px;

    animation: ${appearFromLeft} 0.4s;

    svg {
      width: 24px;
      height: 24px;
      
      circle, line {
        color: #CCBB13;
      }
    }

    p {
      color: #c4c4c4;
      max-width: 480px;
      font-size: 14px;
    }
  }

  > button {
    margin: 32px auto 0;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 64px;
      height: 64px;

      line {
        color: #262832;
      }
    }
  }
`;

export const PlaylistsStyles = {
  display: 'flex',
  'flex-direction': 'column',
  
  overflow: 'auto',
  'margin-top': '16px',
};

export const Playlists = styled.div`
  display: flex;
  flex-direction: column;
  
  overflow: auto;
  margin-top: 16px;
`;

const PlaylistStyle = css`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  
  background: #262832;

  padding: 16px;
  margin-right: 16px;
  border-radius: 8px;

  &:not(:first-child) {
    margin-top: 16px;
  }
`;

export const Playlist = styled(Link)`
  ${PlaylistStyle};
`;

export const PlaylistDraggable = styled.div`
  ${PlaylistStyle};
  font-size: initial;
`