import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Container, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import bgpic from "../../assets/ava.png"; // Importing the image asset

const StudentProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response); }
  else if (error) { console.log(error); }

  const sclassName = currentUser.sclassName;
  const studentSchool = currentUser.school;

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <img 
                src={bgpic} 
                alt="Student Avatar" 
                style={{ width: 150, height: 150, borderRadius: '50%' }} // Circular avatar
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <Typography variant="h5" component="h2" textAlign="center">
                {currentUser.name}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Student Information
          </Typography>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell><strong>Student Roll No:</strong></TableCell>
                <TableCell>{currentUser.rollNum}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Class:</strong></TableCell>
                <TableCell>{sclassName.sclassName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>School:</strong></TableCell>
                <TableCell>{studentSchool.schoolName}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
}

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
