import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { InputAdornment, TextField, Button, Grid } from '@mui/material';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '../Hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '../../redux/companySlice';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10">
                <Grid container justifyContent="space-between" alignItems="center" my={3}>
                    <Grid item xs={12} sm={8} md={6}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Filter by name"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/admin/companies/create")}
                            fullWidth
                        >
                            New Company
                        </Button>
                    </Grid>
                </Grid>
                <CompaniesTable />
            </div>
        </div>
    );
}

export default Companies;
