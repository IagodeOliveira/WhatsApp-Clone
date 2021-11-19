import React, { useState, useEffect, useRef } from "react";
import EmojiPicker, { IEmojiData } from "emoji-picker-react";
import MessageItem from "../MessageItem";
import Api from "../../firebaseAuth";
import { useStateValue } from "../../contexts/ThemeContext";

import {
  Container,
  ChatWindowHeader,
  HeaderInfo,
  Icons,
  ChatWindowBody,
  ChatWindowFooter,
  InputArea,
  PosInput,
  EmojiArea,
  DropDown,
  AttachIcons,
  Preview,
} from "./styles";

import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import CloseIcon from "@material-ui/icons/Close";
import MicIcon from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";

import LocalSeeIcon from "@material-ui/icons/LocalSee";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import PhotoSizeSelectActualIcon from "@material-ui/icons/PhotoSizeSelectActual";
import PersonIcon from "@material-ui/icons/Person";

import { IMessage, ITest, ISendData, TimeStamp } from "../../interfaces";

import { IProps } from "./interfaces";

export const ChatWindow = ({ guest }: IProps) => {
  const msgDate = [] as string[];

  const { webkitSpeechRecognition } = window as any;
  const recognition = new webkitSpeechRecognition();

  const [close, setClose] = useState(false);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [hasFile, setHasFile] = useState(false);
  const [messages, setMessages] = useState([] as IMessage[]);
  const [chatUsers, setChatUsers] = useState([] as string[]);
  const [searchIcon, setSearchIcon] = useState(false);
  const [moreIcon, setMoreIcon] = useState(false);
  const [attachIcon, setAttachIcon] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [form, setForm] = useState<HTMLFormElement | null>(null);

  const bodyArea = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { state, dispatch } = useStateValue();

  const all = {
    searchIcon: searchIcon ? "#D5D5D5" : "none",
    moreIcon: moreIcon ? "#D5D5D5" : "none",
    attachIcon: attachIcon ? "#D5D5D5" : "none",
    menuIcons: attachIcon ? "block" : "none",
    drop: moreIcon ? "block" : "none",
  };

  useEffect(() => {
    if (!bodyArea.current) throw Error("divRef is not assigned");
    if (bodyArea.current.scrollHeight > bodyArea.current.offsetHeight) {
      bodyArea.current.scrollTo(0, bodyArea.current.scrollHeight);
    }
  }, [messages, guest, hasFile]);

  useEffect(() => {
    setMessages([]);
    setText("");
    setHasFile(false);
    setClose(false);
    const unsub = Api.onChatContent(guest.chatId, setMessages, setChatUsers);
    return unsub;
  }, [guest.chatId]);

  useEffect(() => {
    document.addEventListener("mouseup", (e) => {
      const target = e.target as Element;
      setMoreIcon(false);
      setSearchIcon(false);
      setAttachIcon(false);
      if (target.localName === "div") {
        setFirstClick(false);
      }
    });
  }, []);

  const handleDate = (item: TimeStamp) => {
    return new Date(item.seconds * 1000).toLocaleDateString();
  };

  const handleFiles = async (e: { target: HTMLInputElement }) => {
    setForm(formRef.current);
    const target = e.target;
    const file: File = (target.files as FileList)[0];
    if (file && file.type !== "video/mp4") {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setFile(this.result);
      });
      reader.readAsDataURL(file);
    } else {
      const url = URL.createObjectURL(file);
      setFile(url);
    }
    setHasFile(true);
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleClose = (bool: boolean) => {
    setClose(bool);
  };

  const handleOpen = (bool: boolean) => {
    handleClose(bool);
  };

  const onEmojiClick = (
    e: React.MouseEvent<Element>,
    emojiObject: IEmojiData
  ) => {
    setText((prevText) => prevText + emojiObject.emoji);
  };

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const handleEnterKeyText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((text !== "" || hasFile) && e.key === "Enter") {
      handleSendClick();
    }
  };

  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onresult = (e: ITest) => {
        setText(e.results[0][0].transcript);
      };
      recognition.start();
    }
  };

  const handleSendClick = async () => {
    if (!hasFile && state.user) {
      let data: ISendData = {
        chatId: guest.chatId,
        userId: state.user.id,
        type: "text",
        text,
        media: null,
        chatUsers,
        to: guest.to,
      };

      Api.sendMessage(data);
    } else if (hasFile && form && state.user) {
      const formData = new FormData(form);
      const options = {
        method: "POST",
        body: formData,
      };
      try {
        const response = await fetch("/upload", options);
        const media = await response.json();

        let data: ISendData = {
          chatId: guest.chatId,
          userId: state.user.id,
          type: media[1].type,
          text: null,
          media: media[0],
          chatUsers,
          to: guest.to,
        };

        Api.sendMessage(data);
      } catch (e) {
        console.log("errrrrrouuuuuuuuu:", e);
      }
    } else {
      console.log("aqui");
    }
    setHasFile(false);
    setText("");
    setClose(false);
    setForm(null);
    setFile(null);
  };

  const handleSearchIcon = () => {
    if (!firstClick) {
      setSearchIcon(true);
    } else {
      setSearchIcon(false);
    }
    dispatch({ type: "show" });
    setFirstClick((prevState) => !prevState);
    setAttachIcon(false);
    setMoreIcon(false);
  };

  const handleMoreIcon = () => {
    if (!firstClick) {
      setMoreIcon(true);
    } else {
      setMoreIcon(false);
    }
    setFirstClick((prevState) => !prevState);
    setAttachIcon(false);
    setSearchIcon(false);
  };

  const handleAttachIcon = () => {
    if(close) setClose(false);
    if (!firstClick) {
      setAttachIcon(true);
    } else {
      setAttachIcon(false);
    }
    setFirstClick((prevState) => !prevState);
    setMoreIcon(false);
    setSearchIcon(false);
  };

  return (
    <>
      <Container>
        <ChatWindowHeader>
          <HeaderInfo>
            <img src={guest.avatar ? guest.avatar : ""} alt="avatar" />
            <p>{guest.name}</p>
          </HeaderInfo>

          <Icons all={all}>
            <li className="searchIcon" onClick={handleSearchIcon}>
              <SearchIcon className="searchIconSelf" />
              {!searchIcon && <span className="tooltip stip">Search...</span>}
            </li>
            <li className="moreIcon" onClick={handleMoreIcon}>
              <MoreVertIcon />
              {!moreIcon && <span className="tooltip mtip">More options</span>}
              <DropDown all={all}>
                <div>Close Chat</div>
                <div>Delete Chat</div>
              </DropDown>
            </li>
          </Icons>
        </ChatWindowHeader>

        <ChatWindowBody ref={bodyArea}>
          {!hasFile &&
            messages.map((item, index) => {
              if (msgDate.includes(handleDate(item.date))) {
                return (
                  <MessageItem
                    key={index}
                    data={item}
                    first={false}
                  />
                );
              } else {
                msgDate.push(handleDate(item.date));
                return (
                  <div key={index}>
                    <div className="messageDate">
                      <span>{handleDate(item.date)}</span>
                    </div>
                    <MessageItem data={item} first={true} />
                  </div>
                );
              }
            })}
          {hasFile && file && (
            <Preview>
              <div className="closePreview">
                <CloseIcon onClick={() => setHasFile(false)} />
              </div>
              {file.slice(5, 10) === "image" && (
                <img src={file ? file : ""} alt="Preview" />
              )}
              {file.slice(5, 10) === "audio" && (
                <audio controls>
                  <source src={file ? file : ""} type="audio/mpeg" />
                </audio>
              )}
              {file.slice(0, 4) === "blob" && (
                <video width="370" height="238" controls>
                  <source src={file ? file : ""} type="video/mp4" />
                </video>
              )}
              <div className="hr" />
              <div className="sendPreview" onClick={handleSendClick}>
                <SendIcon />
              </div>
            </Preview>
          )}
        </ChatWindowBody>

        <EmojiArea emoji={close ? 198 : 0}>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </EmojiArea>

        {!hasFile && (
          <ChatWindowFooter emojiColor={close ? "#009688" : "##51585C"}>
            <Icons all={all}>
              {close && (
                <li>
                  <CloseIcon
                    className="closeIcon"
                    onClick={() => handleClose(false)}
                  />
                </li>
              )}
              <li className="emoticonIcon">
                <InsertEmoticonIcon onClick={() => handleOpen(true)} />
              </li>
              <li className="attachIcon" onClick={handleAttachIcon}>
                <AttachFileIcon />
                {!attachIcon && <span className="tooltip atip">Attach</span>}

                <AttachIcons all={all}>
                  <div className="personIcon">
                    <PersonIcon />
                  </div>
                  <div className="noteAddIcon">
                    <NoteAddIcon />
                  </div>
                  <div className="localSeeIcon">
                    <LocalSeeIcon />
                  </div>
                  <div className="photoDiv">
                    <form
                      ref={formRef}
                      action=""
                      encType="multipart/form-data"
                      method="post"
                    >
                      <label htmlFor="attach">
                        <div className="photoSizeDiv">
                          <PhotoSizeSelectActualIcon className="PhotoIcon" />
                        </div>
                      </label>
                      <input
                        id="attach"
                        ref={inputRef}
                        name="data"
                        type="file"
                        onChange={handleFiles}
                      />
                    </form>
                  </div>
                </AttachIcons>
              </li>
            </Icons>

            <InputArea>
              <input
                type="text"
                placeholder="Type a message"
                value={text}
                onChange={handleText}
                onKeyUp={handleEnterKeyText}
              />
            </InputArea>

            <PosInput>
              <Icons all={all}>
                {text === "" && !hasFile && (
                  <li>
                    <MicIcon
                      onClick={handleMicClick}
                      style={{ color: listening ? "#126ECE" : "#51585C" }}
                    />
                  </li>
                )}
                {(text !== "" || hasFile) && (
                  <li>
                    <SendIcon onClick={handleSendClick} />
                  </li>
                )}
              </Icons>
            </PosInput>
          </ChatWindowFooter>
        )}
      </Container>
    </>
  );
};
