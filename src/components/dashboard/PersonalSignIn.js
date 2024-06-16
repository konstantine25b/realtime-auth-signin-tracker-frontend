import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useAuth } from "../../context/AuthContext";
import { url } from "../../context/WebSocketUrl";

const CountColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CountTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;

const CountValue = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      signInCount
    }
  }
`;

const PersonalSignIn = () => {
  const { loading, error, data: meData, refetch } = useQuery(ME_QUERY);
  const { token } = useAuth();
  useEffect(() => {
    refetch();
  }, [token]);
  useEffect(() => {
    

    const handleWebSocketMessage = () => {
      refetch(); 
    };

   
    const notiSocket = new WebSocket(url);
    notiSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      console.log("Message received:", data.message);
      handleWebSocketMessage(); 
    };

    notiSocket.onclose = function (e) {
      console.error("Notification socket closed unexpectedly");
    };

    return () => {
      notiSocket.close();
    };
  }, [refetch]); 

  return (
    <CountColumn>
      <CountTitle>Your Sign-In Count:</CountTitle>
      {error ? <>Error: {error.message}</> : <></>}
      <CountValue>{meData?.me?.signInCount}</CountValue>
    </CountColumn>
  );
};

export default PersonalSignIn;
