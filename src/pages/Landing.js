import { Box, Button } from "@mui/material";
import React from "react";

export default function Landing({handleSignIn, handleSignUp}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Welcome to RCR</h1>
      <h3>
        Remote Car Review allows you to post adverts of far away vehicles, for
        technicians to review, and inform you of its condition.
      </h3>
      <Button onClick={handleSignIn}>Sign In</Button>
      <Button onClick={handleSignUp}>Sign Up</Button>
    </div>
  );
}
