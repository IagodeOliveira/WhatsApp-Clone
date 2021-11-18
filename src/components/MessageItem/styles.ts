import styled from 'styled-components';
import { IPosition } from "./interfaces";

export const Container = styled.div<IPosition>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.all.position};
  justify-content: center;
  min-height: 33px;
  padding-left: 4.5%;
  padding-right: 4.5%;
  margin: 12px 20px;
  box-sizing: border-box;
`;

export const ContainerItem = styled.div<IPosition>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  max-width: 85%;
  background-color: ${(props) => props.all.userColor};
  border-radius: 7.5px;
  box-shadow: 0px 1px 1px #CCC;
  height: 100%;
  padding: 6px 7px 8px 9px;
  box-sizing: border-box;
  position: relative;

  .parent {
    position: relative;
  }

  .parent::before {
    content: "";
    position: absolute;
    top: -6px;
    right: ${(props) => props.all.pos};
    border-width: 8px;
    border-style: solid;
    border-color: ${(props) => props.all.userColor} transparent transparent transparent;
    display: ${(props) => props.all.ftsMsg};
  }
`;

export const ContainerImg = styled.div<IPosition>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  background-color: ${(props) => props.all.userColor};
  border-radius: 7.5px;
  height: 344px;
  width: 246px;
  position: relative;
  padding: 3px;

  img, video {
    object-fit: cover;
  }

  .parent {
    position: relative;
  }

  .parent::before {
    content: "";
    position: absolute;
    top: -6px;
    right: ${(props) => props.all.pos};
    border-width: 8px;
    border-style: solid;
    border-color: ${(props) => props.all.userColor} transparent transparent transparent;
    display: ${(props) => props.all.ftsMsg};
  }
`;

export const ContainerAudio = styled.div<IPosition>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 324px;
  height: 55px;
  background-color: ${(props) => props.all.userColor};
  border-radius: 7.5px;
  border-bottom: 1px solid #CCC;
  position: relative;
  padding: 6px;

  .parent {
    position: relative;
  }

  .parent::before {
    content: "";
    position: absolute;
    top: -6px;
    right: ${(props) => props.all.pos};
    border-width: 8px;
    border-style: solid;
    border-color: ${(props) => props.all.userColor} transparent transparent transparent;
    display: ${(props) => props.all.ftsMsg};
  }
`;

export const MessageText = styled.div`
  font-size: 14px;
  padding-right: 90px;
`;

export const MessageDate = styled.div<IPosition>`
  position: absolute;
  font-size: 11px;
  color: #999;
  display: flex;

  &.textMsg {
    bottom: 2px;
    right: 7px;
  }

  &.imgMsg, &.videoMsg {
    bottom: 5px;
    right: 10px;
    color: rgba(255, 255, 255, 0.9);
  }
  
  &.audioMsg {
    bottom: 0px;
    right: 7px;
  }

  .doneAllIcon {
    display: ${(props) => props.all.userDisplay};
    width: 15px;
    height: 100%;
    color: ${(props) => props.seenTrue};
    margin-left: 3px;
  }
`;