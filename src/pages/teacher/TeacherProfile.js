import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Box, Table, TableBody, TableRow, TableCell } from '@mui/material'; // Import necessary components
import { useSelector } from 'react-redux';
import bgpic from "../../assets/maam.png"; // Import the avatar image

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  if (response) { console.log(response); }
  else if (error) { console.log(error); }

  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <ProfileCard>
      <ProfileCardContent>
        <Box display="flex" justifyContent="center" mb={2}>
          <img 
            src={bgpic} 
            alt="Teacher Avatar" 
            style={{ width: 150, height: 150, borderRadius: '50%' }} // Circular avatar
          />
        </Box>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell><strong>Name:</strong></TableCell>
              <TableCell>{currentUser.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Email:</strong></TableCell>
              <TableCell>{currentUser.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Class:</strong></TableCell>
              <TableCell>{teachSclass.sclassName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>Subject:</strong></TableCell>
              <TableCell>{teachSubject.subName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell><strong>School:</strong></TableCell>
              <TableCell>{teachSchool.schoolName}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ProfileCardContent>
    </ProfileCard>
  );
}

export default TeacherProfile;

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 600px; /* Adjust the width to make it rectangular */
  border-radius: 10px;
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 10px;
`;
