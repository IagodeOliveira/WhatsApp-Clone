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
}

interface IFocus {
  all: IF;
}

interface ILeft {
  left: number;
}

export const Container = styled.div<ILeft>`
  width: 35%;
  max-width: 415px;
  position: fixed;
  top: 0;
  left: -${(props) => props.left}px;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #DDD;
  background-color: #FFF;
  transition: left ease .2s;
  z-index: 33;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  background-color: #00BFA5;
  padding: 60px 5px 15px 0px;
  color: #FFF;
  height: 108px;
`;

export const HeaderButton = styled.ul`
  list-style: none;

  li {
    display: inline-block;
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: 29px;
    margin-left: -15px;
  }
`;

export const HeaderTitle = styled.div`
  flex: 1;
  font-size: 19px;
  height: 40px;
  line-height: 35px;
  font-weight: bold;
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

export const ChatListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  color: red;

  &:hover {
    background-color: #F5F5F5;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }

  p {
    font-size: 17px;
    color: #000;
  }
`;