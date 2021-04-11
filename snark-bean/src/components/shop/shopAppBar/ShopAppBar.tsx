import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Filter from "./filter/Filter";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      marginTop: "35px",
      textAlign: "center",
    },
    div1: {
      width: "20%",
      textAlign: "left",
    },
    div2: {
      width: "60%",
    },
    div3: {
      width: "20%",
    },
    message: {},
  })
);

interface Props {
  numItems: number;
  totalItems: number;
  filterVal: any;
  setFilterVal: any;
  nestedMenu: any;
  setSearchInput: (value: string) => void;
}

export default function ShopAppBar(props: Props) {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.div1}>
            <Filter
              filterVal={props.filterVal}
              setFilterVal={props.setFilterVal}
              nestedMenu={props.nestedMenu}
            />
          </div>
          <div className={classes.div2}>
            <Typography variant="h6" className={classes.message}>
              {`Showing ${props.numItems} of ${props.totalItems} products`}
            </Typography>
          </div>
          <div className={classes.div3}>
            <SearchBar setSearchInput={props.setSearchInput} />
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}
