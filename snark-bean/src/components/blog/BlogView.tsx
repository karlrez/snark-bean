import React from "react";
import { useParams } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_ARTICLE } from "./BlogCommon";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ProgressBar from "../common/CustomProgressbar";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  selfAvatar: {
    margin: 5,
    //marginRight: "auto",
    width: 40,
    height: 40,
    display: "inline-flex",
  },
  avatar: {
    margin: "auto",
    width: "100%",
    height: "auto",
  },
  author: {
    margin: 5,
    //marginRight: "auto",
    display: "inline-flex",
  },
  avatarContainer: {
    alignItems: "left",
    padding: 0,
  },
  paper: {
    width: "100%",
  },
}));

interface Title {
  title: string;
}

export default function BlogView() {
  const classes = useStyles();
  let { title } = useParams<Title>();
  const { loading, data } = useQuery(GET_SINGLE_ARTICLE, {
    variables: { query: title },
  });

  const createMarkup = () => {
    if (data) return { __html: data.articles.edges[0].node.contentHtml };
  };

  // formatting date
  let date;
  if (data) {
    const dateObj = new Date(data.articles.edges[0].node.publishedAt);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = data.articles.edges[0].node.publishedAt.substring(5, 7);
    const year = data.articles.edges[0].node.publishedAt.substring(0, 4);
    date = `${month} ${day}, ${year}`;
  }

  return (
    <Container className={classes.root} component="main" maxWidth="md">
      {loading ? <ProgressBar color="primary" /> : null}
      <Typography variant="h2" color="primary" align="center">
        {data ? data.articles.edges[0].node.title : null}
      </Typography>

      <Container className={classes.avatarContainer}>
        <Avatar
          className={classes.selfAvatar}
          alt="Kim Avatar"
          src="https://images.unsplash.com/photo-1525550557089-27c1bfedd06c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
        />
        <Typography
          variant="subtitle1"
          color="primary"
          className={classes.author}
        >
          {data ? data.articles.edges[0].node.authorV2.name : null}

          <Typography
            variant="subtitle2"
            color="secondary"
            className={classes.author}
          >
            {date ? "- " + date : null}
          </Typography>
        </Typography>
      </Container>
      <Paper elevation={5} className={classes.paper}>
        <Avatar
          className={classes.avatar}
          variant="rounded"
          alt={data ? data.articles.edges[0].node.handle : "blog handle"}
          src={data ? data.articles.edges[0].node.image.originalSrc : null}
        />
      </Paper>
      <Typography variant="body2" color="primary" component="p">
        {<div dangerouslySetInnerHTML={createMarkup()} />}
      </Typography>
    </Container>
  );
}
