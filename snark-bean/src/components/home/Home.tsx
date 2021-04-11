import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import homeMainImg from "./homeComponents/main-home.jpg";
import HomeIntro from "./HomeIntro";
import HomeCards from "./HomeCards";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    minWidth: 300,
    width: "100%",
  },
  image: {
    position: "relative",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("xl")]: {
      width: "100% !important", // Overrides inline-style
      height: 550,
    },
  },
  textContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    width: "100%",
    height: "auto",
    backgroundPosition: "center 40%",
  },
  imageTitle: {
    position: "absolute",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
      theme.spacing(1) + 6
    }px`,
  },
  imageSubTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  },
  safetyContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(1.5),
  },
  safetyTitle: {
    fontFamily: theme.typography.fontFamily,
    fontWeight: "bold",
  },
  safetyBody: {
    width: "50%",
    marginTop: theme.spacing(1),
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <div className={classes.image}>
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${homeMainImg})`,
            }}
          />
          <span className={classes.textContainer}>
            <Typography
              component="span"
              variant="h2"
              color="inherit"
              className={classes.imageTitle}
            >
              Welcome to Snark Bean
            </Typography>
            <Typography
              variant="h4"
              color="inherit"
              className={classes.imageSubTitle}
            >
              Our coffee speaks for itself
            </Typography>
          </span>
        </div>
      </div>
      <HomeIntro />
      <div className={classes.safetyContainer}>
        <Typography variant="h5" className={classes.safetyTitle} gutterBottom>
          COVID-19 Safety
        </Typography>
        <div className={classes.safetyBody}>
          <Typography variant="body2" align="center">
            These are interesting times we are in. Please know, the roastery is
            sanitized. Only I touch the equipment and your beans. I wash my
            hands frequently and vigourously. And yes, you can order online.
            Contact via email for at-roastery pick up and we can connect.
            Updates regularly. Thanks and be safe.
          </Typography>
        </div>
      </div>
      <HomeCards />
    </>
  );
}
