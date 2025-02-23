import React from "react";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Button,
  Chip,
  Box,
} from "@mui/material";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <Card sx={{ p: 2, border: "1px solid #f0f0f0", boxShadow: 3 }}>
      <CardContent>
        {/* Header: Date & Bookmark */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            {daysAgoFunction(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunction(job?.createdAt)} days ago`}
          </Typography>
          <IconButton color="primary">
            <Bookmark />
          </IconButton>
        </Box>

        {/* Company Info */}
        <Box display="flex" alignItems="center" gap={2} mt={1}>
          <Avatar src={job?.company?.logo} sx={{ width: 50, height: 50 }} />
          <Box>
            <Typography variant="h6">{job?.company?.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              India
            </Typography>
          </Box>
        </Box>

        {/* Job Title & Description */}
        <Typography variant="h6" fontWeight="bold" mt={2}>
          {job?.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {job?.description}
        </Typography>

        {/* Badges */}
        <Box display="flex" gap={1} mt={2}>
          <Chip label={`${job?.position} Positions`} color="primary" />
          <Chip label={job?.jobType} color="secondary" />
          <Chip label={`${job?.salary} LPA`} sx={{ backgroundColor: "#7209b7", color: "white" }} />
        </Box>

        {/* Action Buttons */}
        <Box display="flex" gap={2} mt={3}>
          <Button
            variant="outlined"
            onClick={() => navigate(`/description/${job?._id}`)}
          >
            Details
          </Button>
          <Button variant="contained" sx={{ backgroundColor: "#7209b7" }}>
            Save For Later
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Job;
