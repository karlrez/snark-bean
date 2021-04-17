import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CustomAlert from "../common/CustomAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
    fontSize: 13,
    paddingLeft: "240px",
  },
  infoMessage: {
    marginTop: theme.spacing(1.5),
  },
}));

type FormInputs = {
  name: string;
  email: string;
  phone: string;
  comment: string;
};

export default function ContactForm() {
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    errors: validationErrors,
    reset,
  } = useForm<FormInputs>();

  const sendEmail = (formValues: FormInputs) =>
    emailjs.send(
      "put new serviceID here",
      "put new templateID here",
      formValues,
      "put new userID here"
    );

  const notify = () =>
    toast.info("Thank you for your message! We'll get back to you shortly.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const handleSend: SubmitHandler<FormInputs> = async (
    formValues: FormInputs
  ) => {
    sendEmail(formValues);
    reset();
    notify();
  };
  return (
    <Container component="main" maxWidth="sm">
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
      <div className={classes.infoMessage}>
        <CustomAlert
          title={"General Inquiries"}
          content={
            "Please fill out this form to contact me if you have any inquiries relating to SnarkBean Coffee."
          }
          type={"i"}
        />
      </div>
      <div className={classes.root}>
        <form className={classes.form} onSubmit={handleSubmit(handleSend)}>
          <TextField
            variant="outlined"
            placeholder="Full Name"
            autoFocus
            margin="normal"
            size="small"
            required
            fullWidth
            name="name"
            inputRef={register({ required: true })}
          />

          {/*Display error message for empty Name field*/}
          {validationErrors.name && (
            <Typography className={classes.errorMessage}>
              Full Name cannot be empty{" "}
            </Typography>
          )}

          <TextField
            variant="outlined"
            error={validationErrors.email ? true : false}
            margin="normal"
            size="small"
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
            error={validationErrors.phone ? true : false}
            margin="normal"
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

          <TextField
            variant="outlined"
            error={validationErrors.comment ? true : false}
            margin="normal"
            required
            size="small"
            fullWidth
            multiline
            rows={4}
            label="Add a comment"
            name={"comment"}
            inputRef={register({ required: true })}
          />

          {/*Display error message for empty Last Name field*/}
          {validationErrors.comment && (
            <Typography className={classes.errorMessage}>
              Please leave us a message, so we can advise you better{" "}
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
