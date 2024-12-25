import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");
    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector(state => state.user);
    const user = currentUser._id;
    const school = currentUser.school._id;
    const address = "Complain";

    const fields = {
        user,
        date,
        complaint,
        school,
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Done Successfully");
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("Network Error");
        }
    }, [status, error]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f0f4f8',
                    padding: '20px'
                }}
            >
                <Box
                    sx={{
                        maxWidth: 600,
                        width: '100%',
                        backgroundColor: '#fff',
                        borderRadius: 2,
                        boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.1)',
                        padding: 4,
                        textAlign: 'center'
                    }}
                >
                    <Stack spacing={2} sx={{ mb: 3 }}>
                        <Typography variant="h4" fontWeight="bold" color="primary">
                            File Your Complaint
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            If you're experiencing issues, please let us know by filing a complaint.
                        </Typography>
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3} sx={{ mb: 3 }}>
                            <TextField
                                fullWidth
                                label="Select Date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                required
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                sx={{
                                    '& .MuiInputBase-root': {
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                                        transition: 'border 0.3s ease, box-shadow 0.3s ease',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#3f51b5',
                                    },
                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#3f51b5',
                                        boxShadow: '0 0 8px rgba(63, 81, 181, 0.5)',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Write your complaint"
                                variant="outlined"
                                value={complaint}
                                onChange={(event) => setComplaint(event.target.value)}
                                required
                                multiline
                                maxRows={4}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
                                        transition: 'border 0.3s ease, box-shadow 0.3s ease',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: 'transparent',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#3f51b5',
                                    },
                                    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#3f51b5',
                                        boxShadow: '0 0 8px rgba(63, 81, 181, 0.5)',
                                    },
                                }}
                            />
                        </Stack>
                        <BlueButton
                            fullWidth
                            size="large"
                            sx={{
                                mt: 2,
                                backgroundColor: '#3f51b5',
                                color: '#fff',
                                borderRadius: '8px',
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#303f9f',
                                },
                                '&.Mui-disabled': {
                                    backgroundColor: '#c5cae9'
                                }
                            }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                        </BlueButton>
                    </form>
                </Box>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;
