import { useEffect, useState } from "react";
import {
  Container,
  ContainerItem,
  ContainerImg,
  ContainerAudio,
  MessageText,
  MessageDate,
} from "./styles";
import { useStateValue } from "../../contexts/ThemeContext";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { IProps } from "./interfaces";

const MessageItem = ({ data, first }: IProps) => {
  const [time, setTime] = useState("");
  const { state } = useStateValue();

  useEffect(() => {
    if (data.date && data.date.seconds > 0) {
      let d = new Date(data.date.seconds * 1000);
      let hours: string | number = d.getHours();
      let minutes: string | number = d.getMinutes();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    }
  }, [data]);

  const msgAudio = data.seen ? "#4FC3F7" : "#999";
  const imgVideo = data.seen ? "#4FC3F7" : "#FFF";

  const all = {
    position: (state.user?.id === data.from) ? "flex-end" : "flex-start",
    userColor: state.user?.id === data.from ? "#DCF8C6" : "#FFF",
    userDisplay: state.user?.id === data.from ? "flex" : "none",
    ftsMsg: first ? "inline" : "none",
    pos: state.user?.id === data.from ? "-15px" : "100%"
  }

  return (
    <>
      <Container all={all}>
        {data.media === null && (
          <ContainerItem all={all}>
            <div className="parent"></div>
            <MessageText>{data.message}</MessageText>
            <MessageDate className="textMsg" all={all} seenTrue={msgAudio}>
              {time}
              <DoneAllIcon className="doneAllIcon" />
            </MessageDate>
          </ContainerItem>
        )}
        {data.media !== null && data.type === "image/jpeg" && (
          <ContainerImg all={all}>
            <div className="parent"></div>
            <a className="aa" href={data.media.url} target="_blank" rel="noreferrer">
              <img src={data.media.url} alt="random" height="338" width="240" />
            </a>
            <MessageDate className="imgMsg" all={all} seenTrue={imgVideo}>
              {time}
              <DoneAllIcon className="doneAllIcon" />
            </MessageDate>
          </ContainerImg>
        )}
        {data.media !== null && data.type === "audio/mpeg" && (
          <ContainerAudio all={all}>
            <div className="parent"></div>
            <audio controls>
              <source src={data.media.url} type={data.type} />
            </audio>
            <MessageDate className="audioMsg" all={all} seenTrue={msgAudio}>
              {time}
              <DoneAllIcon className="doneAllIcon" />
            </MessageDate>
          </ContainerAudio>
        )}
        {data.media !== null && data.type === "video/mp4" && (
          <ContainerImg all={all}>
            <div className="parent"></div>
            <video width="240" height="338" controls>
              <source src={data.media.url} type={data.type} />
            </video>
            <MessageDate className="videoMsg" all={all} seenTrue={imgVideo}>
              {time}
              <DoneAllIcon className="doneAllIcon" />
            </MessageDate>
          </ContainerImg>
        )}
      </Container>
    </>
  );
};

export default MessageItem;