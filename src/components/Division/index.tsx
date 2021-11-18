import React, { useState, useEffect, useRef } from "react";
import Login from "../Login";
import SearchMsg from "../SearchMsg";
import Api from "../../firebaseAuth";
import {
  Sidebar,
  ContentArea,
  Header,
  Search,
  ChatList,
  HeaderButtons,
  DropDown,
  SearchContent,
} from "./styles";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";
import { ChatListItem } from "../ChatListItem";
import { ChatDefault } from "../ChatDefault";
import { ChatWindow } from "../ChatWindow";
import NewChat from "../NewChat";

import { IChatUser, IUser, IFaceGoogleUser } from "../../interfaces";
import { useStateValue } from "../../contexts/ThemeContext";

export default () => {
  const [activeChat, setActiveChat] = useState<IChatUser>({} as IChatUser);
  const [chatList, setChatList] = useState([] as IChatUser[]);
  const [chatFilter, setChatFilter] = useState([] as IChatUser[]);
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);
  const [moreIcon, setMoreIcon] = useState(false);
  const [chatIcon, setChatIcon] = useState(false);
  const [donutIcon, setDonutIcon] = useState(false);
  const [firstClick, setFirstClick] = useState(false);

  const inpRef = useRef<HTMLInputElement>(null);

  const { state, dispatch } = useStateValue();

  const all = {
    bColor: focus ? "#FFF" : "#F6F6F6",
    bRadius: focus ? "0" : "20px",
    bBottom: focus ? "0" : "1px solid #EEE",
    transSearch: focus ? "rotate(90deg)" : "rotate(0deg)",
    transArrow: focus ? "rotate(0deg)" : "rotate(-90deg)",
    visibilitySearch: focus ? "hidden" : "visible",
    visibilityArrow: focus ? "visible" : "hidden",
    colorIcon: focus ? "#00BFA5" : "#A7ABAD",
    moreIcon: moreIcon ? "#D5D5D5" : "none",
    drop: moreIcon ? "block" : "none",
    chatIcon: chatIcon ? "#D5D5D5" : "none",
    donutIcon: donutIcon ? "#D5D5D5" : "none",
  };

  useEffect(() => {
    const getChatList = async () => {
      if (inpRef.current) {
        inpRef.current.addEventListener("blur", () => {
          setFocus(false);
        });
      }

      if (state.user !== null) {
        const unsub = Api.onChatList(state.user.id, setChatList);
        return unsub;
      }

      document.addEventListener("mouseup", (e) => {
        const target = e.target as Element;
        setMoreIcon(false);
        setChatIcon(false);
        setDonutIcon(false);
        if (target.localName === "div") {
          setFirstClick(false);
        }
      });
    };
    getChatList();
  }, [state.user]);

  useEffect(() => {
    const updateSeen = async () => {
      if (activeChat.chatId) {
        if (!state.user) {
          return;
        }
        await Api.updateLastSeen(state.user.id, activeChat.chatId, activeChat.to);
      }
    };
    updateSeen();
  }, [activeChat]);

  const handleLoginData = async (u: IFaceGoogleUser) => {
    const newUser: IUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL,
      lastSeen: {
        chat: null,
        date: null,
      },
    };
    await Api.addUser(newUser);
    dispatch({ type: 'addUser', payload: newUser });
  };

  const handleChatClick = async (index: number) => {
    setActiveChat(chatList[index]);
  };

  const handleFilterClick = async (index: number) => {
    setActiveChat(chatFilter[index]);
  };

  const handleLogOut = async () => {
    if (state.user) {
      await Api.fbOut();
      await Api.refreshUpdate(state.user.id);
    }
    dispatch({ type: 'removeUser', payload: null });
    setMoreIcon(false);
  };

  const handleDonutIcon = (e: any) => {
    if (!firstClick) {
      setDonutIcon(true);
    } else {
      setDonutIcon(false);
    }
    setFirstClick((prevState) => !prevState);
    setChatIcon(false);
    setMoreIcon(false);
  };

  const handleChatIcon = (e: any) => {
    setShow(true);
    if (!firstClick) {
      setChatIcon(true);
    } else {
      setChatIcon(false);
    }
    setFirstClick((prevState) => !prevState);
    setDonutIcon(false);
    setMoreIcon(false);
  };

  const handleMoreIcon = (e: any) => {
    if (!firstClick) {
      setMoreIcon(true);
    } else {
      setMoreIcon(false);
    }
    setFirstClick((prevState) => !prevState);
    setChatIcon(false);
    setDonutIcon(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    let search = e.target.value;
    let ar = [] as IChatUser[];

    if (!(chatList.length > 0) || search === "") {
      setChatFilter([]);
      return;
    }

    let regex = new RegExp(search, "gi");
    for (let i in chatList) {
      let chatName = chatList[i].name;
      if (chatName) {
        if (chatName.match(regex)) {
          ar.push(chatList[i]);
        }
      }
    }
    setChatFilter(ar);
  };

  if (state.user === null) {
    return <Login onReceive={handleLoginData} />;
  }

  return (
    <>
      <NewChat
        show={show}
        setShow={setShow}
        setActiveChat={setActiveChat}
      />
      <Sidebar>
        <Header>
          <img src={state.user.avatar ? state.user.avatar : ""} alt="avatar" />
          <HeaderButtons all={all}>
            <li className="donutIcon" onClick={handleDonutIcon}>
              <DonutLargeIcon />
              {!donutIcon && <span className="tooltip dtip">Status</span>}
            </li>
            <li className="chatIcon">
              <ChatIcon onClick={handleChatIcon} />
              {!chatIcon && <span className="tooltip ctip">New Chat</span>}
            </li>
            <li className="moreIcon" onClick={handleMoreIcon}>
              <MoreVertIcon />
              {!moreIcon && <span className="tooltip mtip">More options</span>}
              <DropDown all={all}>
                <div>New Group</div>
                <div onClick={handleLogOut}>Disconnect</div>
              </DropDown>
            </li>
          </HeaderButtons>
        </Header>
        <Search all={all}>
          <div className="search-field">
            <SearchIcon className="searchIcon" />
            <ArrowBackIcon className="arrowIcon" />
            <input
              type="search"
              placeholder="Search or start new conversation"
              ref={inpRef}
              onClick={() => setFocus(true)}
              onChange={handleSearch}
            />
          </div>
        </Search>
        <ChatList>
          {chatFilter.length === 0 &&
            chatList.map((item, index) => (
              <ChatListItem
                key={index}
                data={item}
                active={activeChat.chatId === chatList[index].chatId}
                click={() => handleChatClick(index)}
              />
            ))}
          {chatFilter.length > 0 &&
            chatFilter.map((item, index) => (
              <ChatListItem
                key={index}
                data={item}
                active={activeChat.chatId === chatFilter[index].chatId}
                click={() => handleFilterClick(index)}
              />
            ))}
        </ChatList>
      </Sidebar>
      <ContentArea>
        {activeChat.chatId !== undefined && (
          <ChatWindow guest={activeChat} />
        )}
        {activeChat.chatId === undefined && <ChatDefault />}
      </ContentArea>
      <SearchContent width={state.sIcon ? 35 : 0}>
        <SearchMsg guest={activeChat} />
      </SearchContent>
    </>
  );
};
