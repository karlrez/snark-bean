import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import { StepIconProps } from "@material-ui/core/StepIcon";
import PaymentIcon from "@material-ui/icons/Payment";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import Information from "./Information";
import Shipping from "./Shipping";
import Payment from "./Payment";
import Container from "@material-ui/core/Container";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient(136deg, rgba(0,0,0,1) 0%, rgba(9,9,121,1) 55%, rgba(0,131,158,1) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient(136deg, rgba(0,0,0,1) 0%, rgba(9,9,121,1) 55%, rgba(0,131,158,1) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient(136deg, rgba(0,0,0,1) 0%, rgba(9,9,121,1) 55%, rgba(0,131,158,1) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient(136deg, rgba(0,0,0,1) 0%, rgba(9,9,121,1) 55%, rgba(0,131,158,1) 100%)",
  },
});

function ColorlibStepIcon(props: StepIconProps) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <ContactMailIcon />,
    2: <LocalShippingIcon />,
    3: <PaymentIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["Information", "Shipping", "Payment"];
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let form;
  switch (activeStep) {
    case 0:
      form = <Information onSubmit={handleNext} />;
      break;
    case 1:
      form = <Shipping onSubmit={handleNext} />;
      break;
    case 2:
      form = <Payment />;
      break;
    default:
      form = <Information onSubmit={handleNext} />;
  }

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {form}
      <Container component="main" maxWidth="sm">
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          color="secondary"
          variant="contained"
          className={classes.button}
        >
          Back
        </Button>
      </Container>
    </div>
  );
}
