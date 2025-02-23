import React, { useEffect } from 'react';
import Navbar from '../Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/applicationSlice';
import { Container, Typography, Paper } from '@mui/material';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.error("Error fetching applicants:", error);
            }
        };
        fetchAllApplicants();
    }, []);

    return (
        <div>
            <Navbar />
            <Container maxWidth="lg">
                <Paper elevation={3} sx={{ padding: 3, marginTop: 4 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        Applicants ({applicants?.applications?.length || 0})
                    </Typography>
                    <ApplicantsTable />
                </Paper>
            </Container>
        </div>
    );
};

export default Applicants;
