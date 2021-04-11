import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

//Loading data display
const CustomLinearProgress = withStyles((theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
      width: "80%",
      marginLeft: "5.5%",
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[200],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.primary.light,
    },
  })
)(LinearProgress);
export default CustomLinearProgress;

const useStylesCustomProgress = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginLeft: "5.5%",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  top: {
    color: theme.palette.primary.light,
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  circle: {
    strokeLinecap: "round",
  },
}));

export function CustomCircularProgress(props: CircularProgressProps) {
  const classes = useStylesCustomProgress();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={60}
        thickness={8}
        {...props}
      />
    </div>
  );
}
