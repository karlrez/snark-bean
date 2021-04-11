import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDisplayContext } from "../../../AppContext";
import Container from "@material-ui/core/Container";
import CustomAlert from "../../common/CustomAlert";
import DisplayUserErrors from "../../common/DisplayUserErrors";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
  reqErrMsg: {
    marginTop: theme.spacing(1.5),
    width: "100%",
  },
}));

type FormInputs = {
  email: string;
};

interface CustomerRecoverErrors {
  code: string;
}

interface RecoverCustomer {
  customerRecover: {
    customerUserErrors: CustomerRecoverErrors[];
  };
}

const RECOVER_CUSTOMER = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
      }
    }
  }
`;

export default function ResetPassword() {
  const classes = useStyles();
  const signInContext = useDisplayContext();
  const history = useHistory();
  const [recoverCustomer, { data }] = useMutation<
    RecoverCustomer,
    { email: string }
  >(RECOVER_CUSTOMER);
  const {
    register,
    handleSubmit,
    errors: validationErrors,
  } = useForm<FormInputs>();

  const handleReset: SubmitHandler<FormInputs> = async (
    formValues: FormInputs
  ) => {
    const { email } = formValues; //use object destructuring to access user's data input
    recoverCustomer({ variables: { email } });
  };

  useEffect(() => {
    if (data && data.customerRecover.customerUserErrors.length === 0) {
      (async () => {
        if (!signInContext.rerouteToSignIn)
          signInContext.rerouteToSignIn = true;
        history.push("/signIn"); //navigate to SignIn on successful request
      })();
    }
  }, [signInContext, history, data]);

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.root}>
        {data && data.customerRecover.customerUserErrors.length > 0 && (
          <div className={classes.reqErrMsg}>
            <CustomAlert
              title={"Error!"}
              content={DisplayUserErrors(
                data.customerRecover.customerUserErrors[0].code
              )}
              type={"e"}
            />
          </div>
        )}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.icon} />
        </Avatar>
        <Typography variant="h5" className={classes.headingText}>
          RESET YOUR PASSWORD
        </Typography>
        <Typography variant="subtitle1" className={classes.text}>
          We will send you an email to reset your password.
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(handleReset)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoFocus
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
