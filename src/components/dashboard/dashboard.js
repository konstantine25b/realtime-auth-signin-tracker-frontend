import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook for navigation
import { useAuth } from "../../context/AuthContext";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const StyledButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #1976d2;
  color: white;
  border: none;
  cursor: pointer;
`;

const StyledTypography = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: red;
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

const GLOBAL_SIGNIN_COUNT_QUERY = gql`
  query globalSignInCount {
    globalSignInCount
  }
`;

function Dashboard() {
  const { data: meData } = useQuery(ME_QUERY);
  const { data: globalData } = useQuery(GLOBAL_SIGNIN_COUNT_QUERY);
  const { logout } = useAuth(); // Access the logout function and token information from useAuth
  const navigate = useNavigate(); // Get the navigate function for navigation
  const [logoutClicked, setLogoutClicked] = useState(false);

  useEffect(() => {
 
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    
  }, [logoutClicked]);

  return (
    <StyledContainer>
      <h2>Welcome, {meData?.me?.username}</h2>
      <p>Your Sign-In Count: {meData?.me?.signInCount}</p>
      <p>Global Sign-In Count: {globalData?.globalSignInCount}</p>
      <StyledButton
        onClick={() => {
          setLogoutClicked(!logoutClicked);
          logout()
        }}
      >
        Logout
      </StyledButton>{" "}
      {/* Add a logout button */}
      {globalData?.globalSignInCount >= 5 && (
        <StyledTypography>Global Sign-In Count Reached 5!</StyledTypography>
      )}
    </StyledContainer>
  );
}

export default Dashboard;
