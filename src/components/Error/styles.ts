import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  overflow: none;
  left: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;

  font-weight: bold;
  bottom: 0;
  background: rgba(0,0,0,0.75);
`
export const Box = styled.div`
  padding: 70px max(10px, min(30px, 10vw));
  display: flex;
  flex-direction: column;
  justify-content: left;
  margin: 0 20px;
  header {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 50px;
  }
  align-items: flex-end;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #c93464,  -2px -2px 10px #c93464;
  span {
    font-size: max(14px, min(20px, 5vw));
    color: #c93464;
    display: inline-block;
    width: 100%;
    max-width: 600px;
  }
`