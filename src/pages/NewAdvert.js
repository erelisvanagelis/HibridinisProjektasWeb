import { Autocomplete, Box, Button, Input, TextField } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAppBar from "../components/CustomAppBar";
import * as constants from "../utilities/constants";

export default function NewAdvert({
  values,
  setValues,
  handleAction,
  comboBoxData,
}) {
  console.log(comboBoxData)
  return (
    <div>
      <Box
        component="form"
        display="flex"
        alignItems="center"
        flexDirection="column"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <h1>Add new advert</h1>
        <Autocomplete
          disablePortal
          id="combo-box"
          options={comboBoxData}
          getOptionLabel={(option) => option.title}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="City" />}
          onChange={(e, v) => {
            const city = v.id;
            setValues({
              ...values,
              city,
            });
          }}
        />
        <TextField
          id="url"
          label="Enter the URL"
          variant="outlined"
          onChange={(e) => {
            const url = e.target.value;
            setValues({
              ...values,
              url,
            });
          }}
        />
        <TextField
          id="price"
          label="Enter the how much will you pay for the review"
          variant="outlined"
          type="number"
          onChange={(e) => {
            const price = e.target.value;
            setValues({
              ...values,
              price,
            });
          }}
        />
        <TextField
          id="date"
          label="Due date"
          type="date"
          defaultValue={new Date().toLocaleDateString()}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            const date = e.target.value;
            setValues({
              ...values,
              date,
            });
          }}
        />
        <TextField
          id="comment"
          label="Special request"
          variant="outlined"
          multiline= {true}
          onChange={(e) => {
            const comment = e.target.value;
            setValues({
              ...values,
              comment,
            });
          }}
        />
      </Box>
      <Button id="Add" variant="outlined" onClick={handleAction}>
        Add
      </Button>
    </div>
  );
}
