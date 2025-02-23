import React, { useState } from "react";
import { Box, Button, Stack, Paper, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box textAlign="center" my={5}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <IconButton onClick={prevSlide} sx={{ backgroundColor: "#f0f0f0" }}>
          <ArrowBackIos />
        </IconButton>

        <Paper
          elevation={3}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            px: 3,
            py: 2,
            borderRadius: "20px",
            backgroundColor: "grey.100",
          }}
        >
          {categories.slice(index, index + 3).map((cat, i) => (
            <Button
              key={i}
              variant="outlined"
              onClick={() => searchJobHandler(cat)}
              sx={{ borderRadius: "50px", textTransform: "none" }}
            >
              {cat}
            </Button>
          ))}
        </Paper>

        <IconButton onClick={nextSlide} sx={{ backgroundColor: "#f0f0f0" }}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
    </Box>
  );
};

export default CategoryCarousel;
