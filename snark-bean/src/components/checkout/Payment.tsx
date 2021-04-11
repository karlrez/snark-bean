import { TextField } from "@material-ui/core";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: "#c62828",
    fontSize: 13,
    paddingLeft: "240px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type FormInputs = {};

//interface Props {
//onSubmit: () => void;
//}

export default function Payment() {
  const classes = useStyles();
  const {
    //register,
    handleSubmit,
    //errors: validationErrors,
    //reset,
  } = useForm<FormInputs>();

  const handleSend: SubmitHandler<FormInputs> = async () =>
    //formValues: FormInputs
    {
      //const { email, phone } = formValues;
      //props.onSubmit();
    };

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Payment
      </Typography>
      <span>All transactions are secure and encrypted</span>
      <form onSubmit={handleSubmit(handleSend)}>
        <TextField
          variant="outlined"
          //error={validationErrors.email ? true : false}
          margin="normal"
          size="small"
          //required
          fullWidth
          label="Card Number"
          name="cardNumber"
          //inputRef={register({
          //pattern: new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
          //})}
        />

        <TextField
          variant="outlined"
          //error={validationErrors.email ? true : false}
          margin="normal"
          size="small"
          //required
          fullWidth
          label="Name on Card"
          name="name"
          //inputRef={register({
          //pattern: new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
          //})}
        />
        <TextField
          variant="outlined"
          //error={validationErrors.email ? true : false}
          margin="normal"
          size="small"
          //required

          label="Expiration date (MM/YY)"
          name="expiry"
          //inputRef={register({
          //pattern: new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
          //})}
        />
        <TextField
          variant="outlined"
          //error={validationErrors.email ? true : false}
          margin="normal"
          size="small"
          //required

          label="Security Code"
          name="Security Code"
          //inputRef={register({
          //pattern: new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
          //})}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Pay Now
        </Button>
      </form>
    </Container>
  );
}
