import styled from 'styled-components';

import { IIcons, IEmoji } from './interfaces';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChatWindowHeader = styled.div`
  height: 60px;
  border-bottom: 1px solid #CCC;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
`;
export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 15px;
  }
`;
export const Icons = styled.ul<IIcons>`
  list-style: none;
  display: flex;
  padding: 0;

  li {
    border-radius: 50%;
    padding: 8px;
    width: 40px;
    height: 40px;
    margin-left: 10px;
    cursor: pointer;
    color: #51585C;
    transition: background-color ease .1s;
  }

  .searchIcon {
    background-color: ${(props) => props.all.searchIcon};
    position: relative;
  }

  .searchIcon:hover .stip {
    visibility: visible;
  }

  .moreIcon {
    background-color: ${(props) => props.all.moreIcon};
    position: relative;
  }

  .moreIcon:hover .mtip {
    visibility: visible;
    left: -66px;
  }

  li:not(.emoticonIcon) {
    color: #51585C;
  }

  .tooltip {
    visibility: hidden;
    border: 1px solid #222;
    font-size: 11px;
    padding: 5px 7px;
    background-color: beige;
    position: absolute;
    top: 35px;
    left: -36px;
    font-weight: bold;
  }

  .attachIcon {
    margin: 0 -1px;
    cursor: pointer;
    position: relative;
    background-color: ${(props) => props.all.attachIcon};
  }

  .attachIcon:hover .atip {
    visibility: visible;
    top: 25px;
    left: 30px;
  }
`;

export const DropDown = styled.div<IIcons>`
  background-color: #FFF;
  width: 218px;
  height: 217;
  position: absolute;
  top: 44px;
  right: 15px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26), 0 2px 10px 0 rgba(0, 0, 0, 0.16);
  padding: 13px 0;
  display: ${(props) => props.all.drop};

  & * {
    padding: 13px 58px 13px 24px;
  }

  & *:hover {
    background-color: #F5F5F5;
  }
`;

export const ChatWindowBody = styled.div`
  flex: 1;
  background-color: #E5DDD5;
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-size: cover;
  background-position: center;
  overflow-y: auto;
  position: relative;

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .messageDate {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;

    & span {
      color: #1D1E1F;
      background-color: #E1F2FB;
      padding: 5px 12px 6px;
      border-radius: 7.5px;
      font-size: 12.5px;
      box-shadow: 0 1px 0.5px rgba(0, 0, 0, .13)
    }
  }
`;

export const AttachIcons = styled.div<IIcons>`
  height: 272px;
  width: 53px;
  position: absolute;
  bottom: 67px;
  left: -5px;
  display: ${(props) => props.all.menuIcons};

  & div {
    width: inherit;
    height: 53px;
    border-radius: 50%;
    margin-top: 15px;
    transition: margin-bottom ease .5s;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFF;
  }

  & div, & div * {
    cursor: pointer;
  }

  .photoDiv {
    background-image: linear-gradient(#AC44CF 50%, #BF59CF 50%);

    &::after {
      content: "Photo, video or audio";
      width: 127px;
    }
  }

  .localSeeIcon {
    background-image: linear-gradient(#D3396D 50%, #EC407A 50%);

    &::after {
      content: "Camera";
    }
  }

  .noteAddIcon {
    background-image: linear-gradient(#5157AE 50%, #5F66CD 50%);

    &::after {
      content: "Document";
    }
  }

  .personIcon {
    background-image: linear-gradient(#0795DC 50%, #0EABF4 50%);

    &::after {
      content: "Contact";
    }
  }

  .personIcon, .noteAddIcon, .localSeeIcon, .photoDiv  {
    position: relative;

    &::after {
      position: absolute;
      left: 65px;
      top: 17px;
      padding: 6px 14px;
      border-radius: 15px;
      background-color: #51585C;
      display: none;
      font-size: 13px;
    }

    &:hover:after {
      display: flex;
    }
  }

  .photoSizeDiv {
    width: 53px;
    height: 53px;
    margin-bottom: 14px;
  }

  #attach {
    display: none;
  }
`;

export const EmojiArea = styled.div<IEmoji>`
  height: ${(props) => props.emoji}px;
  transition: all ease .2s;
  overflow-y: hidden;

  aside.emoji-picker-react {
    width: auto;
    background: none;
    height: 100%;
  }
  .emoji-picker-react .emoji-group::before {
    background: none;
  }
`;

export const Preview = styled.div`
  flex: 1;
  background-color: #E6E6E6;
  position: relative;
  height: calc(100vh - 60px);
  overflow: hidden;

  .closePreview {
    position: absolute;
    left: 0px;
    top: 15px;
    padding: 8px 16px;
    cursor: pointer;
  }

  img, audio, video {
    margin-top: 110px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  img {
    width: 370px;
    height: 238px;
  }

  video {
    border: 1px solid #D4D4D4;
  }

  .hr {
    border: 1px solid #D4D4D4;
    position: absolute;
    bottom: 100px;
    left: 14px;
    width: 97%;
  }

  .sendPreview {
    background-color: #09E85E;
    color: #FFF;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 20px;
    right: 14px;
    cursor: pointer;
  }
`;

export const ChatWindowFooter = styled.div<IEmoji>`
  display: flex;
  align-items: center;
  height: 62px;

  .emoticonIcon {
    color: ${(props) => props.emojiColor};
  }

  .closeIcon {
    transition: all ease .3s;
  }
`;

export const InputArea = styled.div`
  flex: 1;

  input {
    width: 100%;
    height: 40px;
    border: 0;
    outline: 0;
    background-color: #FFF;
    border-radius: 20px;
    font-size: 15px;
    color: #4A4A4A;
    padding-left: 15px;
    margin-left: 5px;
  }
`;

export const PosInput = styled.div`
  display: flex;
  margin: 0 15px;
  cursor: pointer;
`;