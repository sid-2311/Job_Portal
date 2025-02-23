import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" fontWeight="bold">
        Filter Jobs
      </Typography>
      <Divider sx={{ my: 2 }} />

      <FormControl component="fieldset">
        {filterData.map((data, index) => (
          <Box key={index} sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              {data.filterType}
            </FormLabel>
            <RadioGroup value={selectedValue} onChange={changeHandler}>
              {data.array.map((item, idx) => (
                <FormControlLabel
                  key={idx}
                  value={item}
                  control={<Radio />}
                  label={item}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
      </FormControl>
    </Paper>
  );
};

export default FilterCard;
