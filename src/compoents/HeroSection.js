import React, { useState } from "react";
import { Button, TextField, Box, Typography, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <Box textAlign="center" py={5}>
      <Box display="flex" flexDirection="column" gap={2} my={5}>
        <Paper
          elevation={3}
          sx={{
            mx: "auto",
            px: 2,
            py: 1,
            borderRadius: "50px",
            backgroundColor: "grey.100",
            color: "#F83002",
            fontWeight: "medium",
            display: "inline-block",
          }}
        >
          No. 1 Job Hunt Website
        </Paper>

        <Typography variant="h3" fontWeight="bold">
          Search, Apply & <br /> Get Your{" "}
          <Typography component="span" color="#6A38C2">
            Dream Jobs
          </Typography>
        </Typography>

        <Typography color="textSecondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          aspernatur temporibus nihil tempora dolor!
        </Typography>

        <Box
          display="flex"
          alignItems="center"
          gap={1}
          mx="auto"
          width="40%"
          sx={{
            boxShadow: 3,
            borderRadius: "50px",
            border: "1px solid",
            borderColor: "grey.300",
            px: 2,
            py: 1,
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={searchJobHandler}
            sx={{
              borderRadius: "50px",
              minWidth: "50px",
              backgroundColor: "#6A38C2",
              "&:hover": { backgroundColor: "#5b30a6" },
            }}
          >
            <Search />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
