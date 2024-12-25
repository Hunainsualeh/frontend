import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, Checkbox, Button, Typography, CircularProgress } from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import gsap from 'gsap';

const SeeComplains = () => {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const dispatch = useDispatch();
  const { complainsList, loading, error, response } = useSelector((state) => state.complain);
  const { currentUser } = useSelector(state => state.user);

  const [localComplainsList, setLocalComplainsList] = useState(complainsList);
  const [selectedComplaints, setSelectedComplaints] = useState([]);

  // Fetch complaints list
  useEffect(() => {
    console.log('Dispatching getAllComplains with currentUser._id:', currentUser._id);
    dispatch(getAllComplains(currentUser._id, "Complain"));
  }, [currentUser._id, dispatch]);

  // Update local state when complainsList changes
  useEffect(() => {
    console.log('Updated complainsList from Redux:', complainsList);
    setLocalComplainsList(complainsList); // Update local state with complaints list from Redux
  }, [complainsList]);

  // Log errors to the console
  if (error) {
    console.log('Error:', error);
  }

  // Handle delete action
  const handleDelete = (complainId) => {
    const rowElement = document.getElementById(`complain-row-${complainId}`);
    gsap.to(rowElement, {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      onComplete: () => {
        const updatedComplains = localComplainsList.filter(complain => complain._id !== complainId);
        setLocalComplainsList(updatedComplains);  // Update the local state with the new list
      }
    });
  };

  // Handle checkbox selection
  const handleCheckboxChange = (complainId) => {
    if (selectedComplaints.includes(complainId)) {
      setSelectedComplaints(selectedComplaints.filter(id => id !== complainId));
    } else {
      setSelectedComplaints([...selectedComplaints, complainId]);
    }
  };

  // Define table columns
  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
    { id: 'actions', label: 'Actions', minWidth: 100 }  
  ];

  
  const complainRows = localComplainsList && localComplainsList.length > 0 && localComplainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user.name,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
      actions: (
        <Box sx={{ display: selectedComplaints.includes(complain._id) ? 'block' : 'none' }} />
      )
    };
  });

  // Button for checkbox and action rendering
  const ComplainButtonHaver = ({ row }) => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Checkbox
        {...label}
        checked={selectedComplaints.includes(row.id)}
        onChange={() => handleCheckboxChange(row.id)}
        sx={{ marginRight: 2 }}
      />
      {selectedComplaints.includes(row.id) && (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(row.id)}
          sx={{
            borderRadius: '8px',
            '&:hover': { backgroundColor: '#d32f2f' },
            transition: 'background-color 0.3s ease'
          }}
        >
          Delete
        </Button>
      )}
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress size={60} color="primary" />
        </Box>
      ) : (
        <>
          {response ? (
            <Box sx={{ textAlign: 'center', marginTop: 2 }}>
              <Typography variant="h6" color="textSecondary">No Complaints Right Now</Typography>
            </Box>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden', boxShadow: 3, borderRadius: '12px' }}>
              {Array.isArray(localComplainsList) && localComplainsList.length > 0 ? (
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
              ) : (
                <Box sx={{ padding: 2 }}>
                  <Typography variant="body1" color="textSecondary">No complaints found.</Typography>
                </Box>
              )}
            </Paper>
          )}
        </>
      )}
    </Box>
  );
};

export default SeeComplains;
