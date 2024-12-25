import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components'; // Import styled-components for styling
import bgpic from "../../assets/software-engineer.png"; // Import the avatar image
import { Box, Table, TableBody, TableRow, TableCell } from '@mui/material'; // Import necessary Material-UI components

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    return (
        <ProfileContainer>
            <h2>Admin Profile</h2>
            <Box display="flex" justifyContent="center" mb={2}>
                <img 
                    src={bgpic} 
                    alt="Admin Avatar" 
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
                        <TableCell><strong>School:</strong></TableCell>
                        <TableCell>{currentUser.schoolName}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </ProfileContainer>
    );
};

const ProfileContainer = styled.div`
    padding: 20px;
    max-width: 500px;
    margin: auto;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default AdminProfile;
