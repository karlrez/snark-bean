import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { CardMedia, makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { BlogArticle } from "./BlogCommon";

interface Props {
  blogArticle: BlogArticle;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 270,
    width: 325,
  },
  cardMedia: {
    height: "150px",
  },
  title: {
    marginTop: theme.spacing(0.7),
  },
  typographyContainer: {
    display: "flex",
    textAlign: "center",
    flexFlow: "column wrap",
  },
}));

export default function BlogCard(props: Props) {
  const classes = useStyles();
  const history = useHistory();

  // formatting date
  let dateObj = new Date(props.blogArticle.publishedAt);
  let month = dateObj.toLocaleString("default", { month: "long" });
  let day = props.blogArticle.publishedAt.substring(5, 7);
  let year = props.blogArticle.publishedAt.substring(0, 4);
  let date = `${month} ${day}, ${year}`;

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => history.push(`/blog/view/${props.blogArticle.title}`)}
      >
        <CardMedia
          className={classes.cardMedia}
          image={props.blogArticle.image.originalSrc}
          title="Click for more info"
        />
        <CardContent className={classes.typographyContainer}>
          <Typography variant="caption" align="left" gutterBottom>
            {date}
          </Typography>
          <Typography
            className={classes.title}
            variant="h5"
            align="left"
            gutterBottom
          >
            {props.blogArticle.title.length < 37
              ? props.blogArticle.title
              : props.blogArticle.title.substring(0, 36) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
