import { useEffect, useState } from "react";
import "./App.css";
import ChatList from "./components/chatList/Chatlist";
import ChatMessages from "./components/chatMessages/Chatmessages";

const App = () => {
  // const [theme, setTheme] = useState('light');
  const [chats, setChats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          "https://devapi.beyondchats.com/api/get_all_chats?page=1"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.status === "success" && Array.isArray(data.data.data)) {
          setChats(data.data.data);
        } else {
          throw new Error("Chats data format is invalid");
        }
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
    console.log(selectedChat);
    console.log(messages);
  };

  const handleBack = () => {
    setSelectedChat(null);
    console.log("clicked")
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching chats: {error.message}</p>;
  }

  return (
    <div className="app">
      {windowWidth <= 892 && selectedChat ? (
        <ChatMessages
          messages={messages}
          chat={selectedChat}
          onBack={handleBack}
        />
      ) : (
        <>
          <ChatList
            chats={chats}
            onClickChat={onClickChat}
            selectedChat={selectedChat}
          />
          {windowWidth > 892 && (
            <ChatMessages messages={messages} chat={selectedChat}  onBack={handleBack} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
