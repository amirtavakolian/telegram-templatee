import React, { useState, useRef, useEffect } from 'react';

// Mock data for chats and messages
const mockUsers = [
  {
    id: 1,
    name: "Alex Thompson",
    username: "alexthompson",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    online: true,
    lastSeen: "online"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    username: "sarahw",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    online: false,
    lastSeen: "last seen 2 hours ago"
  },
  {
    id: 3,
    name: "Mike Johnson",
    username: "mikej",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
    online: true,
    lastSeen: "online"
  },
  {
    id: 4,
    name: "Emma Davis",
    username: "emmad",
    avatar: "https://images.pexels.com/photos/32261581/pexels-photo-32261581.jpeg",
    online: false,
    lastSeen: "last seen yesterday"
  },
  {
    id: 5,
    name: "Design Team",
    username: "designteam",
    avatar: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1",
    online: true,
    lastSeen: "3 members online",
    isGroup: true
  },
  {
    id: 6,
    name: "David Chen",
    username: "davidc",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    online: false,
    lastSeen: "last seen 1 hour ago"
  },
  {
    id: 7,
    name: "Tech News",
    username: "technews",
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a",
    online: true,
    lastSeen: "channel",
    isChannel: true
  }
];

const mockChats = [
  {
    id: 1,
    userId: 1,
    lastMessage: "Hey! How's the project going?",
    timestamp: "14:30",
    unread: 2,
    pinned: true
  },
  {
    id: 2,
    userId: 2,
    lastMessage: "Thanks for the files! 📁",
    timestamp: "13:45",
    unread: 0,
    pinned: false
  },
  {
    id: 3,
    userId: 3,
    lastMessage: "Meeting at 3 PM today",
    timestamp: "12:20",
    unread: 1,
    pinned: true
  },
  {
    id: 4,
    userId: 4,
    lastMessage: "Perfect! See you tomorrow 👍",
    timestamp: "Yesterday",
    unread: 0,
    pinned: false
  },
  {
    id: 5,
    userId: 5,
    lastMessage: "John: New design mockups ready",
    timestamp: "10:15",
    unread: 5,
    pinned: false
  },
  {
    id: 6,
    userId: 6,
    lastMessage: "Let's catch up soon!",
    timestamp: "09:30",
    unread: 0,
    pinned: false
  },
  {
    id: 7,
    userId: 7,
    lastMessage: "🚀 New AI breakthrough announced",
    timestamp: "08:45",
    unread: 0,
    pinned: false
  }
];

const mockMessages = {
  1: [
    {
      id: 1,
      text: "Hey! How's the project going?",
      timestamp: "14:30",
      sent: false,
      read: true
    },
    {
      id: 2,
      text: "It's going great! Just finished the main components",
      timestamp: "14:31",
      sent: true,
      read: true
    },
    {
      id: 3,
      text: "Should have the first version ready by tomorrow",
      timestamp: "14:31",
      sent: true,
      read: true
    },
    {
      id: 4,
      text: "That's awesome! Can't wait to see it 🚀",
      timestamp: "14:32",
      sent: false,
      read: false
    }
  ],
  2: [
    {
      id: 1,
      text: "Could you send me the design files?",
      timestamp: "13:40",
      sent: true,
      read: true
    },
    {
      id: 2,
      text: "Sure! Here they are",
      timestamp: "13:42",
      sent: false,
      read: true
    },
    {
      id: 3,
      text: "Thanks for the files! 📁",
      timestamp: "13:45",
      sent: false,
      read: true
    }
  ],
  3: [
    {
      id: 1,
      text: "Don't forget about our meeting today",
      timestamp: "12:15",
      sent: false,
      read: true
    },
    {
      id: 2,
      text: "Meeting at 3 PM today",
      timestamp: "12:20",
      sent: false,
      read: false
    }
  ]
};

