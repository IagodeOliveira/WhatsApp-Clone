import React, { useEffect, useState, useRef } from "react";
import { useStateValue } from "../../contexts/ThemeContext";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import {
  Container,
  Header,
  HeaderButton,
  HeaderTitle,
  Search,
  ChatList,
  ChatListItem,
} from "./styles";
import Api from "../../firebaseAuth";
import { IUser } from "../../interfaces";
import { IProps } from "./interfaces";

const NewChat = ({ show, setShow, setActiveChat }: IProps) => {
  const [list, setList] = useState([] as IUser[]);
  const [chatFilter, setChatFilter] = useState([] as IUser[]);
  const [focus, setFocus] = useState(false);

  const { state } = useStateValue();
  const inputRef = useRef<HTMLInputElement>(null);

  const all = {
    bColor: focus ? "#FFF" : "#EDEDED",
    bRadius: focus ? "0" : "20px",
    bBottom: focus ? "0" : "1px solid #EEE",
    transSearch: focus ? "rotate(90deg)" : "rotate(0deg)",
    transArrow: focus ? "rotate(0deg)" : "rotate(-90deg)",
    visibilitySearch: focus ? "hidden" : "visible",
    visibilityArrow: focus ? "visible" : "hidden",
    colorIcon: focus ? "#00BFA5" : "#A7ABAD",
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("blur", () => {
        setFocus(false);
      });
    }
  }, []);

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
      setFocus(true);
    }
  }, [show]);

  useEffect(() => {
    const getList = async () => {
      if (state.user !== null) {
        const response = await Api.getContactList(state.user);
        setList(response);
      }
    };
    getList();
  }, [state.user]);

  const addNewChat = async (user2: IUser) => {
    if(state.user) {
      await Api.addNewChat(state.user, user2, setActiveChat);
      const response = await Api.getContactList(state.user);
      setShow(false);
      setList(response);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.target.value;
    let ar = [] as IUser[];

    if (!(list.length > 0) || search === "") {
      setChatFilter([]);
      return;
    }

    let regex = new RegExp(search, "gi");
    for (let i in list) {
      let chatName = list[i].name;
      if (chatName) {
        if (chatName.match(regex)) {
          ar.push(list[i]);
        }
      }
    }
    setChatFilter(ar);
  };

  return (
    <Container left={show ? 0 : 415}>
      <Header>
        <HeaderButton>
          <li>
            <ArrowBackIcon onClick={() => setShow(false)} />
          </li>
        </HeaderButton>
        <HeaderTitle>New Chat</HeaderTitle>
      </Header>

      <Search all={all}>
        <div className="search-field">
          <SearchIcon className="searchIcon" />
          <ArrowBackIcon className="arrowIcon" />
          <input
            type="search"
            placeholder="Search Contacts"
            onClick={() => setFocus(true)}
            ref={inputRef}
            onChange={handleSearch}
          />
        </div>
      </Search>

      <ChatList>
        {chatFilter.length === 0 &&
          list.map((item, index) => (
            <ChatListItem key={index} onClick={() => addNewChat(item)}>
              <img src={item.avatar ? item.avatar : ""} alt="avatar" />
              <p>{item.name}</p>
            </ChatListItem>
          ))}
        {chatFilter.length > 0 &&
          chatFilter.map((item, index) => (
            <ChatListItem key={index} onClick={() => addNewChat(item)}>
              <img src={item.avatar ? item.avatar : ""} alt="avatar" />
              <p>{item.name}</p>
            </ChatListItem>
          ))}
      </ChatList>
    </Container>
  );
};

export default NewChat;
