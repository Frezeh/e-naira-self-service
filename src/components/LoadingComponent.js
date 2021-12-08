import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

export const Loading = () => {
  return (
    <Grid item xs={12} sm={12} md={12}>
      <div style={{ alignContent: "center" }}>
        <CircularProgress />
        <p>Loading . . .</p>
      </div>
    </Grid>
  );
};
