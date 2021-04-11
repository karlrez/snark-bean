import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import {
  fade,
  makeStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";

/**TODO: *****This code is taken directly from SearchBar.tsx in Shop folder, in Sprint 2 look to
 * potentially implement a single SearchBar component shared between Blog and
 * Shop ************
 **/
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: "relative",
      width: "80%",
      float: "right",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      overflow: "hidden",
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

interface Props {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
}

export default function SearchBar(props: Props) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.search}>
        <SearchIcon />

        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={props.searchInput}
          onChange={(event) => props.onSearchInputChange(event.target.value)}
        />
      </div>
    </>
  );
}