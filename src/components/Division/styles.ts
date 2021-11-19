import styled from 'styled-components';

interface IF {
  bColor: string;
  bRadius: string;
  bBottom: string;
  transSearch: string;
  transArrow: string;
  visibilitySearch: string;
  visibilityArrow: string;
  colorIcon: string;
  moreIcon: string;
  drop: string;
  chatIcon: string;
  donutIcon: string;
}

interface IFocus {
  all: IF;
}

interface IOther {
  width: number;
}

export const Sidebar = styled.div`
  width: 35%;
  max-width: 415px;
  display: flex;
  flex-direction: column;
  border: 1px solid #DDD;
`;

export const Header = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const HeaderButtons = styled.ul<IFocus>`
  list-style: none;
  display: flex;

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

  .moreIcon {
    background-color: ${(props) => props.all.moreIcon};
    position: relative;
  }
  .chatIcon {
    background-color: ${(props) => props.all.chatIcon};
    position: relative;
  }
  .donutIcon {
    background-color: ${(props) => props.all.donutIcon};
    position: relative;
  }

  .tooltip {
    visibility: hidden;
    border: 1px solid #222;
    font-size: 11px;
    padding: 5px 7px;
    background-color: beige;
    position: absolute;
    top: 35px;
    left: 26px;
    font-weight: bold;
  }

  .donutIcon:hover .dtip {
    visibility: visible;
  }

  .chatIcon:hover .ctip {
    visibility: visible;
    width: 70px;
  }

  .moreIcon:hover .mtip {
    visibility: visible;
    width: 88px;
    z-index: 4;
  }

`;

export const DropDown = styled.div<IFocus>`
  background-color: #FFF;
  width: 218px;
  height: 217;
  position: absolute;
  top: 44px;
  right: 0px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26), 0 2px 10px 0 rgba(0, 0, 0, 0.16);
  padding: 13px 0;
  display: ${(props) => props.all.drop};
  z-index: 2;

  & * {
    padding: 13px 58px 13px 24px;
  }

  & *:hover {
    background-color: #F5F5F5;
  }
`;

export const Search = styled.div<IFocus>`
  background-color: ${(props) => props.all.bColor};
  border-bottom: ${(props) => props.all.bBottom};
  padding: 5px 15px;

  .search-field {
    display: flex;
    align-items: center;
    background-color: #FFF;
    border-radius: ${(props) => props.all.bRadius};
    height: 40px;
    padding: 0 10px;
  }

  input {
    flex: 1;
    border: none;
    outline: 0;
    background-color: transparent;
    margin-left: 30px;
  }

  .searchIcon {
    color: ${(props) => props.all.colorIcon};
    transform: ${(props) => props.all.transSearch};
    visibility: ${(props) => props.all.visibilitySearch};
    transition: transform .8s ease, color .4s ease;
  }

  .arrowIcon {
    color: ${(props) => props.all.colorIcon};
    margin-left: -25px;
    transform: ${(props) => props.all.transArrow};
    visibility: ${(props) => props.all.visibilityArrow};
    transition: transform .8s ease, color .4s ease;
  }

`;

export const ChatList = styled.div`
  flex: 1;
  background-color: #FFF;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, .2);
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ContentArea = styled.div`
  flex: 1;
`;

export const SearchContent = styled.div<IOther>`
  width: ${(props) => props.width}%;
  max-width: 415px;
`;
