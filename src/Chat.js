// Chat.js
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function Chat({ matchID, playerName }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Initialize the socket connection once
  const [chatSocket] = useState(() => {
    console.log("Initializing chat socket...");
    return io('http://localhost:8000', { 
      path: '/chat',
      query: { matchID },        // Pass matchID to join the correct room on the server
      transports: ['websocket']  // Force WebSocket transport
    });
  });

  useEffect(() => {
    // Listen for the 'connect' event to confirm the socket connected
    chatSocket.on('connect', () => {
      console.log('Chat socket connected with ID:', chatSocket.id);
      console.log('Joined matchID:', matchID);
    });

    // Listen for errors
    chatSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    // Listen for 'chat' events from the server
    chatSocket.on('chat', (data) => {
      console.log('Chat message received on client:', data);
      setMessages((prev) => [...prev, data]);
    });

    // Listen for disconnects
    chatSocket.on('disconnect', (reason) => {
      console.log('Chat socket disconnected:', reason);
    });

    // Cleanup on component unmount
    return () => {
      chatSocket.off('connect');
      chatSocket.off('connect_error');
      chatSocket.off('chat');
      chatSocket.off('disconnect');
      chatSocket.disconnect();
    };
  }, [chatSocket, matchID]);

  const send = () => {
    if (input.trim() === '') return;
    console.log('Emitting chat message:', { matchID, playerName, message: input });
    chatSocket.emit('chat', { matchID, playerName, message: input });
    setInput('');
  };

  return (
    <div style={{ padding: '10px' }}>
      <h3>Chat</h3>
      <div style={{ 
        height: '300px', 
        overflowY: 'auto', 
        background: '#eee', 
        borderRadius: '5px', 
        padding: '10px' 
      }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '5px' }}>
            <strong>{msg.playerName}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          style={{ width: '80%' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') send(); }}
          placeholder="Type your message..."
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
}

export default Chat;




