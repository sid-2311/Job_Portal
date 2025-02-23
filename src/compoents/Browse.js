import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
import useGetAllJobs from "./Hooks/useGetAllJobs";
import { Container, Typography, Grid } from "@mui/material";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 5 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Search Results ({allJobs.length})
        </Typography>

        <Grid container spacing={3}>
          {allJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Job job={job} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Browse;
