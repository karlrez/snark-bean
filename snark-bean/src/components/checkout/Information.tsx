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

type FormInputs = {
  email?: string;
  phone?: string;
};

interface Props {
  onSubmit: () => void;
}

export default function Information(props: Props) {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors: validationErrors,
    //reset,
  } = useForm<FormInputs>();

  const handleSend: SubmitHandler<FormInputs> = async (
    formValues: FormInputs
  ) => {
    //const { email, phone } = formValues;

    props.onSubmit();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <form onSubmit={handleSubmit(handleSend)}>
        <TextField
          variant="outlined"
          error={validationErrors.email ? true : false}
          margin="normal"
          size="small"
          //required
          fullWidth
          label="Email"
          name="email"
          inputRef={register({
            pattern: new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
          })}
        />
        {/*Display error message for incorrectly formated email input*/}
        {validationErrors.email &&
          validationErrors.email.type === "pattern" && (
            <Typography className={classes.errorMessage}>
              Looks like this is not an email{" "}
            </Typography>
          )}
        <TextField
          variant="outlined"
          margin="normal"
          error={validationErrors.phone ? true : false}
          //required
          size="small"
          fullWidth
          label="Phone (e.g. 555 555 5555)"
          name={"phone"}
          inputRef={register({
            pattern: new RegExp(/^\d{10}$/),
          })}
        />
        {/*Display error message for incorrectly formatted phone number*/}
        {validationErrors.phone &&
          validationErrors.phone.type === "pattern" && (
            <Typography className={classes.errorMessage}>
              Incorrect phone number format
            </Typography>
          )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          className={classes.submit}
        >
          Next
        </Button>
      </form>
    </Container>
  );
}
