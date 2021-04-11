import React from "react";
import "./pages.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.fontFamily,
  },
}));

export default function RefundPolicy() {
  const classes = useStyles();
  return (
    <div className="container">
      <h1 className={classes.title}>Refund Policy</h1>
      <p>
        I want you to be 100% satisfied with your coffee. If you are less than
        thrilled, please contact me: kim@snarkbean.com. I'll make it right.
      </p>
    </div>
  );
}
