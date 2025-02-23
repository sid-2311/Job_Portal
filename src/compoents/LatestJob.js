import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { Container, Typography, Grid, Box } from "@mui/material";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        <span style={{ color: "#6A38C2" }}>Latest & Top </span> Job Openings
      </Typography>

      <Grid container spacing={3} mt={2}>
        {allJobs.length <= 0 ? (
          <Box textAlign="center" width="100%">
            <Typography variant="h6" color="textSecondary">
              No Job Available
            </Typography>
          </Box>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <LatestJobCards job={job} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default LatestJobs;
