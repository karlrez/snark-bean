import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";

type AlertProps = {
  title?: string;
  content: string;
  type: "s" | "e" | "w" | "i";
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  infoTitle: {
    color: theme.palette.secondary.light,
    fontWeight: "bold",
  },
}));

export default function CustomAlert({ title, content, type }: AlertProps) {
  const classes = useStyles();

  switch (type) {
    case "s":
      return (
        <div className={classes.root}>
          <Alert severity="success">
            {title && <AlertTitle>{title}</AlertTitle>}
            {content}
          </Alert>
        </div>
      );

    case "e":
      return (
        <div className={classes.root}>
          <Alert severity="error">
            {title && <AlertTitle>{title}</AlertTitle>}
            {content}
          </Alert>
        </div>
      );

    case "w":
      return (
        <div className={classes.root}>
          <Alert severity="warning">
            {title && <AlertTitle>{title}</AlertTitle>}
            {content}
          </Alert>
        </div>
      );

    case "i":
      return (
        <div className={classes.root}>
          <Alert severity="info">
            {title && (
              <AlertTitle>
                <Typography className={classes.infoTitle}>{title}</Typography>
              </AlertTitle>
            )}
            {content}
          </Alert>
        </div>
      );
  }
}
