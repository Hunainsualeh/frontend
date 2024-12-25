import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled, { keyframes } from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            <Username>{currentUser.name}</Username>
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
            <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
        </LogoutContainer>
    );
};

export default Logout;

const neonBorder = keyframes`
  0% {
    border-color: #ff6b81;
    box-shadow: 0 0 10px #ff6b81, 0 0 20px #ff6b81, 0 0 40px #ff6b81, 0 0 80px #ff6b81;
  }
  50% {
    border-color: #70a1ff;
    box-shadow: 0 0 10px #70a1ff, 0 0 20px #70a1ff, 0 0 40px #70a1ff, 0 0 80px #70a1ff;
  }
  100% {
    border-color: #ff6b81;
    box-shadow: 0 0 10px #ff6b81, 0 0 20px #ff6b81, 0 0 40px #ff6b81, 0 0 80px #ff6b81;
  }
`;

const LogoutContainer = styled.div`
  background: rgba(30, 60, 114, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  width: 90%;
  margin: auto;
  border: 4px solid;
  animation: ${neonBorder} 2s infinite alternate;
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.3);
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Username = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const LogoutMessage = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  text-align: center;
`;

const LogoutButton = styled.button`
  padding: 12px 30px;
  margin-top: 15px;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
  font-weight: bold;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #ff4757;

  &:hover {
    background-color: #e84118;
  }
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #2ed573;

  &:hover {
    background-color: #1e90ff;
  }
`;
