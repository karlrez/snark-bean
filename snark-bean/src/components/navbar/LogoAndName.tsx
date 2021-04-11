import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import SnarkBeanLogo from "./eye.png";

export default function LogoAndName() {
  const useStyles = makeStyles((theme: Theme) => ({
    container: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    logo: {
      height: "64px",
      width: "auto",
      marginRight: "6px",
    },
    title: {
      fontSize: "60px",
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>
        <img
          src={SnarkBeanLogo}
          alt="Snark Bean Logo"
          className={classes.logo}
        ></img>
        SNARK BEAN
      </h1>
    </div>
  );
}
