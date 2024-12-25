import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, CircularProgress, Card, CardContent, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);
    
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <Container maxWidth="sm">
            {loading ? (
                <CircularProgress />
            ) : (
                <>
                    <Typography variant="h4" align="center" gutterBottom>
                        Teacher Details
                    </Typography>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Teacher Name: {teacherDetails?.name}
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                Class Name: {teacherDetails?.teachSclass?.sclassName}
                            </Typography>
                            {isSubjectNamePresent ? (
                                <>
                                    <Typography variant="h6" gutterBottom>
                                        Subject Name: {teacherDetails?.teachSubject?.subName}
                                    </Typography>
                                    <Typography variant="h6" gutterBottom>
                                        Subject Sessions: {teacherDetails?.teachSubject?.sessions}
                                    </Typography>
                                </>
                            ) : (
                                <Button variant="contained" color="primary" onClick={handleAddSubject} fullWidth>
                                    Add Subject
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </>
            )}
            {error && (
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            )}
        </Container>
    );
};

export default TeacherDetails;
