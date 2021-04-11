import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import coffeeShopImg from "./homeComponents/coffee-shop.jpg";
import giftCardImg from "./homeComponents/giftcard.png";

const useStyles = makeStyles((theme) => ({
  primaryContainer: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2.5, 5, 1),
    },
    justifyContent: "center",
  },
  secondaryContainer: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(2.5, 5, 1),
    },
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#faf9f6", //TODO: replace with global theme option
    height: theme.spacing(27.5),
  },
  avatar: {
    width: theme.spacing(35),
    height: theme.spacing(25),
  },
  avatarTwo: {
    width: theme.spacing(22),
    height: theme.spacing(26),
  },
  titleText: {
    textDecoration: "underline",
    textDecorationThickness: "4px",
    textDecorationColor: "#eb4f47",
  },
  shopBtn: {
    backgroundColor: "#eb4f47",
    color: theme.palette.background.paper,
  },
  bodyText: {
    marginTop: -0.4,
  },
}));

export default function HomeIntro() {
  const classes = useStyles();
  const navTo = (route: string) => (window.location.href = route);
  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <div className={classes.primaryContainer}>
            <Avatar
              className={classes.avatar}
              alt="Coffee Shop"
              src={coffeeShopImg}
              variant="rounded"
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.secondaryContainer}>
            <Typography variant="h5" className={classes.titleText}>
              Introducing Flights
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
              The perfect gift for those who just can't pick one... Sample 3 of
              our most loved coffees and find your favourite.
            </Typography>
            <Button
              variant="contained"
              className={classes.shopBtn}
              onClick={() => navTo("/shop/flights")}
            >
              Shop Now
            </Button>
          </div>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={6}>
          <div className={classes.secondaryContainer}>
            <Typography variant="h5" className={classes.titleText}>
              Gift Cards
            </Typography>
            <Typography variant="body1" className={classes.bodyText}>
              Looking for something for someone special? A gift card to our
              store is the perfect idea!
            </Typography>
            <Button
              variant="contained"
              className={classes.shopBtn}
              onClick={() => navTo("/shop/gift-cards")}
            >
              View
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={classes.primaryContainer}>
            <Avatar
              className={classes.avatarTwo}
              alt="Gift Card"
              src={giftCardImg}
              variant="rounded"
            />
          </div>
        </Grid>
      </Grid>
    </>
  );
}
