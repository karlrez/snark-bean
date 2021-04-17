import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Tooltip from "@material-ui/core/Tooltip";
import DropdownMenu from "./DropdownMenu";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
    border: "1px solid gray",
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
  root: {
    width: "100%",
  },
  submitBtn: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    height: "50px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

interface ItemProps {
  item: any;
  addToCart: (item: any) => void;
}

interface CartItem {
  item: ItemProps["item"];
  variantID: string;
  quantity: number;
  weight: string;
  grind: string;
  image: string;
  price: number;
}

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  onWeightSelection: (index: number) => void;
  onGrindSelection: (index: number) => void;
  onAmountSelection: (index: number) => void;
  weightSelection: number;
  grindSelection: number;
  amountSelection: number;
}

function SimpleDialog(props: SimpleDialogProps & ItemProps) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose("");
  };

  const handleSubmit = () => {
    console.log(props.item);
    let grindChoices = [
      "Whole Beans",
      "Espresso",
      "Drip",
      "Pour-Over",
      "French Press",
    ];
    let weightChoices = ["1lb / 454g", "3/4lb / 340g", "1/2lb / 227g"];

    let cartItem: CartItem | null = null;
    if (props.item.node.title.includes("Flight")) {
      cartItem = {
        item: props.item,
        variantID: props.item.node.variants.edges[0].node.id, // Flights dont have variants, single id
        quantity: 1,
        weight: "0",
        grind: "",
        image: props.item.node.variants.edges[0].node.image.src,
        price: parseFloat(props.item.node.variants.edges[0].node.price),
      };
    } else if (props.item.node.title.includes("Gift Card")) {
      cartItem = {
        item: props.item,
        variantID:
          props.item.node.variants.edges[props.amountSelection].node.id,
        quantity: 1,
        weight: "0",
        grind: "",
        image: props.item.node.variants.edges[0].node.image.src,
        price: parseFloat(
          props.item.node.variants.edges[props.amountSelection].node.price
        ),
      };
    } else {
      cartItem = {
        item: props.item,
        variantID:
          props.item.node.variants.edges[props.amountSelection].node.id,
        quantity: 1,
        weight: weightChoices[props.weightSelection],
        grind: grindChoices[props.grindSelection],
        image: props.item.node.variants.edges[0].node.image.src,
        price: parseFloat(
          props.item.node.variants.edges[props.weightSelection].node.price
        ),
      };
    }
    props.addToCart(cartItem);
    onClose("");
  };

  // Dropdown Menu for choice of grind
  let grindDropDownMenu = (
    <DropdownMenu
      label="Select Grind"
      options={["Whole Beans", "Espresso", "Drip", "Pour-Over", "French Press"]}
      onMenuChange={props.onGrindSelection}
    />
  );

  // Menu gives options for weight
  let dropDownMenu = (
    <DropdownMenu
      label="Select Weight"
      options={["1lb / 454g", "3/4lb / 340g", "1/2lb / 227g"]}
      onMenuChange={props.onWeightSelection}
    />
  );

  // TODO: use field node.isGiftCard
  // Options for Gift Card
  if (props.item.node.title.includes("Gift Card")) {
    dropDownMenu = (
      <DropdownMenu
        label="Select Amount"
        options={["$25", "$50", "$100"]}
        onMenuChange={props.onAmountSelection}
      />
    );
    grindDropDownMenu = <></>;
  }

  // No dropdown menu for flights
  if (props.item.node.title.includes("Flight")) {
    dropDownMenu = (
      <DropdownMenu
        label="Confirm Order" // Looks better having something in the modal
        options={[]}
        onMenuChange={props.onAmountSelection} // function wont do anything without options
      />
    );
    grindDropDownMenu = <></>;
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="simple-dialog-title" className={classes.title}>
        Order Details
      </DialogTitle>
      <List>
        <ListItem>{dropDownMenu}</ListItem>

        <ListItem>{grindDropDownMenu}</ListItem>
      </List>
      <Button
        type="submit"
        fullWidth
        className={classes.submitBtn}
        onClick={handleSubmit}
      >
        Add to cart{" "}
      </Button>
    </Dialog>
  );
}

interface Props {
  showOrderText: boolean;
}

export default function SimpleDialogDemo(props: Props & ItemProps) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [weightSelection, setWeightSelection] = React.useState(0);
  const [grindSelection, setGrindSelection] = React.useState(0);
  const [amountSelection, setAmountSelection] = React.useState(0); // gift card amount

  // Keeping menu choices in state
  const onWeightSelection = (index: number) => {
    setWeightSelection(index);
  };

  const onGrindSelection = (index: number) => {
    setGrindSelection(index);
  };

  const onAmountSelection = (index: number) => {
    setAmountSelection(index);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {props.showOrderText ? (
        <Button fullWidth={true} onClick={handleClickOpen}>
          <ShoppingCartIcon style={{ color: green[500] }} />
          Order
        </Button>
      ) : (
        <Button size="large" color="primary" onClick={handleClickOpen}>
          <Tooltip title="Order">
            <ShoppingCartIcon style={{ color: green[500] }} />
          </Tooltip>
        </Button>
      )}
      <SimpleDialog
        open={open}
        onClose={handleClose}
        item={props.item}
        addToCart={props.addToCart}
        onWeightSelection={onWeightSelection}
        onGrindSelection={onGrindSelection}
        onAmountSelection={onAmountSelection}
        weightSelection={weightSelection}
        grindSelection={grindSelection}
        amountSelection={amountSelection}
      />
    </div>
  );
}
