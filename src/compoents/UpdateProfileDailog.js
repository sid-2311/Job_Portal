import React, { useState } from 'react'
import { Dialog, DialogContent, DialogActions, DialogTitle, TextField, Button, CircularProgress, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '../redux/authSlice'
// import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.map(skill => skill) || "",
        file: user?.profile?.resume || ""
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                // toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            // toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Update Profile</DialogTitle>
            <DialogContent>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Full Name"
                                name="fullname"
                                value={input.fullname}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                id="file"
                                name="file"
                                type="file"
                                accept="application/pdf"
                                onChange={fileChangeHandler}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="file">
                                <Button variant="outlined" component="span" fullWidth>
                                    Upload Resume
                                </Button>
                            </label>
                        </Grid>
                    </Grid>
                    <DialogActions>
                        {loading ? (
                            <Button disabled fullWidth variant="contained">
                                <CircularProgress size={24} />
                                Please wait...
                            </Button>
                        ) : (
                            <Button type="submit" fullWidth variant="contained">
                                Update
                            </Button>
                        )}
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog;
