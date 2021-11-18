import styled from 'styled-components';
import whatsIcon from './whatsappDark.jpg';

export const Container = styled.div`
  background-image: url(${whatsIcon});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100vw;
`;

export const SignInContainer = styled.div`
  position: absolute;
  right: 0;
  width: 30vw;
  height: 100vh;
  border-left: 5px solid #218930;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);

  button {
    width: 70%;
    height: 40px;
    background-color: #e94235;
    border: none;
    cursor: pointer;
    color: #FFF;
  }

  button: hover {
    color: #CCC;
  }

  .faceButton {
    background-color: #1877f2;
    margin-bottom: 10px;
  }
`;