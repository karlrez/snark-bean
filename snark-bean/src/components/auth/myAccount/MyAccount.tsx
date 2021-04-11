import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useTokenValidate } from "../AuthCommon";
import OrderHistory from "./OrderHistory";
import AccountDetails from "./account/AccountDetails";

const useStyles = makeStyles((theme) =>
  createStyles({
    btnContainer: {
      display: "flex",
      justifyContent: "center",
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(1),
    },
  })
);

export default function MyAccount() {
  const classes = useStyles();
  const [showAddresses, setShowAddresses] = useState(false);
  const [showBtn, setShowBtn] = useState(true);

  useTokenValidate(""); //check user is signed in, else route to SignIn component

  return (
    <div>
      {!showAddresses && <OrderHistory />}
      {showAddresses && <AccountDetails />}
      {showBtn && (
        <div className={classes.btnContainer}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              setShowBtn(!showBtn);
              setShowAddresses(!showAddresses);
            }}
          >
            Manage Addresses
          </Button>
        </div>
      )}
    </div>
  );
}
