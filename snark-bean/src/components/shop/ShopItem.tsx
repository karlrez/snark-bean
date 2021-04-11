import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "./Modal";
import OrderModal from "./orderModal/OrderModal";
import { AppContext } from "./../../AppContext";

const useStyles = makeStyles({
  root: {
    width: 350,
    maxWidth: 350,
  },
  media: {
    height: 200,
  },
});

interface Props {
  item: any;
}

interface CartItem {
  item: Props["item"];
  variantID: string;
  quantity: number;
  weight: string;
  grind: string;
  image: string;
  price: string;
}

export default function ShopItems(props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false); // for modal
  const [contextCart, setContextCart] = useContext(AppContext);

  // Add item to cart in browser local storage
  const addItem = (cartItem: CartItem) => {
    let cart: Array<CartItem> = [];
    // get cart if exists
    if (localStorage.getItem("cart"))
      cart = JSON.parse(localStorage.getItem("cart") as any);

    let existingItem;
    if (cart) {
      // check if item already in cart
      existingItem = cart.find(
        (obj) =>
          obj.variantID === cartItem.variantID &&
          obj.weight === cartItem.weight &&
          obj.grind === cartItem.grind
      );
    }

    // increment quantity or add to cart array
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push(cartItem);
    }

    // save to local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    setContextCart(cart);
  };

  // Modal button handlers
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia
          className={classes.media}
          image={props.item.node.variants.edges[0].node.image.src}
          title="Click for more info"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.item.node.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            ${props.item.node.variants.edges[0].node.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <OrderModal
          showOrderText={false}
          addToCart={addItem}
          item={props.item}
        />
        <Button size="small" color="primary">
          <Modal
            item={props.item}
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
            addToCart={addItem}
          />
        </Button>
      </CardActions>
    </Card>
  );
}
