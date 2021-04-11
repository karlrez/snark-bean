import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import Container from "@material-ui/core/Container";
import CustomAlert from "../../common/CustomAlert";
import DisplayUserErrors from "../../common/DisplayUserErrors";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  icon: {
    color: theme.palette.background.paper,
  },
  headingText: {
    marginBottom: theme.spacing(0.8),
    color: theme.palette.secondary.main,
    fontWeight: "bold",
  },
  text: {
    color: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(1, 0, 2),
  },
  errorMessage: {
    color: "#c62828",
    fontSize: 16,
    fontFamily: "bold",
    paddingLeft: "285px",
  },
  confirmErrorMessage: {
    color: "#c62828",
    fontSize: 16,
    fontFamily: "bold",
    paddingLeft: "220px",
  },
  reqErrMsg: {
    marginTop: theme.spacing(1.5),
    width: "100%",
  },
}));

type FormInputs = {
  password: string;
  confirmPassword: string;
};

export default function NewPassword() {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    errors: validationErrors,
  } = useForm<FormInputs>();

  const handleReset: SubmitHandler<FormInputs> = async (
    formValues: FormInputs
  ) => {
    const { password, confirmPassword } = formValues; //use object destructuring to access user's data input
    console.log("HERE ", password + " " + confirmPassword);
  };

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.root}>
        {/* {data && data.customerRecover.customerUserErrors.length > 0 && (
          <div className={classes.reqErrMsg}>
            <CustomAlert
              title={"Error!"}
              content={DisplayUserErrors(
                data.customerRecover.customerUserErrors[0].code
              )}
              type={"e"}
            />
          </div>
        )} */}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.icon} />
        </Avatar>
        <Typography variant="h5" className={classes.headingText}>
          RESET ACCOUNT PASSWORD
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          Enter a new password for someEmail.
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(handleReset)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password"
            inputRef={register({
              pattern: new RegExp("^[a-zA-Z0-9]{5,40}$"),
            })}
          />

          {/*Display error message for empty Password field*/}
          {validationErrors.password &&
            validationErrors.password.type === "required" && (
              <Typography className={classes.errorMessage}>
                Password cannot be empty{" "}
              </Typography>
            )}

          {/*Display error message for incorrectly formatted password*/}
          {validationErrors.password &&
            validationErrors.password.type === "pattern" && (
              <Typography className={classes.errorMessage}>
                Password must be 5-40 characters
              </Typography>
            )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            inputRef={register({
              pattern: new RegExp("^[a-zA-Z0-9]{5,40}$"),
            })}
          />

          {/*Display error message for empty Confirm Password field*/}
          {validationErrors.confirmPassword &&
            validationErrors.confirmPassword.type === "required" && (
              <Typography className={classes.confirmErrorMessage}>
                Confirm Password cannot be empty{" "}
              </Typography>
            )}

          {/*Display error message for incorrectly formatted password*/}
          {validationErrors.confirmPassword &&
            validationErrors.confirmPassword.type === "pattern" && (
              <Typography className={classes.confirmErrorMessage}>
                Confirm Password must be 5-40 characters
              </Typography>
            )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Send
          </Button>
        </form>
      </div>
    </Container>
  );
}
