import React, { useState } from 'react';
import { Box, Avatar, Button, Modal, Typography, List, ListItem, ListItemIcon, Divider } from '@mui/material';
import { Logout } from '@mui/icons-material';
import { Person as AvatarIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountMenu = () => {
    const [open, setOpen] = useState(false);
    const { currentRole, currentUser } = useSelector(state => state.user);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Button onClick={handleOpen}>
                    <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        {String(currentUser.name).charAt(0)}
                    </Avatar>
                </Button>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="account-options-title"
                aria-describedby="account-options-description"
            >
                <Box sx={styles.modal}>
                    <Typography id="account-options-title" variant="h6" gutterBottom>
                        Account Options
                    </Typography>
                    <Divider />
                    <List>
                        <ListItem button component={Link} to={`/${currentRole}/profile`} onClick={handleClose}>
                            <ListItemIcon>
                                <AvatarIcon />
                            </ListItemIcon>
                            <Typography variant="body1">Profile</Typography>
                        </ListItem>
                        <ListItem button component={Link} to="/logout" onClick={handleClose}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <Typography variant="body1">Logout</Typography>
                        </ListItem>
                    </List>
                </Box>
            </Modal>
        </>
    );
};

const styles = {
    modal: {
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        maxWidth: '90%', // Responsive design for smaller screens
        textAlign: 'center',
    },
};

export default AccountMenu;
