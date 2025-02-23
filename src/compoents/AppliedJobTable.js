import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Chip } from '@mui/material'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);
    
    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <Typography variant="h6" sx={{ padding: '16px' }}>
                        A list of your applied jobs
                    </Typography>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Job Role</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            allAppliedJobs.length <= 0
                                ? <TableRow><TableCell colSpan={4}><Typography align="center">You haven't applied any job yet.</Typography></TableCell></TableRow>
                                : allAppliedJobs.map((appliedJob) => (
                                    <TableRow key={appliedJob._id}>
                                        <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                        <TableCell>{appliedJob.job?.title}</TableCell>
                                        <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                        <TableCell align="right">
                                            <Chip
                                                label={appliedJob.status.toUpperCase()}
                                                color={appliedJob.status === 'rejected' ? 'error' : appliedJob.status === 'pending' ? 'default' : 'success'}
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default AppliedJobTable
