import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box } from '@mui/material';
import styled from 'styled-components';
import Students from "../assets/Home.png";
import { LightPurpleButton } from '../components/buttonStyles';
import gsap from 'gsap';

const Homepage = () => {
    const contentRef = useRef(null);
    const shapesRef = useRef([]);
    const cardRef = useRef(null);
    const buttonsRef = useRef([]);

    useEffect(() => {
        // GSAP basic fade-in effect for GlassCard and StyledBox for visibility
        gsap.fromTo(cardRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 });
        gsap.fromTo(buttonsRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, stagger: 0.2 });

        // Floating effect on shapes
        shapesRef.current.forEach((shape, index) => {
            gsap.fromTo(shape, { opacity: 0, y: -20 }, {
                opacity: 1,
                y: 0,
                duration: 1.5,
                ease: 'elastic.out(1, 0.75)',
                delay: index * 0.2,
            });
        });
    }, []);

    return (
        <StyledContainer>
            <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xs={12} md={6} style={{ position: 'relative' }}>
                    <BackgroundShapes ref={shapesRef} />
                    <StyledContent ref={contentRef}>
                        <GlassCard ref={cardRef}>
                            <StyledTitle>
                                Welcome to
                                <br />
                                School Management
                                <br />
                                System
                            </StyledTitle>
                            <StyledText>
                                Hey! This School Management System, developed by Hunain Sualeh as a final project, features an AI chatbot integrated into the student login for a more interactive experience. 👀😉
                            </StyledText>
                            <StyledBox>
                                <StyledLink to="/choose">
                                    <LightPurpleButton variant="contained" className="equal-button" ref={(el) => (buttonsRef.current[0] = el)}>
                                        Login
                                    </LightPurpleButton>
                                </StyledLink>
                                <StyledLink to="/Adminregister">
                                    <LightPurpleButton variant="contained" className="equal-button" ref={(el) => (buttonsRef.current[1] = el)}>
                                        Sign up
                                    </LightPurpleButton>
                                </StyledLink>
                            </StyledBox>
                        </GlassCard>
                    </StyledContent>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={Students} alt="students" style={{ width: '100%', maxHeight: '100vh', objectFit: 'cover' }} />
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

// Background shapes with floating animation
const BackgroundShapes = React.forwardRef((props, ref) => (
    <>
     <Shape ref={(el) => (ref.current[0] = el)} style={{ backgroundColor: '#cc3333', top: '10%', left: '10%', width: '100px', height: '100px', borderRadius: '50%' }} />
        <Shape ref={(el) => (ref.current[0] = el)} style={{ backgroundColor: '#FF5733', top: '10%', left: '10%', width: '100px', height: '100px', borderRadius: '50%' }} />
        <Shape ref={(el) => (ref.current[1] = el)} style={{ backgroundColor: 'rgba(51, 153, 255, 0.5)', top: '50%', left: '50%', width: '150px', height: '150px', transform: 'translate(-50%, -50%)' }} />
    </>
));

const StyledContainer = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 0 20px;
`;

const StyledContent = styled.div`
    padding: 16px;
    text-align: center;
`;

const GlassCard = styled.div`
    background: rgba(0, 0, 0, 0.4);
    border-radius: 16px;
    padding: 20px;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
    position: relative;
    z-index: 2;
`;

const StyledTitle = styled.h1`
    font-size: 2.5rem;
    color: #FFF;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 12px;

    @media (max-width: 600px) {
        font-size: 2rem;
    }
`;

const StyledText = styled.p`
    margin: 12px 0;
    font-size: 1.1rem;
    color: #FFF;
    line-height: 1.6;

    @media (max-width: 600px) {
        font-size: 0.9rem;
    }
`;

const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 12px;

    .equal-button {
        width: 120px;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    width: auto;
`;

const Shape = styled.div`
    position: absolute;
    z-index: 1;
`;

export default Homepage;
