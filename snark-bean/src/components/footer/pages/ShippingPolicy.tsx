import React from "react";
import "./pages.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    fontFamily: theme.typography.fontFamily,
  },
}));

export default function ShippingPolicy() {
  const classes = useStyles();
  return (
    <div className="container">
      <h1 className={classes.title}>Shipping Policy</h1>
      <p>
        Orders will typically ship via Canada Post the day you receive your
        order confirmation email. You should receive your order within 2
        business days of receiving your confirmation. Sometimes this doesn't
        happen, especially during Covid. Or the Christmas rush. Or perhaps
        Friday the 13th type-o-days. If this is the case, please contact us at
        kim@snarkbean.com. We'll track it down, get 'er figured out, and let you
        know when to expect your order.
      </p>
      <p>Because nobody should have to wait for coffee. </p>
    </div>
  );
}
