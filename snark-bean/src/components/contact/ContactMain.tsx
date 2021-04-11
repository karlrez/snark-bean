import Iframe from "react-iframe";
import Grid from "@material-ui/core/Grid";
import ContactForm from "./ContactForm";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  hiContainer: {
    margin: theme.spacing(0.1, 0, 0.1),
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  hiText: {
    textAlign: "center",
    color: theme.palette.background.paper,
  },
  mapContainer: {
    margin: theme.spacing(0, 0, 0.05),
  },
  avatarContainer: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(4.5, 5, 1),
    },
    justifyContent: "center",
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
  text: {
    textAlign: "center",
  },
}));

export default function Contact() {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.hiContainer} square elevation={3}>
        <Typography className={classes.hiText} variant="h4">
          Come say hi!
        </Typography>
      </Paper>
      <div className={classes.mapContainer}>
        <Iframe
          url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.33104092643!2d-76.33892328421398!3d45.42282774422373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cd18a35a8efc093%3A0xa913e066cc28ed0!2s480c%20McCartney%20St%2C%20Arnprior%2C%20ON%20K7S%200B6!5e0!3m2!1sen!2sca!4v1614238185709!5m2!1sen!2sca"
          width="100%"
          height="420px"
          id="myId"
          className="myClassname"
          display="inline"
          position="relative"
          aria-hidden="false"
        />
      </div>
      <Grid container>
        <Grid item xs={12} md={6}>
          <div className={classes.avatarContainer}>
            <Avatar
              className={classes.avatar}
              alt="Kim Avatar"
              src="https://images.unsplash.com/photo-1525550557089-27c1bfedd06c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            />
          </div>
          <div>
            <Typography className={classes.text} variant="subtitle1">
              Please email me for on-site pickup!
            </Typography>
            <br />
            <Typography className={classes.text} variant="body1">
              480C McCartney St, Arnprior, ON K7S 0B6
            </Typography>
            <Typography className={classes.text} variant="body1">
              kim@snarkbean.com
            </Typography>
            <Typography className={classes.text} variant="body1">
              1 (613) 804-6886
            </Typography>
            <Typography className={classes.text} variant="body1">
              Business Hours: TBA
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactForm />
        </Grid>
      </Grid>
    </>
  );
}
