import React, { useState } from 'react';
import Navbar from '../Navbar';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, Container, Paper, Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { JOB_API_END_POINT } from '../../utils/constant';
// import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (event) => {
        const selectedCompany = companies.find(company => company._id === event.target.value);
        setInput({ ...input, companyId: selectedCompany?._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                // toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            // toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Post a New Job
                    </Typography>
                    <form onSubmit={submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Title"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Description"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Requirements"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Salary"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Location"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Job Type"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Experience Level"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Number of Positions"
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    fullWidth
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {companies.length > 0 ? (
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel>Select a Company</InputLabel>
                                        <Select
                                            value={input.companyId}
                                            onChange={selectChangeHandler}
                                            label="Select a Company"
                                            required
                                        >
                                            {companies.map(company => (
                                                <MenuItem key={company._id} value={company._id}>
                                                    {company.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <Typography color="error" align="center" variant="body2">
                                        *Please register a company first before posting a job.
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : "Post New Job"}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default PostJob;
