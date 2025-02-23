import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useSelector } from 'react-redux';
// import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedApplicant, setSelectedApplicant] = React.useState(null);

    const handleMenuOpen = (event, applicantId) => {
        setAnchorEl(event.currentTarget);
        setSelectedApplicant(applicantId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedApplicant(null);
    };

    const statusHandler = async (status) => {
        if (!selectedApplicant) return;
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${selectedApplicant}/update`, { status });

            if (res.data.success) {
                // toast.success(res.data.message);
            }
        } catch (error) {
            // toast.error(error.response.data.message);
        } finally {
            handleMenuClose();
        }
    };

    return (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Typography variant="h6" sx={{ padding: 2, fontWeight: 'bold' }}>
                A list of your recent applied users
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Full Name</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Contact</strong></TableCell>
                        <TableCell><strong>Resume</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell align="right"><strong>Action</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applicants?.applications?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item?.applicant?.fullname}</TableCell>
                            <TableCell>{item?.applicant?.email}</TableCell>
                            <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a className="text-blue-600 cursor-pointer" href={item?.applicant?.profile?.resume} target="_blank" rel="noopener noreferrer">
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span>NA</span>
                                )}
                            </TableCell>
                            <TableCell>{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={(event) => handleMenuOpen(event, item._id)}>
                                    <MoreHorizIcon />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && selectedApplicant === item._id}
                                    onClose={handleMenuClose}
                                >
                                    {shortlistingStatus.map((status, index) => (
                                        <MenuItem key={index} onClick={() => statusHandler(status)}>
                                            {status}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ApplicantsTable;
