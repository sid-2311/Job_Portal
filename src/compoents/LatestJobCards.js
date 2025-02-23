import React from "react";
import { CardContent, Typography, Chip, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      onClick={() => navigate(`/description/${job._id}`)}
      sx={{
        p: 2,
        borderRadius: 2,
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="medium">
          {job?.company?.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          India
        </Typography>

        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
          {job?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {job?.description}
        </Typography>

        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
          <Chip label={`${job?.position} Positions`} color="primary" variant="outlined" />
          <Chip label={job?.jobType} color="error" variant="outlined" />
          <Chip label={`${job?.salary} LPA`} sx={{ backgroundColor: "#7209b7", color: "#fff" }} />
        </div>
      </CardContent>
    </Paper>
  );
};

export default LatestJobCards;
