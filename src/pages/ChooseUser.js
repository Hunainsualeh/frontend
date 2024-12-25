import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Backdrop, IconButton } from '@mui/material';
import { NavigateBefore, NavigateNext } from '@mui/icons-material'; // Updated icons import
import styled from 'styled-components';
import { gsap } from 'gsap';

// Import images for backgrounds
import bgAdmin from "../assets/op.jpg"; 
import bgStudent from "../assets/girl.jpg";
import bgTeacher from "../assets/tec.jpg"; 

const ChooseUser = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardData = [
    { 
      name: "Admin", 
      description: "Access the admin dashboard to manage users, content, and settings.",
      bgImage: bgAdmin,
      glow: "0 0 20px rgba(255, 140, 0, 0.7)",
    },
    { 
      name: "Student", 
      description: "Explore your courses, assignments, and educational resources—all in one place! With our integrated chatbot, you’ll get instant support and personalized guidance to enhance your learning experience. Stay organized, stay inspired!",
      bgImage: bgStudent,
      glow: "0 0 20px rgba(255, 182, 193, 0.7)",
    },
    { 
      name: "Teacher", 
      description: "Create course content, assign tasks, and evaluate student progress.",
      bgImage: bgTeacher,
      glow: "0 0 20px rgba(255, 165, 0, 0.7)",
    },
  ];

  const handleNext = () => setCurrentIndex((currentIndex + 1) % cardData.length);
  const handlePrevious = () => setCurrentIndex((currentIndex - 1 + cardData.length) % cardData.length);

  useEffect(() => {
    gsap.fromTo(
      ".card",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: "power2.out" }
    );
  }, [currentIndex]);

  return (
    <StyledContainer>
      <Backdrop open={false}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <IconButton className="navButton leftButton" onClick={handlePrevious}>
        <NavigateBefore style={{ color: '#c0d9a6', fontSize: '2rem' }} /> {/* Changed icon and color */}
      </IconButton>

      <BlurredBox>
        <TextSection>
          <Title>{cardData[currentIndex].name}</Title>
          <Description>{cardData[currentIndex].description}</Description>
        </TextSection>

        <CardWrapper>
          <StyledCard
            className="card active"
            bgImage={cardData[currentIndex].bgImage}
            glow={cardData[currentIndex].glow}
            onClick={() => navigate(`/${cardData[currentIndex].name.toLowerCase()}login`)}
          >
            <Box className="cardIcon">{cardData[currentIndex].icon}</Box>
          </StyledCard>
        </CardWrapper>
      </BlurredBox>

      <IconButton className="navButton rightButton" onClick={handleNext}>
        <NavigateNext style={{ color: '#c0d9a6', fontSize: '2rem' }} /> {/* Changed icon and color */}
      </IconButton>
    </StyledContainer>
  );
};
export default ChooseUser;
const StyledContainer = styled.div`
  background: linear-gradient(145deg, #000000, #2c2c2c);
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: #ffffff;
  padding: 1rem;
`;
const BlurredBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.4);

  @media (min-width: 768px) {
    width: 80%;
    height: 60vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    padding: 3rem;
  }
`;

const TextSection = styled.div`
  text-align: center;
  padding: 1rem;
  color: #ffffff;

  @media (min-width: 768px) {
    padding: 1rem;
    text-align: left;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: rgba(255, 255, 255, 0.9);

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);

  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
`;

const StyledCard = styled(Box)`
  width: 100%;
  height: 60vh; /* Gives more space to images on mobile */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 20px;
  background-image: ${({ bgImage }) => `url(${bgImage})`};
  background-size: cover;
  background-position: center;
  box-shadow: ${({ glow }) => glow};
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.6);
  }

  .cardIcon {
    color: #ffffff;
    font-size: 3rem;
  }

  @media (min-width: 768px) {
    width: 300px;
    height: 450px;
    padding: 20px;
  }
`;

// Keep existing navigation button styles the same

const navButtonStyles = `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  padding: 10px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

StyledContainer.IconButton = styled(IconButton)`
  ${navButtonStyles}

  &.leftButton {
    left: 10px;

    @media (min-width: 768px) {
      left: 20px;
    }
  }

  &.rightButton {
    right: 10px;

    @media (min-width: 768px) {
      right: 20px;
    }
  }
`;

