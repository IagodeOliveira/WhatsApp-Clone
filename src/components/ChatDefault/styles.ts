import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #F8F9FA;
  height: 100%;
  border-bottom: 6px solid #4ADF83;

  img {
    width: 250px;
    height: auto;
  }

  h1 {
    font-size: 32px;
    color: #525252;
    font-weight: normal;
    margin-top: 30px;
  }

  h2 {
    font-size: 14px;
    color: #777;
    font-weight: normal;
    margin-top: 20px;
  }
`;