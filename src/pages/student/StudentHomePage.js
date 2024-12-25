import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import Subject from "../../assets/math.png";
import Assignment from "../../assets/qa.png";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { gsap } from 'gsap';


const StudentHomePage = () => {
    const dispatch = useDispatch();
    const { userDetails, currentUser, loading, response } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const classID = currentUser.sclassName._id;

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    const numberOfSubjects = subjectsList && subjectsList.length;

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <StyledImage src={Subject} alt="Subjects" />
                        <Title>Total Subjects</Title>
                        <Data start={0} end={numberOfSubjects} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <StyledImage src={Assignment} alt="Assignments" />
                        <Title>Total Assignments</Title>
                        <Data start={0} end={15} duration={4} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={4} lg={6}>
                    <ChartContainer>
                        {
                            response ? (
                                <Typography variant="h6">No Attendance Found</Typography>
                            ) : (
                                <>
                                    {loading ? (
                                        <Typography variant="h6">Loading...</Typography>
                                    ) : (
                                        <>
                                            {
                                                subjectAttendance && Array.isArray(subjectAttendance) && subjectAttendance.length > 0 ? (
                                                    <CustomPieChart data={chartData} />
                                                ) : (
                                                    <Typography variant="h6">No Attendance Found</Typography>
                                                )
                                            }
                                        </>
                                    )}
                                </>
                            )
                        }
                    </ChartContainer>
                    <AttendanceLegend style={{ display: 'flex', alignItems: 'center', margin: '20px 0', fontSize: '1rem', fontWeight: '600', color: '#333' }}>
    <div
        style={{
            width: '1em',
            height: '1em',
            borderRadius: '50%',
            backgroundColor: '#ff6b6b', // Absent
            marginRight: '0.5em',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Added shadow for depth
        }}
        onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { scale: 1.2, duration: 0.3, ease: 'power1.out' });
        }}
        onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power1.out' });
        }}
    ></div>
    <span style={{ marginRight: '1em' }}>Absent</span>
    
    <div
        style={{
            width: '1em',
            height: '1em',
            borderRadius: '50%',
            backgroundColor: 'rgb(101,155,236)', // Present
            margin: '0 0.5em',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Added shadow for depth
        }}
        onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { scale: 1.2, duration: 0.3, ease: 'power1.out' });
        }}
        onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { scale: 1, duration: 0.3, ease: 'power1.out' });
        }}
    ></div>
    <span>Present</span>
</AttendanceLegend>

                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

const ChartContainer = styled.div`
    padding: 2px;
    display: flex;
    flex-direction: column;
    height: 240px;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const StyledPaper = styled(Paper)`
    padding: 16px;
    display: flex;
    flex-direction: column;
    height: 200px;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`;

const StyledImage = styled.img`
    width: 50px; // Set a fixed width
    height: 50px; // Set a fixed height
    object-fit: contain; // Maintain aspect ratio
`;
const Title = styled.p`
    font-size: 1.25rem;
`;
const Data = styled(CountUp)`
    font-size: calc(1.3rem + .6vw);
    color: green;
`;
const AttendanceLegend = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1rem;
`;
export default StudentHomePage;
