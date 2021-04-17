import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CreateToken,
  CreateTokenInput,
  CREATE_TOKEN,
  useTokenValidate,
} from "./AuthCommon";
import Container from "@material-ui/core/Container";
import CustomAlert from "../common/CustomAlert";
import DisplayUserErrors from "../common/DisplayUserErrors";
import { useDisplayContext } from "../../AppContext";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

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
  text: {
    color: theme.palette.secondary.main,
  },
  linksContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2.5),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage: {
    color: "#c62828",
    paddingLeft: "240px",
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none",
    },
    fontFamily: theme.typography.fontFamily,
  },
  signInMsg: {
    marginTop: theme.spacing(1.5),
    width: "100%",
  },
}));

type FormInputs = {
  email: string;
  password: string;
};

export default function SignIn() {
  const classes = useStyles();
  const [showSignInMsg] = useState(useDisplayContext());
  const history = useHistory();

  const [createToken, { data }] = useMutation<
    CreateToken,
    { input: CreateTokenInput } //define expected $input: CustomerAccessTokenCreateInput! argument to apollo hook
  >(CREATE_TOKEN);

  const {
    register,
    handleSubmit,
    errors: validationErrors,
  } = useForm<FormInputs>();

  const handleSignIn: SubmitHandler<FormInputs> = async (
    formValues: FormInputs
  ) => {
    const { email, password } = formValues; //use object destructuring to access user's data input
    createToken({
      variables: {
        input: { email, password }, //pass in expected $input: CustomerAccessTokenCreateInput! argument to apollo hook
      },
    });
  };

  useTokenValidate("/myAccount"); // redirect to to myAccount if token exists

  useEffect(() => {
    //confirm successful request, by checking for absence of error codes in response
    if (
      data &&
      data.customerAccessTokenCreate.customerUserErrors.length === 0
    ) {
      (async () => {
        const {
          accessToken,
          expiresAt,
        } = data.customerAccessTokenCreate.customerAccessToken; //extract newly created token and its corresponding expiry date, from the response
        localStorage.setItem(
          "token",
          JSON.stringify({ accessToken, expiresAt }) // store token and token expiry in local storage
        );
        history.push("/myAccount"); //redirect user to their Account page
      })();
    }
  }, [history, data]);

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.root}>
        {/*Conditionally Display error message if Sign In request unsuccessful */}
        {data &&
          data.customerAccessTokenCreate.customerUserErrors.length > 0 && (
            <CustomAlert
              title={"Error!"}
              content={DisplayUserErrors(
                data.customerAccessTokenCreate.customerUserErrors[0].code
              )}
              type={"e"}
            />
          )}
        {showSignInMsg && showSignInMsg.rerouteToSignIn && (
          <div className={classes.signInMsg}>
            {/*Conditionally Display success message if sign in request successful */}
            <CustomAlert
              title={"Sign In"}
              content={
                "We've sent you an email with a link to update your password"
              }
              type={"i"}
            />
          </div>
        )}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.icon} />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.text}>
          Sign In
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(handleSignIn)}>
          <TextField
            variant="outlined"
            error={validationErrors.email ? true : false}
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            name="email"
            inputRef={register({
              pattern: new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
            })}
          />

          {/*Display error message for empty Email Address field*/}
          {validationErrors.email &&
            validationErrors.email.type === "required" && (
              <Typography className={classes.errorMessage}>
                Email Address cannot be empty{" "}
              </Typography>
            )}

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
            id={validationErrors.password ? "outlined-error-helper-text" : ""}
            error={validationErrors.password ? true : false}
            required
            fullWidth
            label="Password"
            type="password"
            name={"password"}
            inputRef={register({
              pattern: new RegExp("^[a-zA-Z0-9]{3,10}$"), //TODO: Allow special characters, not just letters and numbers
            })}
          />

          {/*Display error message for empty Password field*/}
          {validationErrors.password &&
            validationErrors.password.type === "required" && (
              <Typography className={classes.errorMessage}>
                Password cannot be empty{" "}
              </Typography>
            )}

          {/*Display error message for incorrectly formatted Password*/}
          {validationErrors.password &&
            validationErrors.password.type === "pattern" && (
              <Typography className={classes.errorMessage}>
                Password must be 3-10 letters
              </Typography>
            )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <div className={classes.linksContainer}>
            <Link to="/resetPassword" className={classes.link}>
              Forgot password?
            </Link>
            <Link to="/signUp" className={classes.link}>
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}
