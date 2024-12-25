import { Container, Grid, Paper, Typography } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import StudentsIcon from '../../assets/img1.png';
import LessonsIcon from '../../assets/subjects.svg';
import TestsIcon from '../../assets/assignment.svg';
import TimeIcon from '../../assets/time.svg';
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// Main component
const TeacherHomePage = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents?.length || 0;
    const numberOfSessions = subjectDetails?.sessions || 0;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <StatCard icon={StudentsIcon} title="Class Students" value={numberOfStudents} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard icon={LessonsIcon} title="Total Lessons" value={numberOfSessions} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard icon={TestsIcon} title="Tests Taken" value={24} />
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatCard icon={TimeIcon} title="Total Hours" value={30} suffix="hrs" />
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

// StatCard Component for Reusable Stats
const StatCard = ({ icon, title, value, suffix }) => {
    return (
        <StyledPaper>
            <StyledIcon src={icon} alt={title} />
            <Title variant="h6">{title}</Title>
            <Data start={0} end={value} duration={2.5} suffix={suffix} />
        </StyledPaper>
    );
};

// Styled components
const StyledPaper = styled(Paper)`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 220px;
  background: linear-gradient(145deg, #e6e9ff, #ffffff);
  border-radius: 16px;
  box-shadow: 10px 10px 20px #c2c9ff,
              -10px -10px 20px #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px); /* Lift effect on hover */
    box-shadow: 15px 15px 30px #c2c9ff,
                -15px -15px 30px #ffffff; /* Enhanced shadow on hover */
  }
`;

const StyledIcon = styled.img`
  width: 64px; /* Larger icons for better visibility */
  height: auto;
  margin-bottom: 16px;
`;

const Title = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
`;

const Data = styled(CountUp)`
  font-size: 2rem;
  font-weight: bold;
  color: #3f51b5; /* Using a blue shade for better contrast */
`;

export default TeacherHomePage;
