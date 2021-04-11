import React, { useEffect, useContext } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import LogoAndName from "./LogoAndName";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link, LinkProps } from "react-router-dom";
import { default as Tab, TabProps } from "@material-ui/core/Tab";
import { useLocation } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { AppContext } from "./../../AppContext";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontFamily,
  },
  tabs: {
    "&:hover": {
      background: "#f2f2f2",
    },
  },
  loginTab: {
    marginLeft: "auto",
    "&:hover": {
      background: "#f2f2f2",
    },
  },
}));

interface Item {
  id: string;
  quantity: number;
  name: string;
  price: number;
  notes: string;
  process: string;
  altitude: string;
  varietals: string;
  region: string;
  certification: string;
  roast: string;
  description: string;
}

interface CartItem {
  item: Item;
  weight: string;
  grind: string;
  quantity: number;
}

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const [contextCart] = useContext(AppContext);

  useEffect(() => {
    // Ensures the correct tab is selected on page refresh
    console.log(location.pathname);
    switch (location.pathname) {
      case "/home":
        setValue(0);
        break;
      case "/shop":
        setValue(1);
        break;
      case "/blog":
        setValue(2);
        break;
      case "/contact":
        setValue(3);
        break;
      case "/myAccount":
        setValue(4);
        break;
      case "/signIn":
        setValue(4);
        break;
      case "/cart":
        setValue(5);
        break;
    }

    // TODO: try include this in switch statement?
    if (location.pathname.includes("home")) setValue(0);
    if (location.pathname.includes("shop")) setValue(1);
    if (location.pathname.includes("blog")) setValue(2);
  }, [location.pathname]);

  const LinkTab: React.ComponentType<
    TabProps & LinkProps
  > = Tab as React.ComponentType<TabProps & LinkProps>;

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  // Get count of items in cart
  let numCartItems = 0;
  if (localStorage.getItem("cart")) {
    let cartCopy = [...contextCart];
    cartCopy = JSON.parse(localStorage.getItem("cart") as any);
    cartCopy.forEach((obj: CartItem) => {
      numCartItems += Number(obj.quantity);
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" classes={useStyles()}>
        <LogoAndName />
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <LinkTab
            label="HOME"
            component={Link}
            to="/"
            className={classes.tabs}
          />
          <LinkTab
            label="SHOP"
            component={Link}
            to="/shop"
            className={classes.tabs}
          />
          <LinkTab
            label="BLOG"
            component={Link}
            to="/blog"
            className={classes.tabs}
          />
          <LinkTab
            label="CONTACT"
            component={Link}
            to="/contact"
            className={classes.tabs}
          />

          <LinkTab
            icon={<PersonPinIcon />}
            component={Link}
            to="/signIn"
            className={classes.loginTab}
          />
          {/*TODO: Increment counter when adding cart item*/}
          <LinkTab
            icon={
              <Badge badgeContent={numCartItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            }
            component={Link}
            to="/cart"
            className={classes.tabs}
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
