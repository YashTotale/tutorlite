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
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import Select from "react-select";
import { Message } from "../Store";
import { convertFirestoreDate } from "../utils/funcs";

interface SelectOption {
  label: string;
  value: string;
}

interface ChatComponent {
  id: string;
  avatar: string;
  alt: string;
  title: string;
  date: Date | null;
  subtitle: string;
}

export default function Chat(): JSX.Element | null {
  useFirestoreConnect({ collection: "users" });
  useFirestoreConnect({ collection: "chats" });

  const firestore = useFirestore();

  const [selected, setSelected] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [newChat, setNewChat] = useState<SelectOption | null>(null);

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

  const onNewChat = (option: SelectOption | null) => {
    setNewChat(option);

    if (option === null) return;

    firestore
      .collection("chats")
      .add({
        messages: [],
        users: [user.uid, option.value],
      })
      .then((doc) => {
        firestore
          .collection("users")
          .doc(user.uid)
          .update("chats", [...users[user.uid].chats, doc.id]);

        firestore
          .collection("users")
          .doc(option.value)
          .update("chats", [...users[option.value].chats, doc.id]);
      })
      .then(() => {
        window.location.reload();
      });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (input) {
      setInput("");

      firestore
        .collection("chats")
        .doc(selected as string)
        .update("messages", [
          ...chatsObj[selected as string].messages,
          {
            text: input,
            date: new Date(),
            user: user.uid,
          },
        ]);
    }
  };

  return (
    <div id="chat-container">
      <div id="chats-list">
        <div id="chat-add">
          <Select
            placeholder="New chat..."
            options={Object.entries(users).reduce((arr, [id, u]) => {
              if (user.uid === id || chats.find((c) => c.users.includes(id)))
                return arr;

              return [
                ...arr,
                {
                  label: u.name,
                  value: id,
                },
              ];
            }, [] as SelectOption[])}
            value={newChat}
            onChange={onNewChat}
          />
        </div>
        <ChatList
          className="chat-list"
          dataSource={chats
            .filter((c) => c.users.includes(user.uid))
            .map(
              (c): ChatComponent => {
                const otherUser =
                  users[c.users.filter((u) => u !== user.uid)[0]];
                const lastMessage: Message | undefined =
                  c.messages[c.messages.length - 1];

                return {
                  id: c.id,
                  avatar: otherUser.picture,
                  alt: otherUser.name,
                  title: otherUser.name,
                  date: lastMessage
                    ? convertFirestoreDate(lastMessage.date)
                    : null,
                  subtitle:
                    lastMessage &&
                    `${users[lastMessage.user].name}: ${lastMessage.text}`,
                };
              }
            )}
          onClick={(c: ChatComponent) => setSelected(c.id)}
        />
      </div>
      <div id="chat-showcase">
        <h6>
          {selected
            ? chatsObj[selected]
              ? `Chatting with ${
                  users[
                    chatsObj[selected].users.filter((u) => u !== user.uid)[0]
                  ].name
                }`
              : "Chatting"
            : "No Chat Selected"}
        </h6>
        {selected &&
          chatsObj[selected]?.messages.map((m, i) => (
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
          ))}
        {selected && (
          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input"
              type="text"
            />
            <button className="chat-input-send">Send</button>
          </form>
        )}
      </div>
    </div>
  );
}
