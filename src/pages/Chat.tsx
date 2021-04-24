import React from "react";
import "react-chat-elements/dist/main.css";
//@ts-expect-error No typing
import { ChatList } from "react-chat-elements";
import { useSelector } from "react-redux";
import { getUser } from "../redux";
import { useHistory } from "react-router";

export default function Chat() {
  const history = useHistory();
  const user = useSelector(getUser);

  if (user.isEmpty) {
    history.push("/register");
  }

  return (
    <div>
      <ChatList
        className="chat-list"
        dataSource={[
          {
            avatar: "https://facebook.github.io/react/img/logo.svg",
            alt: "Reactjs",
            title: "Facebook",
            subtitle: "What are you doing?",
            date: new Date(),
            unread: 0,
          },
        ]}
      />
    </div>
  );
}
