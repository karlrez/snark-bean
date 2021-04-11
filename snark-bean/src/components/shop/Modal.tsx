import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import InfoIcon from "@material-ui/icons/Info";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import OrderModal from "./orderModal/OrderModal";

//TODO: Modal looks wonky on mobile view
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {},
    root: {
      margin: "auto",
      marginTop: 40,
      width: 500,
      maxWidth: "90%",
      maxHeight: "80%",
      alignItems: "center",
      justifyContent: "center",
      overflowY: "auto",
    },
    infoIcon: {
      color: "#64b5f6",
    },
    media: {
      height: 300,
      width: "auto",
    },
    list: {
      listStyle: "none",
    },
    listItem: {
      margin: "5px",
    },
  })
);

interface Props {
  item: any;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  addToCart: (item: any) => void;
}

export default function SimpleModal(props: Props) {
  const classes = useStyles();

  const createMarkup = () => {
    return { __html: props.item.node.descriptionHtml };
  };

  return (
    <div>
      <Tooltip title="Details">
        <InfoIcon onClick={props.handleOpen} className={classes.infoIcon} />
      </Tooltip>

      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card className={classes.root}>
          <CardMedia
            className={classes.media}
            image={props.item.node.variants.edges[0].node.image.src}
            title={props.item.node.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.item.node.title}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              {<div dangerouslySetInnerHTML={createMarkup()} />}
            </Typography>
          </CardContent>

          <CardActions>
            <OrderModal
              showOrderText={true}
              addToCart={props.addToCart}
              item={props.item}
            />
          </CardActions>
        </Card>
      </Modal>
    </div>
  );
}
