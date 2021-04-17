import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CustomAlert from "../../../common/CustomAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  controlText: {
    color: theme.palette.secondary.main,
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  errorMessage: {
    color: "#c62828",
    paddingLeft: "240px",
  },
  reqMessage: {
    marginTop: theme.spacing(1.5),
  },
}));

type FormInputs = {
  //the expected structure of the form values
  firstName: string;
  lastName: string;
  company: string;
  address: string;
  addressTwo: string;
  city: string;
  country: string;
  province: string;
  pzCode: string;
  phone: string;
};

type NewAddress = {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  province: string;
  zip: string;
  phone: string;
};

interface CustomerAddress {
  id: string;
}

interface CustomerUserErrors {
  code: string;
}

interface CreateCustomerAddress {
  //the expected structure of the response
  customerAddressCreate: {
    customerAddress: CustomerAddress;
    customerUserErrors: CustomerUserErrors[];
  };
}

//define a mutation for creating a new address
export const CREATE_NEW_ADDRESS = gql`
  mutation customerAddressCreate(
    $customerAccessToken: String!
    $address: MailingAddressInput!
  ) {
    customerAddressCreate(
      customerAccessToken: $customerAccessToken
      address: $address
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
      }
    }
  }
`;

export default function ContactForm() {
  const classes = useStyles();
  const [createAddress, { data }] = useMutation<
    CreateCustomerAddress,
    { customerAccessToken: string; address: NewAddress } //pass in expected $customerAccessToken: String! $address: MailingAddressInput! arguments to apollo hook
  >(CREATE_NEW_ADDRESS);

  const notify = () =>
    toast.info("Thank you! Your address was successfully updated.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const {
    register,
    handleSubmit,
    reset,
    errors: validationErrors,
  } = useForm<FormInputs>();

  const handleAdd: SubmitHandler<FormInputs> = async (
    formValues: FormInputs
  ) => {
    const {
      firstName,
      lastName,
      company,
      address,
      addressTwo,
      city,
      country,
      province,
      pzCode,
      phone,
    } = formValues; //use object destructuring to access user's data input
    //Execute a function for creating a new address
    const token = JSON.parse(localStorage.getItem("token") as any).accessToken;
    createAddress({
      variables: {
        customerAccessToken: token,
        address: {
          firstName,
          lastName,
          company,
          address1: address,
          address2: addressTwo,
          city,
          country,
          province,
          zip: pzCode,
          phone,
        },
      },
    });
  };

  useEffect(() => {
    if (data && data.customerAddressCreate.customerUserErrors.length === 0) {
      (async () => {
        reset();
        notify();
      })();
    }
  }, [data, reset]);

  return (
    <Container component="main" maxWidth="sm">
      {!data && (
        <div className={classes.reqMessage}>
          <CustomAlert
            title={"Add a new Address"}
            content={"Please fill out this form to add a new address."}
            type={"i"}
          />
        </div>
      )}
      {data && data.customerAddressCreate.customerUserErrors.length > 0 && (
        <div className={classes.reqMessage}>
          <CustomAlert
            title={"Error"}
            content={
              data.customerAddressCreate.customerUserErrors[0].code === "TAKEN"
                ? "This address already exisits in our records."
                : "We've encountered an error while attempting to add this address."
            }
            type={"e"}
          />
        </div>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit(handleAdd)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                placeholder="First Name"
                fullWidth
                autoFocus
                margin="normal"
                size="small"
                required
                error={validationErrors.firstName ? true : false}
                name="firstName"
                inputRef={register({ required: true })}
              />

              {/*Display error message for empty Name field*/}
              {validationErrors.firstName && (
                <Typography className={classes.errorMessage}>
                  First Name cannot be empty{" "}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                placeholder="Last Name"
                fullWidth
                margin="normal"
                size="small"
                required
                error={validationErrors.lastName ? true : false}
                name="lastName"
                inputRef={register({ required: true })}
              />

              {/*Display error message for empty Last Name field*/}
              {validationErrors.lastName && (
                <Typography className={classes.errorMessage}>
                  Last Name cannot be empty{" "}
                </Typography>
              )}
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            error={validationErrors.company ? true : false}
            margin="normal"
            size="small"
            fullWidth
            label="Company"
            name="company"
            inputRef={register}
          />

          {/*Display error message for empty company field*/}
          {validationErrors.company &&
            validationErrors.company.type === "required" && (
              <Typography className={classes.errorMessage}>
                Company Name cannot be empty{" "}
              </Typography>
            )}

          <TextField
            variant="outlined"
            error={validationErrors.address ? true : false}
            margin="normal"
            size="small"
            required
            fullWidth
            label="Address1"
            name="address"
            inputRef={register({ required: true })}
          />

          {/*Display error message for empty address field*/}
          {validationErrors.address &&
            validationErrors.address.type === "required" && (
              <Typography className={classes.errorMessage}>
                Address1 cannot be empty{" "}
              </Typography>
            )}

          <TextField
            variant="outlined"
            margin="normal"
            size="small"
            fullWidth
            label="Address2"
            name="addressTwo"
            inputRef={register}
          />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                required
                error={validationErrors.city ? true : false}
                label="City"
                name="city"
                inputRef={register({ required: true })}
              />

              {/*Display error message for empty city field*/}
              {validationErrors.province && (
                <Typography className={classes.errorMessage}>
                  City cannot be empty{" "}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                placeholder="Canada"
                fullWidth
                margin="normal"
                size="small"
                required
                error={validationErrors.country ? true : false}
                label="Country"
                name="country"
                inputRef={register({ required: true })}
              />

              {/*Display error message for empty country field*/}
              {validationErrors.country && (
                <Typography className={classes.errorMessage}>
                  Country cannot be empty{" "}
                </Typography>
              )}
            </Grid>
          </Grid>

          <TextField
            variant="outlined"
            placeholder="Alberta"
            fullWidth
            margin="normal"
            size="small"
            required
            error={validationErrors.province ? true : false}
            label="Province"
            name="province"
            inputRef={register({ required: true })}
          />

          {/*Display error message for empty province field*/}
          {validationErrors.province && (
            <Typography className={classes.errorMessage}>
              Province cannot be empty{" "}
            </Typography>
          )}

          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
            required
            error={validationErrors.pzCode ? true : false}
            label="Postal/Zip Code"
            name="pzCode"
            inputRef={register({ required: true })}
          />

          {/*Display error message for empty city field*/}
          {validationErrors.pzCode && (
            <Typography className={classes.errorMessage}>
              Postal/Zip Code cannot be empty{" "}
            </Typography>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            error={validationErrors.phone ? true : false}
            required
            size="small"
            fullWidth
            label="Phone (e.g. 5555555555)"
            name={"phone"}
            inputRef={register({
              pattern: new RegExp(/^\d{10}$/),
            })}
          />

          {/*Display error message for empty Phone field*/}
          {validationErrors.phone &&
            validationErrors.phone.type === "required" && (
              <Typography className={classes.errorMessage}>
                Phone number cannot be empty{" "}
              </Typography>
            )}

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
            Add address
          </Button>
        </form>
      </div>
    </Container>
  );
}
