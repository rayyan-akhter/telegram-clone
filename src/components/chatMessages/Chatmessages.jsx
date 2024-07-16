import React from "react";
import "./style.css";
import chatIcon from "../../assets/chatIcon.jpg";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachmentIcon from "@mui/icons-material/Attachment";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SearchIcon from "@mui/icons-material/Search";
import CallIcon from "@mui/icons-material/Call";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from "date-fns";

const ChatMessages = ({ messages, chat, onBack ,isDarkMode }) => {
  
  if (!messages) {
    return <p className="messages-container">Loading messages...</p>;
  }

  if (!chat) {
    return <p className="messages-container"></p>;
  }

  const renderMessageClass = (message) => {
    const isSenderMessage = message.sender_id === chat.creator.id;
    return isSenderMessage ? "senderChats" : "myChat";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "p");
  };

  return (
    <section className={`messages-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="chatMessages-header">
        
      {window.innerWidth <= 892 && (
       
          <ArrowBackIcon className="backBtn" onClick={onBack} />
        )}
        
        {chat && (
          <div className="chat-container">
            <div className="chatList-top-icon-container">
              <img src={chatIcon} alt="" />
            </div>
            <div className="info">
              <div className="chat-header-info-row">
                <div className="info-title">
                  <h4>{chat.creator.name}</h4>
                </div>
                <div className="separator"></div>
                <div className="last-msg-time">No data here</div>
              </div>
            </div>
            <div className="chatList-bottom-icon-container">
              <SearchIcon />
              <CallIcon />
              <MoreVertIcon />
            </div>
          </div>
        )}
      </div>
      <div className="message-list-container">
        <div className="messegeList">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${renderMessageClass(message)}`}
            >
              <p className="message-text">{message.message}</p>
              <div className={`last-msg-time ${renderMessageClass(message)}-time`}>
                <p>{formatDate(message.updated_at)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="message-footer">
          <div className="message-input-container">
            <SentimentSatisfiedAltIcon />
            <input type="text" placeholder="Message" />
            <AttachmentIcon className="attachment-icon" />
          </div>
          <div className="message-voice-input">
            <MicNoneIcon />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatMessages;
