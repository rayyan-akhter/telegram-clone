import React, { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import chatIcon from "../../assets/chatIcon.jpg";
import "./style.css";
import SideBar from "../sideBar/Sidebar";
import { format } from "date-fns";


const ChatList = ({
  chats,
  onClickChat,
  selectedChat,
  messages,
  isDarkMode,
  toggleDarkMode,
}) => {
  const [selectedTab, setSelectedTab] = useState("All");
  const [sideBar, setSideBar] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const sidebarRef = useRef(null);

  const handleHamBurger = () => {
    setSideBar((prevState) => !prevState);
  };

  const filteredChats = chats.filter((chat) => {
    if (selectedTab === "All") {
      return true;
    } else {
      return chat.status.toLowerCase() === selectedTab.toLowerCase();
    }
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "Pp");
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
        <div className="search-container" style={{ borderColor: isInputFocused ? "#766ac8" : "#212121" }}>
          <FaSearch className="search-icon" size={20} style={{ color: isInputFocused ? "#766ac8" : "#545454" }} />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </div>
      </div>
      <div className="tabs-container">
        <div
          className={`tabs ${selectedTab === "All" ? "active" : ""}`}
          onClick={() => setSelectedTab("All")}
        >
          All
          <div className="underLine"/>

        </div>
        <div
          className={`tabs ${selectedTab === "Ongoing" ? "active" : ""}`}
          onClick={() => setSelectedTab("Ongoing")}
        >
          Read
          <div  className="underLine"/>

        </div>
        <div
          className={`tabs ${selectedTab === "unread" ? "active" : ""}`}
          onClick={() => setSelectedTab("unread")}
        >
          Unread
          <div  className="underLine"/>
        </div>
      </div>

      {filteredChats.length === 0 ? (
        <div className="chatLists no-chat-found">No chats found.</div>
      ) : (
        <div className="chatLists">
          {filteredChats.map((chat) => (
            <div
              className={`chat ${
                selectedChat && selectedChat.id === chat.id ? "selected" : ""
              }`}
              key={chat.id}
              onClick={() => onClickChat(chat)}
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
                  <div className="last-msg-time">{formatDate(chat.updated_at)}</div>
                </div>
                <div className="info-subtitles">
                  <p className="last-message">tap message to open</p>
                  <div className="unread-no-msgs">{chat.msg_count}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div ref={sidebarRef}>
        {sideBar && <div className="overLay" onClick={handleHamBurger} />}

        <SideBar
          isVisible={sideBar}
          onClose={handleHamBurger}
          chat={selectedChat}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    </div>
  );
};

export default ChatList;
