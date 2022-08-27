import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  overflow: none;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;

  font-weight: bold;
  bottom: 0;
  background: rgba(0,0,0,0.75);
`
export const Box = styled.div`
  padding: 70px 60px;
  display: flex;
  flex-direction: column;
  justify-content: left;
  header {
    display: flex;
    align-items: center;
    margin-bottom: 50px;
  }
  align-items: flex-end;
  margin: 0 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #c93464,  -2px -2px 10px #c93464;
  span {
    font-size: 3rem;
    color: #c93464;
    display: inline-block;
    width: 100%;
    max-width: 600px;
  }
`