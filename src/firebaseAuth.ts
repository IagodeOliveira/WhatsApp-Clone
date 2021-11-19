import { IUser, IChatUser, IMessage, ISendData } from "./interfaces";
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
  // orderBy,
  // limit,
  // startAfter,
} from "firebase/firestore";

import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

initializeApp(firebaseConfig);
const db = getFirestore();

//Authentication handling
const auth = getAuth();
let author = [] as any[];

export default {
  fbPopup: async () => {
    const provider = new FacebookAuthProvider();
    let result = await signInWithPopup(auth, provider);
    author.push(auth);
    return result;
  },

  googlePopup: async () => {
    const provider = new GoogleAuthProvider();
    let result = await signInWithPopup(auth, provider);
    return result;
  },

  fbOut: async () => {
    try {
      await signOut(author[0]);
    } catch(error) {
      console.log(error);
    }
  },

  addUser: async (user: IUser) => {
    await setDoc(doc(db, "users", `${user.id}`), {
      avatar: user.avatar,
      id: user.id,
      lastSeen: user.lastSeen,
      name: user.name
    }, { merge: true });
  },

  getContactList: async (user: IUser) => {
    const q = query(collection(db, "users"), where("id", "!=", `${user.id}`));

    const list = [] as IUser[];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc: any) => {
      if(!doc.data().chats) {
        list.push(doc.data());
      } else {
        if(!doc.data().chats.some((e: IChatUser) => e.name === `${user.name}`)) {
          list.push(doc.data());
        } 
      }
    });
    return list;
  },

  addNewChat: async (user: IUser, user2: IUser, setActiveChat: (e: IChatUser) => void) => {
    const newChat = await addDoc(collection(db, "chats"), {
      messages: [],
      users: [user.id, user2.id],
    });

    const obj1 = {
      chats: arrayUnion({
        chatId: newChat.id,
        name: user2.name,
        avatar: user2.avatar,
        to: user2.id,
        from: user.id,
        lastMessage: {
          text: "",
          type: "",
          lastMessageDate: null,
        },
        seen: false,
        unSeen: 0
      }),
    };

    const obj2 = {
      chats: arrayUnion({
        chatId: newChat.id,
        name: user.name,
        avatar: user.avatar,
        to: user.id,
        from: user2.id,
        lastMessage: {
          text: "",
          type: "",
          lastMessageDate: null,
        },
        seen: false,
        unSeen: 0
      }),
    };
    await updateDoc(doc(db, "users", `${user.id}`), obj1);
    await updateDoc(doc(db, "users", `${user2.id}`), obj2);

    const obj3 = {
      chatId: newChat.id,
      name: user2.name,
      avatar: user2.avatar,
      to: user2.id,
      from: user.id,
      lastMessage: {
        text: "",
        type: "",
        lastMessageDate: null,
      },
      seen: false,
      unSeen: 0
    }
    setActiveChat(obj3);
  },

  onChatList: (
    userId: string,
    setChatList: (e: IChatUser[]) => void
  ) => {
    return onSnapshot(doc(db, "users", userId), (doc) => {
      let data = doc.data();
      if (data !== undefined && data.chats) {
        let chats = [...data.chats];
        chats.sort((a: IChatUser, b: IChatUser): number => {
          if (
            a.lastMessage.lastMessageDate &&
            b.lastMessage.lastMessageDate &&
            a.lastMessage.lastMessageDate.seconds > b.lastMessage.lastMessageDate.seconds
          ) {
            return -1;
          }
          if (!a.lastMessage.lastMessageDate && b.lastMessage.lastMessageDate) {
            return -1;
          }
          if (a.lastMessage.lastMessageDate && !b.lastMessage.lastMessageDate) {
            return 1;
          }
          return 0;
        });
        setChatList(chats);
      }
    });          
  },

  onChatContent: (
    chatId: string,
    setMessages: (e: IMessage[]) => void,
    SetChatUsers: (e: string[]) => void,
  ) => {
    return onSnapshot(doc(db, "chats", chatId), (doc) => {
      let data = doc.data();
      if (data !== undefined && data.messages && data.users) {
        setMessages(data.messages);
        SetChatUsers(data.users);
      }
    });
  },

  sendMessage: async (data: ISendData) => {
    const now = new Date();
    let active = false;

    const q = await getDoc(doc(db, "users", `${data.to}`));

    let qData = q.data();

    if (qData !== undefined) {
      if(qData.lastSeen.chat === data.chatId) {
        active = true;
      }
    }

    const obj = {
      messages: arrayUnion({
        type: data.type,
        from: data.userId,
        message: data.text,
        media: data.media,
        date: now,
        seen: active
      }),
    };

    await updateDoc(doc(db, "chats", `${data.chatId}`), obj);

    for (let i in data.chatUsers) {
      const u = await getDoc(doc(db, "users", `${data.chatUsers[i]}`));
      let uData = u.data();
      if (uData !== undefined && uData.chats) {
        let chats = [...uData.chats];
        for (let e in chats) {
          if (chats[e].chatId === data.chatId) {
            chats[e].lastMessage.text = data.text;
            chats[e].lastMessage.type = data.type;
            chats[e].lastMessage.lastMessageDate = now;
            if(chats[e].from === data.userId) {
              chats[e].seen = active;
            } else {
              chats[e].seen = true;
              if(active) {
                chats[e].unSeen = 0;
              } else {
                chats[e].unSeen += 1;
              }
            }
          }
        }
        await updateDoc(doc(db, "users", `${data.chatUsers[i]}`), {
          chats,
        });
      }
    }
  },

  updateLastSeen: async (userId: string, chatId: string, guestId: string) => {
    const now = Timestamp.fromDate(new Date());

    const w = await getDoc(doc(db, "users", `${userId}`));
    let wData = w.data();
    if (wData !== undefined && wData.chats) {
      let chats = [...wData.chats];
      for (let e in chats) {
        if (chats[e].chatId === chatId) {
          chats[e].unSeen = 0;
        }
      }
    
      await updateDoc(doc(db, "users", `${userId}`), {
        "lastSeen.chat": chatId,
        "lastSeen.date": now,
        chats
      });
    }

    const u = await getDoc(doc(db, "users", `${guestId}`));
    let uData = u.data();
    if (uData !== undefined && uData.chats) {
      let chats = [...uData.chats];
      for (let e in chats) {
        if (chats[e].chatId === chatId) {
          chats[e].seen = true;
        }
      }
    
      await updateDoc(doc(db, "users", `${guestId}`), {
        chats
      });
    }

    const q = await getDoc(doc(db, "chats", `${chatId}`));
    let qData = q.data();

    if (qData !== undefined && qData.messages && qData.messages.length > 0) {
      let messages = [...qData.messages];
      for (let e in messages) {
        if (messages[e].from !== userId) {
          if (messages[e].date.seconds < now.seconds) {
            messages[e].seen = true;
          }
        }
      }
      await updateDoc(doc(db, "chats", `${chatId}`), {
        messages,
      });
    }
  },

  refreshUpdate: async (userId: string) => {
    await updateDoc(doc(db, "users", `${userId}`), {
      "lastSeen.chat": null,
      "lastSeen.date": null
    });
  }
};