// Sidebar Component
const Sidebar = ({ activeChat, setActiveChat, theme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredChats = mockChats.filter(chat => {
    const user = mockUsers.find(u => u.id === chat.userId);
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const pinnedChats = filteredChats.filter(chat => chat.pinned);
  const regularChats = filteredChats.filter(chat => !chat.pinned);

  return (
    <div className={`sidebar ${theme === 'dark' ? 'sidebar-dark' : 'sidebar-light'}`}>
      {/* Header */}
      <div className="sidebar-header">
        <div className="d-flex align-items-center justify-content-between p-3">
          <button className="btn btn-link text-decoration-none p-0">
            <i className="bi bi-list fs-4"></i>
          </button>
          <h5 className="mb-0 fw-bold">Telegram</h5>
          <div className="d-flex gap-2">
            <button className="btn btn-link text-decoration-none p-0">
              <i className="bi bi-search fs-5"></i>
            </button>
            <button className="btn btn-link text-decoration-none p-0">
              <i className="bi bi-three-dots-vertical fs-5"></i>
            </button>
          </div>
        </div>
        
        {/* Search */}
        <div className="px-3 pb-3">
          <div className="input-group">
            <span className="input-group-text bg-transparent border-0">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 shadow-none"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="chat-list">
        {pinnedChats.length > 0 && (
          <div className="pinned-section">
            <div className="section-header px-3 py-2">
              <small className="text-muted fw-bold">PINNED</small>
            </div>
            {pinnedChats.map(chat => (
              <ChatItem 
                key={chat.id} 
                chat={chat} 
                user={mockUsers.find(u => u.id === chat.userId)}
                active={activeChat === chat.id}
                onClick={() => setActiveChat(chat.id)}
              />
            ))}
          </div>
        )}
        
        <div className="regular-chats">
          {regularChats.map(chat => (
            <ChatItem 
              key={chat.id} 
              chat={chat} 
              user={mockUsers.find(u => u.id === chat.userId)}
              active={activeChat === chat.id}
              onClick={() => setActiveChat(chat.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Chat Item Component
const ChatItem = ({ chat, user, active, onClick }) => {
  return (
    <div 
      className={`chat-item p-3 ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="d-flex align-items-center">
        <div className="position-relative me-3">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="avatar rounded-circle"
            width="50" 
            height="50"
            style={{ objectFit: 'cover' }}
          />
          {user.online && !user.isChannel && (
            <span className="position-absolute bottom-0 end-0 bg-success rounded-circle online-indicator"></span>
          )}
          {chat.pinned && (
            <i className="bi bi-pin-fill position-absolute top-0 start-0 pin-icon"></i>
          )}
        </div>
        
        <div className="flex-grow-1 min-width-0">
          <div className="d-flex justify-content-between align-items-start">
            <h6 className="mb-1 text-truncate fw-semibold chat-name">
              {user.name}
              {user.isGroup && <i className="bi bi-people-fill ms-1"></i>}
              {user.isChannel && <i className="bi bi-megaphone-fill ms-1"></i>}
            </h6>
            <div className="d-flex align-items-center gap-1">
              <small className="text-muted timestamp">{chat.timestamp}</small>
              {chat.unread > 0 && (
                <span className="badge bg-primary rounded-pill unread-badge">
                  {chat.unread}
                </span>
              )}
            </div>
          </div>
          <p className="mb-0 text-muted text-truncate last-message">
            {chat.lastMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

// Chat Header Component
const ChatHeader = ({ user, theme, toggleTheme }) => {
  if (!user) return null;

  return (
    <div className={`chat-header border-bottom p-3 ${theme === 'dark' ? 'bg-dark border-secondary' : 'bg-white'}`}>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="rounded-circle me-3"
            width="40" 
            height="40"
            style={{ objectFit: 'cover' }}
          />
          <div>
            <h6 className="mb-0 fw-semibold">{user.name}</h6>
            <small className={`${user.online ? 'text-success' : 'text-muted'}`}>
              {user.lastSeen}
            </small>
          </div>
        </div>
        
        <div className="d-flex gap-3">
          <button className="btn btn-link text-decoration-none p-0">
            <i className="bi bi-telephone fs-5"></i>
          </button>
          <button className="btn btn-link text-decoration-none p-0">
            <i className="bi bi-camera-video fs-5"></i>
          </button>
          <button 
            className="btn btn-link text-decoration-none p-0"
            onClick={toggleTheme}
          >
            <i className={`bi bi-${theme === 'dark' ? 'sun' : 'moon'} fs-5`}></i>
          </button>
          <button className="btn btn-link text-decoration-none p-0">
            <i className="bi bi-three-dots-vertical fs-5"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

// Message Component
const Message = ({ message, user }) => {
  return (
    <div className={`message-wrapper mb-3 ${message.sent ? 'sent' : 'received'}`}>
      <div className={`message ${message.sent ? 'message-sent' : 'message-received'}`}>
        <div className="message-content">
          <p className="mb-1">{message.text}</p>
          <div className="d-flex align-items-center justify-content-end gap-1">
            <small className="message-time">{message.timestamp}</small>
            {message.sent && (
              <i className={`bi bi-check2-all ${message.read ? 'text-primary' : 'text-muted'}`}></i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Area Component
const ChatArea = ({ activeChat, theme }) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(mockMessages[activeChat] || []);
  const messagesEndRef = useRef(null);
  
  const activeUser = mockUsers.find(u => u.id === activeChat);
  const chatMessages = mockMessages[activeChat] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: true,
        read: false
      };
      
      // Update messages (in real app, this would be handled by state management)
      setMessages([...chatMessages, newMessage]);
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!activeUser) {
    return (
      <div className={`chat-area d-flex align-items-center justify-content-center ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light'}`}>
        <div className="text-center">
          <i className="bi bi-chat-dots fs-1 text-muted mb-3"></i>
          <h5 className="text-muted">Select a chat to start messaging</h5>
        </div>
      </div>
    );
  }

  return (
    <div className={`chat-area d-flex flex-column ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
      {/* Messages */}
      <div className="messages-container flex-grow-1 p-3">
        {chatMessages.map(message => (
          <Message key={message.id} message={message} user={activeUser} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className={`message-input-area border-top p-3 ${theme === 'dark' ? 'border-secondary' : ''}`}>
        <div className="input-group">
          <button className="btn btn-outline-secondary">
            <i className="bi bi-paperclip"></i>
          </button>
          <input
            type="text"
            className="form-control"
            placeholder="Write a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="btn btn-outline-secondary">
            <i className="bi bi-emoji-smile"></i>
          </button>
          {messageText.trim() ? (
            <button className="btn btn-primary" onClick={sendMessage}>
              <i className="bi bi-send"></i>
            </button>
          ) : (
            <button className="btn btn-outline-secondary">
              <i className="bi bi-mic"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Telegram Clone Component
export const TelegramClone = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const activeUser = mockUsers.find(u => u.id === activeChat);

  return (
    <div className={`telegram-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <div className="telegram-layout">
        {/* Sidebar */}
        <div className="sidebar-column">
          <Sidebar 
            activeChat={activeChat} 
            setActiveChat={setActiveChat}
            theme={theme}
          />
        </div>

        {/* Main Chat Area */}
        <div className="chat-column">
          <ChatHeader 
            user={activeUser} 
            theme={theme} 
            toggleTheme={toggleTheme}
          />
          <ChatArea 
            activeChat={activeChat} 
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
};