import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { TextField, Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from "../Hooks/useGetAllAdminJob"
import { setSearchJobByText } from '../../redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="space-between" alignItems="center" my={5}>
          <TextField
            label="Filter by name, role"
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={() => navigate("/admin/jobs/create")}>
            New Job
          </Button>
        </Box>
        <AdminJobsTable />
      </Container>
    </div>
  );
};

export default AdminJobs;
