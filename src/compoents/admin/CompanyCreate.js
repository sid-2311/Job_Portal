import React, { useState } from 'react';
import Navbar from '../Navbar';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant';
// import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                // toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Navbar />
            <Paper elevation={3} sx={{ maxWidth: 600, mx: 'auto', p: 4, mt: 5 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Your Company Name</Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                    What would you like to name your company? You can change this later.
                </Typography>

                <TextField
                    fullWidth
                    label="Company Name"
                    variant="outlined"
                    margin="normal"
                    placeholder="JobHunt, Microsoft, etc."
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <Button variant="outlined" color="secondary" onClick={() => navigate("/admin/companies")}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={registerNewCompany}>
                        Continue
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default CompanyCreate;
