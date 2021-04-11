import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import CreateCustomerErrors, {
  CreateToken,
  CreateTokenInput,
  CREATE_TOKEN,
} from "./AuthCommon";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomAlert from "../common/CustomAlert";
import DisplayUserErrors from "../common/DisplayUserErrors";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@material-ui/core/Box";
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
  text: {
    color: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formControl: {
    color: "#ef9a9a",
    display: "flex",
    justifyContent: "flex-start",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  //Define struture of form data
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptsMarketing: boolean;
};

interface CreateCustomer {
  customerCreate: {
    customer: null | any;
    customerUserErrors: CreateCustomerErrors[];
  };
}

interface NewCustomer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  acceptsMarketing: boolean;
}

const CREATE_CUSTOMER = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      customerUserErrors {
        code
      }
    }
  }
`;

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [createCustomer, { data }] = useMutation<
    CreateCustomer,
    { input: NewCustomer }
  >(CREATE_CUSTOMER);

  const [createToken, { data: tokenData }] = useMutation<
    CreateToken,
    { input: CreateTokenInput }
  >(CREATE_TOKEN);

  const {
    register,
    handleSubmit,
    errors: validationErrors,
  } = useForm<FormInputs>();

  const handleSignUp: SubmitHandler<FormInputs> = async (
    formValues: FormInputs
  ) => {
    const {
      firstName,
      lastName,
      email,
      password,
      acceptsMarketing,
    } = formValues; //use object destructuring to access user's data input
    createCustomer({
      variables: {
        input: { firstName, lastName, email, password, acceptsMarketing },
      },
    });

    setEmail(email);
    setPassword(password);
  };

  useEffect(() => {
    if (data && data.customerCreate.customerUserErrors.length === 0) {
      (async () => {
        createToken({
          variables: {
            input: { email, password },
          },
        });
      })();
    }
  }, [email, password, createToken, history, data]);

  useEffect(() => {
    if (
      tokenData &&
      tokenData.customerAccessTokenCreate.customerUserErrors.length === 0
    ) {
      (async () => {
        const {
          accessToken,
          expiresAt,
        } = tokenData.customerAccessTokenCreate.customerAccessToken;
        localStorage.setItem(
          "token",
          JSON.stringify({ accessToken, expiresAt }) // store token and token expiry in local storage
        );
        history.push("/"); //navigate to Home on successful request
      })();
    }
  }, [history, tokenData]);

  return (
    <Container component="main" maxWidth="sm">
      <div className={classes.root}>
        {((data && data.customerCreate.customerUserErrors.length > 0) ||
          (tokenData &&
            tokenData.customerAccessTokenCreate.customerUserErrors.length >
              0)) && (
          <div className={classes.reqErrMsg}>
            {data && data.customerCreate.customerUserErrors.length > 0 && (
              <CustomAlert
                title={"Error!"}
                content={DisplayUserErrors(
                  data.customerCreate.customerUserErrors[0].code
                )}
                type={"e"}
              />
            )}
            {tokenData &&
              tokenData.customerAccessTokenCreate.customerUserErrors.length >
                0 && (
                <CustomAlert
                  title={"Error!"}
                  content={DisplayUserErrors(
                    tokenData.customerAccessTokenCreate.customerUserErrors[0]
                      .code
                  )}
                  type={"e"}
                />
              )}
          </div>
        )}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon className={classes.icon} />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.text}>
          Sign Up
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(handleSignUp)}>
          <TextField
            variant="outlined"
            placeholder="First Name"
            autoFocus
            margin="normal"
            size="small"
            required
            fullWidth
            error={validationErrors.firstName ? true : false}
            name="firstName"
            inputRef={register({ required: true })}
          />

          {/*Display error message for empty first name field*/}
          {validationErrors.firstName && (
            <Typography className={classes.errorMessage}>
              First Name cannot be empty{" "}
            </Typography>
          )}

          <TextField
            variant="outlined"
            placeholder="Last Name"
            margin="normal"
            size="small"
            required
            fullWidth
            error={validationErrors.lastName ? true : false}
            name="lastName"
            inputRef={register({ required: true })}
          />

          {/*Display error message for empty last name field*/}
          {validationErrors.lastName && (
            <Typography className={classes.errorMessage}>
              Last Name cannot be empty{" "}
            </Typography>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
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

          <Box className={classes.text}>
            <FormControlLabel
              control={<Checkbox name="acceptsMarketing" inputRef={register} />}
              className={classes.formControl}
              label="I want to receive marketing promotions and updates via email."
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}
