import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Checkbox from "@material-ui/core/Checkbox";
import NestedMenu from "./NestedMenu";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

interface Item {
  item: string;
}

interface Props {
  menuItems: any;
  filterVal: any;
  setFilterVal: any;
  checkBoxHandleClick: (value: string) => void;
}

export default function NestedList(props: Props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  let menuItems = null;
  if (props.menuItems.items) {
    menuItems = props.menuItems.items.map((item: Item["item"]) => {
      return (
        <ListItem button className={classes.nested} key={item}>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={props.filterVal === item.toLowerCase()}
              tabIndex={-1}
              disableRipple
              onClick={() => props.checkBoxHandleClick(item.toLowerCase())}
            />
          </ListItemIcon>
          <ListItemText primary={item} />
        </ListItem>
      );
    });
  } else {
    if (props.menuItems.nestedItems) {
      menuItems = Object.entries(props.menuItems.nestedItems).map(
        ([key, value]) => {
          const items: Props["menuItems"] = {
            heading: key,
            items: value,
          };
          return (
            <ListItem>
              <NestedMenu
                menuItems={items}
                filterVal={props.filterVal}
                setFilterVal={props.setFilterVal}
                checkBoxHandleClick={props.checkBoxHandleClick}
              />
            </ListItem>
          );
        }
      );
    }
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary={props.menuItems.heading} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding></List>
        {menuItems}
      </Collapse>
    </List>
  );
}
