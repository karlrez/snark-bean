import { TextField } from "@material-ui/core";
import React, { useMemo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Container from "@material-ui/core/Container";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  errorMessage: {
    color: "#c62828",
    fontSize: 13,
    paddingLeft: "240px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  province: string;
  postalCode: string;
  ship: string;
  pickup: string;
};

interface Props {
  onSubmit: () => void;
}

export default function Shipping(props: Props) {
  const classes = useStyles();
  const {
    //register,
    handleSubmit,
    //errors: validationErrors,
    //reset,
  } = useForm<FormInputs>();
  const [deliveryMethod, setDeliveryMethod] = React.useState("Pickup");

  const handleSend: SubmitHandler<FormInputs> = async (
    formValues: FormInputs
  ) => {
    //const { email, phone } = formValues;

    props.onSubmit();
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryMethod((event.target as HTMLInputElement).value);
    //setHelperText(' ');
    //setError(false);
  };

  const deliveryRadioBtns = (
    <form onSubmit={handleSubmit(handleSend)}>
      <FormControl
        component="fieldset"
        //error={error}
        className={classes.formControl}
      >
        <FormLabel component="legend">Select Delivery Method</FormLabel>
        <RadioGroup
          aria-label="shippingMethod"
          name="shippingMethod"
          value={deliveryMethod}
          onChange={handleRadioChange}
        >
          <FormControlLabel value="Pickup" control={<Radio />} label="Pickup" />
          <FormControlLabel value="Ship" control={<Radio />} label="Ship" />
        </RadioGroup>

        {deliveryMethod === "Pickup" ? (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Proceed to Payment
          </Button>
        ) : null}
      </FormControl>
    </form>
  );

  const shippingForm = (
    <form onSubmit={handleSubmit(handleSend)}>
      <TextField
        variant="outlined"
        //error={validationErrors.email ? true : false}
        margin="normal"
        size="small"
        //required
        fullWidth
        label="First Name"
        name="firstName"
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
        label="Last Name"
        name="lastName"
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
        label="Address"
        name="address"
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
        label="Apartment, suite, etc. (optional)"
        name="apartment"
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
        label="City"
        name="city"
        //inputRef={register({
        //pattern: new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
        //})}
      />
      <FormControl className={classes.formControl}>
        <Select
          //value={age}
          //onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="" disabled>
            Country
          </MenuItem>
          <MenuItem value="Canada">Canada</MenuItem>
        </Select>
        <FormHelperText>Select Country</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <Select
          //value={age}
          //onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="" disabled>
            Province
          </MenuItem>
          <MenuItem value={"Alberta"}>Alberta</MenuItem>
          <MenuItem value={"British Columbia"}>British Columbia</MenuItem>
          <MenuItem value={"Manitoba"}>New Brunswick</MenuItem>
          <MenuItem value={"Newfoundland and Labrador"}>
            Newfoundland and Labrador
          </MenuItem>
          <MenuItem value={"Nova Scotia"}>Nova Scotia</MenuItem>
          <MenuItem value={"Ontario"}>Ontario</MenuItem>
          <MenuItem value={"Prince Edward Island"}>
            Prince Edward Island
          </MenuItem>
          <MenuItem value={"Quebec"}>Quebec</MenuItem>
          <MenuItem value={"Saskatchewan"}>Saskatchewan</MenuItem>
        </Select>
        <FormHelperText>Select Province</FormHelperText>
      </FormControl>
      <TextField
        variant="outlined"
        //error={validationErrors.email ? true : false}
        margin="normal"
        size="small"
        //required
        fullWidth
        label="Postal Code"
        name="postalCode"
        //inputRef={register({
        //pattern: new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$"),
        //})}
      />

      <FormLabel component="legend">Shipping Method</FormLabel>
      <RadioGroup
        aria-label="shippingMethod"
        name="shippingMethod"
        //value={deliveryMethod}
        //onChange={handleRadioChange}
      >
        <FormControlLabel
          value="heavyGoods"
          control={<Radio />}
          label="Heavy Goods Shipping"
        />
        <FormControlLabel
          value="expedited"
          control={<Radio />}
          label="Canads Post Expedited Parcel"
        />
        <FormControlLabel
          value="xpresspost"
          control={<Radio />}
          label="Canada Post Xpresspost"
        />
        <FormControlLabel
          value="priority"
          control={<Radio />}
          label="Canads Post Priority"
        />
      </RadioGroup>

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
  );

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      {deliveryRadioBtns}
      {deliveryMethod === "Ship" ? shippingForm : null}
    </Container>
  );
}
