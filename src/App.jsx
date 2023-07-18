import { useEffect, useState } from 'react';
import socketIoClient from 'socket.io-client';
import styled from 'styled-components';

const StyledPanel = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const StyledtList = styled.div`
  background-color: #fc8373;
  flex: 2;
  height: 100%;
`;

const StyledChatList = styled.div`
  background-color: #313131;
  flex: 6;
  height: 100%;
`;

const ChatListItem = styled.div`
  padding: 8px;
  height: 100px;
  border-bottom: 1px solid #ff9e91;
  p {
    font-size: 0.8rem;
  }
`;

function App() {
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const socketConnection = socketIoClient('http://127.0.0.1:8080', {
      query: {
        serviceAgent: true,
      },
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('CHAT_HISTORY', (chatlog) => {
        setChats(chatlog);
        console.log(chatlog);
      });
    }
  }, [socket]);

  return (
    <>
      <StyledPanel>
        <StyledtList>
          {chats.map((chat, idx) => (
            <ChatListItem key={idx}>
              <h6>{chat.id}</h6>
              <p>
                {chat.messages[chat.messages?.length - 1].text?.slice(0, 20)}...
              </p>
            </ChatListItem>
          ))}
        </StyledtList>
        <StyledChatList />
      </StyledPanel>
    </>
  );
}

export default App;
