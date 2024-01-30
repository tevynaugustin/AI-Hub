import React, { useState } from 'react';
import './lumina.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const Lumina = () => {
  // Firebase authentication instance and current user
  const auth = getAuth();
  const user = auth.currentUser;
  let displayName = '';

  // Extract display name from the current user
  if (user !== null) {
    displayName = user.displayName;
  }

  // State for chat messages and typing indicator
  const [messages, setMessages] = useState([
    {
      message: `Hello ${displayName}, I'm Lumina! Ask me anything!`,
      sentTime: 'just now',
      sender: 'ChatGPT',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Navigation hook
  const navigate = useNavigate();

  // Handler for navigating back to Home page
  const handleBack = () => {
    navigate('/Home');
  };

  // Handler for pasting text into the message input
  const handlePaste = (event) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  // Handler for sending user requests to Lumina
  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      // Send user's message to the server
      const response = await fetch('https://ai-hub-backend-production.up.railway.app/ai-chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: message,
        }),
      });

      // Handle server response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      // Display Lumina's response
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: 'ChatGPT',
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div style={{ backgroundColor: '#1f1f1f', position: 'relative', height: '100vh', width: '100vw' }}>

        {/* Button to navigate back to Home page */}
        <button className="backButton" onClick={handleBack}>
          Back To Home
        </button>

        {/* Main chat container */}
        <MainContainer>
          <ChatContainer>
            {/* Message list and typing indicator */}
            <MessageList scrollBehavior="smooth" typingIndicator={isTyping ? <TypingIndicator content="Lumina is typing" /> : null}>
              {messages.map((message, i) => {
                console.log(message);
                return <Message key={i} model={message} />;
              })}
            </MessageList>
            {/* Message input component */}
            <MessageInput placeholder="Send a Message" onSend={handleSendRequest} onPaste={handlePaste} />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
};

export default Lumina;
