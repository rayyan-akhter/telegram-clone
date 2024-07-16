import { useEffect, useState } from "react";
import "./App.css";
import ChatList from "./components/chatList/Chatlist";
import ChatMessages from "./components/chatMessages/Chatmessages";

import { ClipLoader } from "react-spinners";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 
  

  useEffect(() => {
    const fetchChats = async () => {
      setLoading(true);
      try {
        // Fetch all pages of chats
        const allChats = [];
        let page = 1;
        let hasMore = true;
        while (hasMore) {
          const response = await fetch(
            `https://devapi.beyondchats.com/api/get_all_chats?page=${page}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (data.status === "success" && Array.isArray(data.data.data)) {
            allChats.push(...data.data.data);
            page++;
            hasMore = data.data.data.length > 0;
          } else {
            throw new Error("Chats data format is invalid");
          }
        }
        setChats(allChats);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${selectedChat.id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (data.status === "success" && Array.isArray(data.data)) {
            setMessages(data.data);
          } else {
            throw new Error("Messages data format is invalid: " + data.message);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
          setError(error);
        }
      };

      fetchMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

 
  const onClickChat = (chat) => {
    setSelectedChat(chat);
   
  };

  const handleBack = () => {
    setSelectedChat(null);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  if (loading) {
    return (
      <div className="loader">
        <ClipLoader size={200} />;
      </div>
    );
  }

  if (error) {
    return <p className="loader">Error fetching chats: {error.message}</p>;
  }

  return (
    <div className="app">
      {windowWidth <= 892 && selectedChat ? (
        <ChatMessages
          messages={messages}
          chat={selectedChat}
          onBack={handleBack}
          isDarkMode={isDarkMode}
        />
      ) : (
        <>
          <ChatList
            chats={chats}
            onClickChat={onClickChat}
            selectedChat={selectedChat}
            chat={selectedChat}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          {windowWidth > 892 && (
            <ChatMessages
              messages={messages}
              chat={selectedChat}
              onBack={handleBack}
              isDarkMode={isDarkMode}
            />
          )}
        
        </>
      )}
    </div>
  );
};

export default App;
