import Grid from "@material-ui/core/Grid";
import { CardMedia, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { green } from "@material-ui/core/colors";
import lightRoastImg from "./assets/snark-light-roast.png";
import mediumRoastImg from "./assets/snark-medium-roast.png";
import darkRoastImg from "./assets/snark-dark-roast.png";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#faf9f6", //TODO: replace with global theme
    height: "60%",
    marginTop: theme.spacing(4),
  },
  card: {
    height: 290,
    width: 325,
  },
  cardMedia: {
    height: "170px",
  },
  title: {
    marginTop: theme.spacing(0.7),
    textAlign: "center",
  },
  typographyContainer: {
    display: "flex",
    flexFlow: "column wrap",
  },
  titleText: {
    textAlign: "center",
    marginBottom: theme.spacing(1.5),
    textDecoration: "underline",
    textDecorationThickness: "4px",
    textDecorationColor: "#eb4f47",
  },
}));

export default function HomeCards() {
  const classes = useStyles();
  const roastTypes = ["Light Roast", "Medium Roast", "Dark Roast"];
  const roastTypesUrl = ["light", "medium", "dark"];
  const roastImages = [lightRoastImg, mediumRoastImg, darkRoastImg];
  //not using history in this case, because history would start the user at the end of shop by default.
  //Instead of starting them at the beginning/top of the page
  const navTo = (route: string) => (window.location.href = route);

  return (
    <div className={classes.root}>
      <Typography variant="h5" className={classes.titleText} gutterBottom>
        Snark Roastery
      </Typography>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={6}
      >
        {/*loop through the list to render a row of cards */}
        {roastTypes.map((roast, index) => {
          return (
            <Grid item key={index}>
              <Card className={classes.card} raised>
                <CardActionArea>
                  <CardMedia
                    className={classes.cardMedia}
                    image={roastImages[index]}
                    title="Click for more info"
                  />
                  <CardContent className={classes.typographyContainer}>
                    <Typography
                      className={classes.title}
                      variant="h5"
                      align="left"
                      gutterBottom
                    >
                      {roast}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    fullWidth
                    onClick={() =>
                      navTo(`#/shop/${roastTypesUrl[index]}-roast`)
                    }
                  >
                    <ShoppingCartIcon style={{ color: green[500] }} />
                    Shop
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
