import { useEffect, useState } from "react";
import {
  ChatListArea,
  Lines,
  Line,
  Line_Name,
  Line_Date,
  Line_LastMsg,
} from "./styles";

import { IProps } from "./interfaces";

import DoneAllIcon from "@material-ui/icons/DoneAll";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import MicIcon from "@material-ui/icons/Mic";
import VideocamIcon from "@material-ui/icons/Videocam";

export const ChatListItem = ({ click, active, data }: IProps) => {
  const all = {
    backColor: active ? "#EBEBEB" : "FFF",
    isNew: data.lastMessage.text ? "flex" : "none",
    iconSeen: data.seen ? "#4FC3F7" : "#999",
    isActive: active ? "#2F2F2F" : "#999",
    seen: data.seen ? "#06D755" : "#999"
  }

  const [time, setTime] = useState("");
  useEffect(() => {
    if (
      data.lastMessage.lastMessageDate &&
      data.lastMessage.lastMessageDate !== null
    ) {
      let d = new Date(data.lastMessage.lastMessageDate.seconds * 1000);
      let hours: any = d.getHours();
      let minutes: any = d.getMinutes();
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    }
  }, [data]);

  return (
    <ChatListArea onClick={click} all={all}>
      <img src={data.avatar ? data.avatar : ""} alt="avatar" />
      <Lines>
        <Line>
          <Line_Name>{data.name}</Line_Name>
          <Line_Date>{time}</Line_Date>
        </Line>
        <Line>
          <Line_LastMsg all={all}>
            <div className="dad">
            {data.lastMessage.type === "text" && (
              <>
                <DoneAllIcon className="doneAllIcon" />
                <p>{data.lastMessage.text}</p>
              </>
            )}
              {data.lastMessage.type === "image/jpeg" && (
                <div className="file">
                  <PhotoCameraIcon className="PhotoCameraIcon" />
                  <p>Photo</p>
                </div>
              )}
              {data.lastMessage.type === "audio/mpeg" && (
                <div className="file">
                  <MicIcon className="MicIcon" />
                </div>
              )}
              {data.lastMessage.type === "video/mp4" && (
                <div className="file">
                  <VideocamIcon className="VideocamIcon" />
                  <p>Video</p>
                </div>
              )}
            </div>
            {data.unSeen > 0 && <span className="unSeen">{data.unSeen}</span>}
          </Line_LastMsg>
        </Line>
      </Lines>
    </ChatListArea>
  );
};
