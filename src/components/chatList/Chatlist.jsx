import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import chatIcon from "../../assets/chatIcon.jpg";
import "./style.css";
import SideBar from "../sideBar/Sidebar";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ChatMessages from "../chatMessages/Chatmessages";

const ChatList = ({ chats, onClickChat, selectedChat, messages }) => {
  const [sideBar, setSideBar] = useState(false);

  const handleHamBurger = () => {
    setSideBar((prevState) => !prevState);
  };

  return (
    <div className="chatList-container">
      <div className="chatList-header">
        <div
          className={`hamburger-wrapper ${sideBar ? "hamburger-active" : ""}`}
          onClick={handleHamBurger}
        >
          <RxHamburgerMenu size={23} color="#ffffff" />
        </div>
        <h3 className="title">Telegram</h3>
        <div className="search-container">
          <FaSearch className="search-icon" size={20} />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>
      
      <div className="chatLists">
        {chats.map((chat) => (
          <div
            className={`chat ${
              selectedChat && selectedChat.id === chat.id ? "selected" : ""
            }`}
            key={chat.id}
            onClick={() => {
              console.log(chat);
              onClickChat(chat);
            }}
          >
            <div className="chatList-icon-container">
              <img src={chatIcon} alt="" />
            </div>
            <div className="info">
              <div className="info-row">
                <div className="info-title">
                  <h4>{chat.creator.name}</h4>
                </div>
                <div className="separator"></div>
                <div className="last-msg-time">{chat.status}</div>
              </div>
              <div className="info-subtitles">
                <p className="last-message"></p>
                <div className="unread-no-msgs">{chat.msg_count}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <SideBar isVisible={sideBar} onClose={handleHamBurger} />
    </div>
  );
};

export default ChatList;
