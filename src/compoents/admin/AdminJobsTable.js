import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Typography, Avatar } from '@mui/material';
import { MoreHoriz, Edit, Visibility } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleMenuClick = (event, job) => {
        setAnchorEl(event.currentTarget);
        setSelectedJob(job);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedJob(null);
    };

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" sx={{ padding: 2 }}>A list of your recently posted jobs</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Company Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterJobs?.map((job) => (
                        <TableRow key={job._id}>
                            <TableCell>
                                <Avatar sx={{ width: 30, height: 30, marginRight: 1 }} src={job?.company?.logo} />
                                {job?.company?.name}
                            </TableCell>
                            <TableCell>{job?.title}</TableCell>
                            <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={(e) => handleMenuClick(e, job)}>
                                    <MoreHoriz />
                                </IconButton>
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl) && selectedJob?._id === job._id}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={() => navigate(`/admin/companies/${job._id}`)}>
                                        <Edit fontSize="small" sx={{ marginRight: 1 }} /> Edit
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}>
                                        <Visibility fontSize="small" sx={{ marginRight: 1 }} /> Applicants
                                    </MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminJobsTable;
