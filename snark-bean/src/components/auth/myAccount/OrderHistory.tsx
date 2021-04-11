import { createStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) =>
  createStyles({
    title: {
      fontFamily: theme.typography.fontFamily,
      marginTop: theme.spacing(1.5),
    },
  })
);

export default function OrderHistory() {
  const classes = useStyles();
  return (
    <Typography
      variant="h5"
      align="center"
      gutterBottom
      className={classes.title}
    >
      You haven't placed any orders yet
    </Typography>
  );
}
