import styled from 'styled-components';
import { BACKGROUND, FONTS, FONTS_COLORS, SHADOW_COLORS } from '../../theme';

export const Container = styled.aside`
  height: 100%;
  
  position: fixed;
  left: 0;
  z-index: 15;

  display: flex;

  transition: all .5s;
  -webkit-transition: all .5s;

  @media(max-width: 840px) {
    width: 100%;
    display: block;
    height: max-content;
      
    button.close_sidebar {
      display: none;
      cursor: initial;
    }
  }

  &.container_sidebar_open {
    width: 100%;
    height: 100%;

    > button.close_sidebar {
      display: block;
      width: 100%;

      background: ${SHADOW_COLORS.BLACK_OPACITY_50}
    }
  }
`;

export const Content = styled.div`
  width: 7.8rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${BACKGROUND.SECONDARY};
  overflow: hidden;

  transition: all .5s;
  -webkit-transition: all .5s;

  &.content_sidebar_open {
    width: 28.8rem;
    height: 100%;
  }

  div.content_top {
    button.close_open {
      padding: 2.4rem 0 1.6rem 0;
      
      .logo {
        font-size: 1.6rem;
      }
    }

    div.principal_links {
      margin-top: 2.4rem;

      h2 {
        padding-left: 2.8rem;
        margin-bottom: 1.2rem;

        font-size: 1.4rem;
        color:  #a1a1a1;
        font-family: ${FONTS.PRIMARY};
        font-weight: 500;
        white-space: nowrap;
      }

      nav.links {
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 36rem;

        ::-webkit-scrollbar-track {
          box-shadow: inset 0 0 5px ${BACKGROUND.PRIMARY}; 
        }
      }
    }
  }

  .close_open_button, .link_container {
    display: flex;
    align-items: center;

    padding: 1.6rem 0;

    width: 100%;

    font-size: 1.6rem;

    color: ${FONTS_COLORS.SECONDARY};

    div {
      width: max-content;

      display: flex;
      align-items: center;
        
      span.icon {
        padding-left: 2.8rem;

        display: flex;
        align-items: center;

        svg {
          width: 2.4rem;
          height: 2.4rem;
          
          path {
            color: ${FONTS_COLORS.SECONDARY};
          }
        }
      }

    }
    span.title {
      margin-left: 2.6rem;
      white-space: nowrap;
      
      color: ${FONTS_COLORS.SECONDARY};
    }
  }

  .link_container:hover {
    background: ${BACKGROUND.DEFAULT_INPUT};
  }
  
  nav.configuration_links {
    padding-bottom: 2.4rem;

    .first_link {
      margin-top: 1.6rem;
    }

    .profile {
      display: block;
      margin-top: 1.8rem;
      width: max-content;

      span {
        color: ${FONTS_COLORS.SECONDARY};
        white-space: nowrap;
      }
    }
  }

  @media(max-width: 840px) {
    &.content_sidebar {
      width: 100%;
      height: 5.6rem;
    }

    &.content_sidebar_open.content_sidebar {
      height: 100%;
    }
  }
`;
