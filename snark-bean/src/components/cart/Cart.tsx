import React, { useContext, useEffect } from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { AppContext } from "./../../AppContext";
import { gql, useMutation } from "@apollo/client";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "900px",
      backgroundColor: theme.palette.background.paper,
      margin: "auto",
      marginTop: "50px",
    },
    title: {
      fontFamily: theme.typography.fontFamily,
      textAlign: "center",
    },
    total: {
      textAlign: "right",
    },
    itemImage: {
      height: "100px",
      width: "auto",
      border: "solid",
      marginRight: "20px",
    },
    quantityInput: {
      width: "80px",
      paddingRight: "15px",
    },
    checkoutBtn: {
      height: "50px",
      background: theme.palette.primary.main,
      "&:hover": {
        background: theme.palette.primary.light,
      },
    },
    subTotal: {
      textAlign: "right",
      padding: "20px",
    },
  })
);

interface CartItem {
  item: any;
  variantID: string;
  quantity: number;
  weight: string;
  grind: string;
  image: string;
  price: string;
}

interface LineItem {
  variantId: string;
  quantity: number;
}

interface Input {
  lineItems: LineItem[];
}

interface CheckoutCreate {
  checkoutCreate: any;
}

const CREATE_CHECKOUT = gql`
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        lineItems(first: 250) {
          edges {
            node {
              title
              quantity
            }
          }
        }
      }
    }
  }
`;

export default function InsetDividers() {
  const classes = useStyles();
  const [contextCart, setContextCart] = useContext(AppContext);
  const [addCheckoutItem, { data }] = useMutation<
    CheckoutCreate,
    { input: Input }
  >(CREATE_CHECKOUT);
  const [redirect, setRedirect] = React.useState<string>();

  useEffect(() => {
    if (localStorage.getItem("cart")) {
      let cart = JSON.parse(localStorage.getItem("cart") as any);
      let tempState: Array<CartItem> = [];
      cart.forEach((item: CartItem) => tempState.push(item));
      setContextCart(tempState);
    }
  }, []);

  // To trigger redirection for the new checkout tab
  useEffect(() => {
    if (data) {
      window.open(data.checkoutCreate.checkout.webUrl);

      if (contextCart) {
        setContextCart([]);
        localStorage.setItem("cart", JSON.stringify([]));
      }
      setRedirect("/shop/alert");
    }
  }, [data]);

  // To change total when incrementing quantity
  const onQuantityChange = (event: any, id: string) => {
    let tempState = [...contextCart]; // copy of state
    const index = tempState.findIndex((item) => item.variantID === id); // getting index of object to modify
    let tempItem = { ...contextCart[index] }; // copy of item to edit

    tempItem.quantity = event.target.value; // modify item
    tempState[index] = tempItem; // modify temp state
    setContextCart(tempState); // assign new state
    localStorage.setItem("cart", JSON.stringify(tempState));
  };

  // To remove item from cart
  const onDeleteItem = (id: string) => {
    let tempState = [...contextCart]; // copy of state
    const index = tempState.findIndex((item) => item.variantID === id); // getting index
    tempState.splice(index, 1); // removing item
    setContextCart(tempState); // assign new state
    localStorage.setItem("cart", JSON.stringify(tempState));
  };

  const onProceedToCheckout = () => {
    let input: Input = { lineItems: [] };

    input.lineItems = contextCart.map((item: CartItem) => {
      return { variantId: item.variantID, quantity: Number(item.quantity) };
    });

    addCheckoutItem({
      variables: {
        input: input,
      },
    });
  };

  let cartComponents: any;
  if (contextCart) {
    cartComponents = contextCart.map((item: CartItem["item"]) => {
      let primaryText;
      if (
        item.item.node.title.includes("Gift Card") ||
        item.item.node.title.includes("Flight")
      ) {
        primaryText = "";
      } else {
        primaryText = item.weight;
      }

      let secondaryText = "";
      if (item.item.node.title.includes("Gift Card")) {
        secondaryText = "$" + Number(item.price).toFixed(2);
      } else if (!item.item.node.title.includes("Flight")) {
        secondaryText = item.grind;
      }

      return (
        <div>
          <ListItem>
            <IconButton>
              <DeleteIcon onClick={() => onDeleteItem(item.variantID)} />
            </IconButton>
            <ListItemAvatar>
              <img
                src={item.image}
                alt="cart item"
                className={classes.itemImage}
              />
            </ListItemAvatar>

            <ListItemText
              primary={item.item.node.title + " " + primaryText}
              secondary={secondaryText}
            />
            <TextField
              id="outlined-number"
              label="Quantity"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              defaultValue={item.quantity}
              inputProps={{ step: 1, min: 1 }}
              className={classes.quantityInput}
              onChange={(event) => onQuantityChange(event, item.variantID)}
            />
            <span>
              ${Number(item.price).toFixed(2)} | $
              {Number(item.quantity * item.price).toFixed(2)}
            </span>
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      );
    });
  }

  const emptyCartMessage = (
    <div>
      <Typography>No items in your cart!</Typography>
    </div>
  );

  const checkoutBtn = (
    <Button
      variant="contained"
      color="primary"
      // Uncomment the href to view the checkout screens
      //href="checkout"
      fullWidth={true}
      className={classes.checkoutBtn}
      onClick={onProceedToCheckout}
    >
      Proceed to Checkout
    </Button>
  );

  let subTotal = contextCart.reduce(
    (prevValue: any, currentValue: any) =>
      prevValue + currentValue.price * currentValue.quantity,
    0
  );

  return (
    <div>
      {console.log(contextCart)}
      <Redirect to={redirect ? redirect : "/cart"} />

      <Typography className={classes.title} variant="h2">
        Your Cart
      </Typography>

      <div className={classes.root}>
        <Typography className={classes.total} variant="h4">
          Price | Total
        </Typography>

        {contextCart.length > 0 ? (
          <List>{cartComponents}</List>
        ) : (
          emptyCartMessage
        )}

        <Typography className={classes.subTotal} variant="h6">
          Total {"$" + Number(subTotal).toFixed(2)}
        </Typography>
        {contextCart.length > 0 ? checkoutBtn : null}
      </div>
    </div>
  );
}
