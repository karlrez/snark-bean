import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "center",
      },
    },
  })
);

interface Props {
  onPaginationClick: (event: Object, page: number) => void;
  resultsPerPage: number;
  totalItems: number;
  page: number;
}

export default function PaginationRounded(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Pagination
        count={Math.ceil(props.totalItems / props.resultsPerPage)}
        shape="rounded"
        disabled={false}
        size={"large"}
        hideNextButton={false}
        hidePrevButton={false}
        onChange={props.onPaginationClick}
        page={props.page}
      />
    </div>
  );
}
