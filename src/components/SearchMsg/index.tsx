import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Header,
  HeaderIcon,
  HeaderTitle,
  Search,
  ContentArea,
} from "./styles";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";

import { useStateValue } from "../../contexts/ThemeContext";
import { IProps } from "./interfaces";


export default ({ guest }: IProps) => {
  const [focus, setFocus] = useState(false);
  const { state, dispatch } = useStateValue();

  const inpRef = useRef<HTMLInputElement>(null);

  const all = {
    bColor: focus ? "#FFF" : "#F6F6F6",
    bRadius: focus ? "0" : "20px",
    bBottom: focus ? "0" : "1px solid #EEE",
    transSearch: focus ? "rotate(90deg)" : "rotate(0deg)",
    transArrow: focus ? "rotate(0deg)" : "rotate(-90deg)",
    visibilitySearch: focus ? "hidden" : "visible",
    visibilityArrow: focus ? "visible" : "hidden",
    colorIcon: focus ? "#00BFA5" : "#A7ABAD",
  };

  useEffect(() => {
    if (inpRef.current) {
      inpRef.current.addEventListener("blur", () => {
        setFocus(false);
      });
    }
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    return;
  };

  return (
    <Container data-iwindow="0">
      <Header data-iwindow="0">
        <HeaderIcon>
          <li>
            <CloseIcon onClick={() => dispatch({ type: "hide" })} />
          </li>
        </HeaderIcon>
        <HeaderTitle data-iwindow="0">Search Messages</HeaderTitle>
      </Header>
      <Search data-iwindow="0" all={all}>
        <div className="search-field" data-iwindow="0">
          <SearchIcon className="searchIcon" data-iwindow="0" />
          <ArrowBackIcon className="arrowIcon" data-iwindow="0" />
          <input
            type="search"
            placeholder="Search..."
            ref={inpRef}
            onClick={() => setFocus(true)}
            onChange={handleSearch}
            data-iwindow="0"
          />
        </div>
      </Search>
      <ContentArea data-iwindow="0">
        <p data-iwindow="0">Search messages for {`${guest.name}`}.</p>
      </ContentArea>
    </Container>
  );
};
