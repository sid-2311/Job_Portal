import React, { useState } from "react";
import Navbar from "../Navbar";
import axios from "axios"
import {
  Box,
  TextField,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  Typography,
  Input,
  InputLabel,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { useSelector } from "react-redux";


const Signup = () => {
    const navigate=useNavigate()
    const {loading}=useSelector(store=>store.auth)
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData=new FormData()
    formData.append("fullname",input.fullname)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password)
    formData.append("role",input.role)
    if(input.file){
        formData.append("file",input.file)
    }
    try {
        await axios.post(`${USER_API_END_POINT}/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true,
        });
        navigate("/login")
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <div>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 5 }}
      >
        <Box
          component="form"
          onSubmit={submitHandler}
          sx={{ width: "50%", p: 4, border: "1px solid #ddd", borderRadius: 2 }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Sign Up
          </Typography>

          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="fullname"
            value={input.fullname}
            onChange={changeEventHandler}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            type="email"
            label="Email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phoneNumber"
            value={input.phoneNumber}
            onChange={changeEventHandler}
            required
          />

          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            required
          />

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Role</FormLabel>
            <RadioGroup
              row
              name="role"
              value={input.role}
              onChange={changeEventHandler}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="recruiter"
                control={<Radio />}
                label="Recruiter"
              />
            </RadioGroup>
          </FormControl>

          <Box display="flex" alignItems="center" gap={2} sx={{ mt: 2 }}>
            <InputLabel>Profile Picture</InputLabel>
            <Input type="file" accept="image/*" onChange={changeFileHandler} />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "#6A38C2",
              "&:hover": { bgcolor: "#5b30a6" },
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Sign Up"
            )}
          </Button>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Signup;
