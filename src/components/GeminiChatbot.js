// src/components/GeminiChatbot.js
import React, { useState, useRef, useEffect } from 'react';
import { Cpu, Send } from 'react-feather';
import { gemini } from '../services/gemini';
import './GeminiChatbot.css';

const GeminiChatbot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI assistant for campus events. Ask me about any event, why you should attend, or how to make the most of them!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await gemini.generateContent(userMessage);
      const botResponse = await response.response.text();
      setMessages((prev) => [...prev, { role: 'assistant', content: botResponse }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-card">
        <div className="chatbot-header">
          <Cpu size={20} />
          <h2>AI Event Assistant</h2>
        </div>

        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chatbot-message ${
                message.role === 'user' ? 'user-message' : 'assistant-message'
              }`}
            >
              {message.content}
            </div>
          ))}

          {isLoading && (
            <div className="assistant-message chatbot-message">
              <div className="chatbot-loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}

          <div ref={messageEndRef} />
        </div>

        <div className="chatbot-input-area">
          <div className="chatbot-input-box">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about campus events..."
              className="chatbot-input"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading}
              className="chatbot-send-btn"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiChatbot;
