import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Button, TextField, Typography, Paper, Grid, CircularProgress, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from "../Hooks/useGetCompanyById"

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                // toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.error(error);
            // toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);

    return (
        <div>
            <Navbar />
            <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 4 }}>
                <form onSubmit={submitHandler}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <IconButton onClick={() => navigate("/admin/companies")}>
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h6" fontWeight="bold">Company Setup</Typography>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Company Name"
                                name="name"
                                variant="outlined"
                                value={input.name}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                variant="outlined"
                                value={input.description}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Website"
                                name="website"
                                variant="outlined"
                                value={input.website}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                variant="outlined"
                                value={input.location}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" component="label">
                                Upload Logo
                                <input type="file" hidden accept="image/*" onChange={changeFileHandler} />
                            </Button>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Update"}
                    </Button>
                </form>
            </Paper>
        </div>
    );
};

export default CompanySetup;
