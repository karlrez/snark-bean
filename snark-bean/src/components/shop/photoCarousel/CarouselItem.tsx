import React from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";
import CoffeeMap from "./samplePics/coffeemap_905x.jpg";
import CompareBean from "./samplePics/comparebean.jpg";
import CoffeeBeans from "./samplePics/coffeebeans.jpg";
import CoffeeGarden from "./samplePics/coffeegarden.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      minWidth: 300,
      width: "100%",
    },
    image: {
      // TODO: MAKE IMAGE NOT BLURRY
      position: "relative",
      height: "100%",
      width: "100%",
      [theme.breakpoints.down("xl")]: {
        width: "100% !important", // Overrides inline-style
        height: 400,
      },
      "&:hover, &$focusVisible": {
        zIndex: 1,
        "& $imageBackdrop": {
          opacity: 0.15,
        },
        "& $imageMarked": {
          opacity: 0,
        },
        "& $imageTitle": {
          border: "4px solid currentColor",
        },
      },
    },
    focusVisible: {},
    imageButton: {
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
    imageBackdrop: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create("opacity"),
    },
    imageTitle: {
      position: "relative",
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${
        theme.spacing(1) + 6
      }px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: "absolute",
      bottom: -2,
      left: "calc(50% - 9px)",
      transition: theme.transitions.create("opacity"),
    },
  })
);

interface Props {
  item: {
    title: string;
    image: string;
    href: string;
  };
}

export default function ButtonBases(props: Props) {
  const classes = useStyles();

  // TODO: Delete this after we get photo api
  let photo = CoffeeBeans;
  switch (props.item.image) {
    case "2":
      photo = CoffeeGarden;
      break;
    case "3":
      photo = CompareBean;
      break;
    case "4":
      photo = CoffeeMap;
      break;
    default:
      break;
  }

  return (
    <div className={classes.root}>
      <ButtonBase
        focusRipple
        className={classes.image}
        focusVisibleClassName={classes.focusVisible}
        href={props.item.href}
      >
        <span
          className={classes.imageSrc}
          style={{
            backgroundImage: `url(${photo})`, // TODO: should get url from api
          }}
        />
        <span className={classes.imageBackdrop} />
        <span className={classes.imageButton}>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            className={classes.imageTitle}
          >
            {props.item.title}
            <span className={classes.imageMarked} />
          </Typography>
        </span>
      </ButtonBase>
    </div>
  );
}
