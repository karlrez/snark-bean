import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NestedMenu from "./NestedMenu";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterButton: {
      color: "white",
    },
  })
);

interface Props {
  filterVal: any;
  setFilterVal: any;
  nestedMenu: any;
}

//TODO: Link this state to the products array
export default function SimpleMenu(props: Props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkboxHandleClick = (value: string) => {
    if (props.filterVal === value) props.setFilterVal("");
    else props.setFilterVal(value);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.filterButton}
      >
        Filter
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NestedMenu
          menuItems={props.nestedMenu["roast"]}
          filterVal={props.filterVal}
          setFilterVal={props.setFilterVal}
          checkBoxHandleClick={checkboxHandleClick}
        />
        <NestedMenu
          menuItems={props.nestedMenu["regions"]}
          filterVal={props.filterVal}
          setFilterVal={props.setFilterVal}
          checkBoxHandleClick={checkboxHandleClick}
        />
        <MenuItem>
          <Checkbox
            edge="start"
            checked={props.filterVal === "blend"}
            tabIndex={-1}
            disableRipple
            onClick={() => checkboxHandleClick("blend")}
          />
          Blends
        </MenuItem>
        <MenuItem>
          <Checkbox
            edge="start"
            checked={props.filterVal === "flight"}
            tabIndex={-1}
            disableRipple
            onClick={() => checkboxHandleClick("flight")}
          />
          Sample Packs
        </MenuItem>
        <MenuItem>
          <Checkbox
            edge="start"
            checked={props.filterVal === "gift card"}
            tabIndex={-1}
            disableRipple
            onClick={() => checkboxHandleClick("gift card")}
          />
          Gift Cards
        </MenuItem>
      </Menu>
    </div>
  );
}
