import styled from 'styled-components';
import { IColor } from "./interfaces";

export const ChatListArea = styled.div<IColor>`
  display: flex;
  align-items: center;
  height: 70px;
  cursor: pointer;
  background-color: ${(props) => props.all.backColor};
  z-index: 1;

  &:hover {
    background-color: #F5F5F5;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 15px;
  }
`;

export const Lines = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid #EEE;
  padding-right: 15px;
  margin-left: 15px;
  height: 100%;
  flex-wrap: wrap;
  min-width: 0px;

  > * {
    &:first-child {
      margin-bottom: 5px;
    }
  }

`;

export const Line = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const LineName = styled.div`
  font-size: 17px;
  color: #000;
`;

export const LineDate = styled.div`
  font-size: 12px;
  color: #999;
`;

export const LineLastMsg = styled.div<IColor>`
  font-size: 14px;
  color: #999;
  width: inherit;
  display: flex;
  justify-content: space-between;

  .dad {
    position: relative;
    height: 26px;
  }

  p {
    position: absolute;
    left: 25px;
    top: -13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${(props) => props.all.isActive};
  }

  .file {
    position: absolute;
    left: 0px;
    top: 2px;
    display: flex;
  }

  .PhotoCameraIcon, .MicIcon, .VideocamIcon {
    display: inline-block;
    width: 16px;
    height: 20px;
    margin-top: 1px;
    color: ${(props) => props.all.seen};
  }

  .file p {
    height: 20px;
    margin-left: -6px;
  }

  .doneAllIcon {
    width: 18px;
    height: 100%;
    color: ${(props) => props.all.iconSeen};
  }

  span.unSeen {
    display: inline-block;
    text-align: center;
    background-color: #06D755;
    font-size: 12px;
    min-width: 22.4px;
    height: 20.4px;
    border-radius: 13.4px;
    color: #FFF;
    padding: 3.6px 4.8px 4.8px;
  }
`;
