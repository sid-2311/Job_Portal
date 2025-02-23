import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { Logout, Person } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import { setUser } from "../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    try {
      await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo section */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Job<span style={{ color: "#F83002" }}>Portal</span>
        </Typography>

        {/* Right-aligned Navbar Links and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
          {/* Navbar Links */}
          <Box sx={{ display: "flex", gap: 2 }}>
            {user && user.role === "recruiter" ? (
              <>
                <Button
                  component={Link}
                  to="/admin/companies"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Companies
                </Button>
                <Button
                  component={Link}
                  to="/admin/jobs"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Jobs
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  to="/"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Home
                </Button>
                <Button
                  component={Link}
                  to="/jobs"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Jobs
                </Button>
                <Button
                  component={Link}
                  to="/browse"
                  color="inherit"
                  sx={{ textTransform: "none" }}
                >
                  Browse
                </Button>
              </>
            )}
          </Box>

          {/* User Authentication or Profile Menu */}
          {!user ? (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{ textTransform: "none" }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  backgroundColor: "#6A38C2",
                  "&:hover": { backgroundColor: "#5b30a6" },
                  textTransform: "none",
                }}
              >
                Signup
              </Button>
            </Box>
          ) : (
            <>
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar src={user?.profile?.profilePhoto} alt="Profile" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>
                  <Avatar
                    src={user?.profile?.profilePhoto}
                    alt="Profile"
                    sx={{ marginRight: 1 }}
                  />
                  <div>
                    <Typography variant="body1">{user?.fullname}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {user?.profile?.bio}
                    </Typography>
                  </div>
                </MenuItem>
                {user && user.role === "student" && (
                  <MenuItem
                    component={Link}
                    to="/profile"
                    onClick={handleMenuClose}
                  >
                    <Person sx={{ marginRight: 1 }} /> View Profile
                  </MenuItem>
                )}
                <MenuItem onClick={logoutHandler}>
                  <Logout sx={{ marginRight: 1 }} /> Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
