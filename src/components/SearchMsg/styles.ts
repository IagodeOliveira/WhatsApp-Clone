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

export const Container = styled.div`
  width: 35%;
  max-width: 415px;
  position: fixed;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #DDD;
  background-color: #FFF;
  transition: right ease .2s;
  z-index: 3;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  background-color: #EDEDED;
  height: 60px;
`;

export const HeaderIcon = styled.ul`
  list-style: none;

  li {
    display: inline-block;
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: 29px;
    margin-left: -15px;
    color: #51585C;
  }
`;

export const HeaderTitle = styled.div`
  flex: 1;
  height: inherit;
  line-height: 54px;
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

export const ContentArea = styled.div`
  height: 100vh;
  text-align: center;
  line-height: 130px;
  color: #8C8C8C;
  font-size: 14px;
`;

