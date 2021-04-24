import React, { useState } from "react";
import "react-chat-elements/dist/main.css";
//@ts-expect-error No typing
import { ChatList } from "react-chat-elements";
import { useSelector } from "react-redux";
import {
  getChats,
  getChatsLoading,
  getChatsObj,
  getUser,
  getUsers,
  getUsersLoading,
} from "../redux";
import { useHistory } from "react-router";
import { useFirestoreConnect } from "react-redux-firebase";

interface ChatComponent {
  id: string;
  avatar: string;
  alt: string;
  title: string;
  subtitle: string;
}

export default function Chat(): JSX.Element | null {
  useFirestoreConnect({ collection: "users" });
  useFirestoreConnect({ collection: "chats" });

  const [selected, setSelected] = useState<string | null>(null);

  const history = useHistory();
  const user = useSelector(getUser);

  const users = useSelector(getUsers);
  const usersLoading = useSelector(getUsersLoading);

  const chats = useSelector(getChats);
  const chatsObj = useSelector(getChatsObj);
  const chatsLoading = useSelector(getChatsLoading);

  if (!chats || chatsLoading || !users || usersLoading) {
    return null;
  }

  if (user.isEmpty) {
    history.push("/register");
  }

  return (
    <div id="chat-container">
      <div id="chats-list">
        <ChatList
          className="chat-list"
          dataSource={chats.map(
            (c): ChatComponent => {
              const otherUser = users[c.users.filter((u) => u !== user.uid)[0]];
              const lastMessage = c.messages[c.messages.length - 1];

              return {
                id: c.id,
                avatar: otherUser.picture,
                alt: otherUser.name,
                title: otherUser.name,
                subtitle: `${users[lastMessage.user].name}: ${
                  lastMessage.text
                }`,
              };
            }
          )}
          onClick={(c: ChatComponent) => setSelected(c.id)}
        />
      </div>
      <div id="chat-showcase">
        {selected
          ? chatsObj[selected].messages.map((m, i) => (
              <div
                key={i}
                className={`chat-${
                  m.user === user.uid ? "right" : "left"
                } chat-message`}
              >
                <img
                  className="chat-image"
                  src={users[m.user].picture}
                  alt={users[m.user].name}
                />
                <div>{m.text}</div>
              </div>
            ))
          : "No chat selected"}
      </div>
    </div>
  );
}
