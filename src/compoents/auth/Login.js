import React, { useState } from "react";
import Navbar from "../Navbar";
import {
  TextField,
  FormControl,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Radio,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authSlice";




const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });


  const navigate = useNavigate();
  const {loading}=useSelector(store=>store.auth)
  const dispatch=useDispatch()
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    try {
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      dispatch(setLoading(false))
    }
  };
  return (
    <div>
      <Navbar />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Login
          </Typography>
          <form onSubmit={submitHandler}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              margin="normal"
            />
            <FormControl component="fieldset" sx={{ marginY: 2 }}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : "Login"}
            </Button>
            <Typography variant="body2" mt={2}>
              Don't have an account? <Link to="/signup">Signup</Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </div>
  );
};
export default Login;
