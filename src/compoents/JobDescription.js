import React, { useEffect, useState } from 'react';
import { Badge, Button, Typography, Box, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT,APPLICATION_API_END_POINT } from '../utils/constant';
import { setSingleJob } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

            if (res.data.success) {
                setIsApplied(true); // Update the local state
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob)); // Helps us to real-time UI update
                // toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)); // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <Box className="max-w-7xl mx-auto my-10">
            <Box className="flex items-center justify-between">
                <Box>
                    <Typography variant="h6" className="font-bold text-xl">{singleJob?.title}</Typography>
                    <Box className="flex items-center gap-2 mt-4">
                        <Badge color="primary" variant="outlined">{singleJob?.postion} Positions</Badge>
                        <Badge color="secondary" variant="outlined">{singleJob?.jobType}</Badge>
                        <Badge color="error" variant="outlined">{singleJob?.salary} LPA</Badge>
                    </Box>
                </Box>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    variant={isApplied ? 'contained' : 'outlined'}
                    color={isApplied ? 'grey' : 'primary'}
                    sx={{ borderRadius: '8px', textTransform: 'none' }}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </Box>
            <Typography variant="h6" className="border-b-2 border-b-gray-300 font-medium py-4">Job Description</Typography>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <Box className="my-4">
                    <Typography variant="body1" className="font-bold my-1">
                        Role: <span className="pl-4 font-normal text-gray-800">{singleJob?.title}</span>
                    </Typography>
                    <Typography variant="body1" className="font-bold my-1">
                        Location: <span className="pl-4 font-normal text-gray-800">{singleJob?.location}</span>
                    </Typography>
                    <Typography variant="body1" className="font-bold my-1">
                        Description: <span className="pl-4 font-normal text-gray-800">{singleJob?.description}</span>
                    </Typography>
                    <Typography variant="body1" className="font-bold my-1">
                        Experience: <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} yrs</span>
                    </Typography>
                    <Typography variant="body1" className="font-bold my-1">
                        Salary: <span className="pl-4 font-normal text-gray-800">{singleJob?.salary} LPA</span>
                    </Typography>
                    <Typography variant="body1" className="font-bold my-1">
                        Total Applicants: <span className="pl-4 font-normal text-gray-800">{singleJob?.applications?.length}</span>
                    </Typography>
                    <Typography variant="body1" className="font-bold my-1">
                        Posted Date: <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default JobDescription;
