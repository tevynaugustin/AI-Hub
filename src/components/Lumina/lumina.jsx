import React from 'react'
import { useState }  from 'react';
import './lumina.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useNavigate } from 'react-router-dom';
import {getAuth} from "firebase/auth";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import ChatApiKey from '../../chatApiKey'

const Lumina = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  let displayName = "";

  if (user !== null) {
    displayName = user.displayName;
  }

  const [messages, setMessages] = useState([
    {
      message: `Hello ${displayName}, I'm Lumina! Ask me anything!`,
      sentTime: "just now",
      sender: "ChatGPT",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/Home')
  }

  const handlePaste = (event) => {
    event.preventDefault();

    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  }

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "ChatGPT",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "ChatGPT" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + `${ChatApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <>
      <div style={{backgroundColor: "#1f1f1f" ,position:"relative", height: "100vh", width: "100vw"  }}>
      <button className="backButton" onClick={handleBack}>Back To Home</button>       
        <MainContainer>
          <ChatContainer>
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Lumina is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Send a Message" onSend={handleSendRequest} onPaste={handlePaste} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  )
}

export default Lumina