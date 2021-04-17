import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import BlogSearch from "./BlogSearch";
import BlogCard from "./BlogCard";
import {
  BlogArticle,
  GET_BLOG_ARTICLES,
  RESULTS_PER_PAGE,
  GET_BLOG_ARTICLES_COUNT,
  Param,
} from "./BlogCommon";
import { useQuery } from "@apollo/client";

import ProgressBar from "../common/CustomProgressbar";
import Pagination from "../common/Pagination";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    margin: theme.spacing(0.1, 0, 0.1),
  },
  toolBarContainer: {
    display: "flex",
    width: "60%",
    flexGrow: 1,
  },
  toolBarLinks: {
    color: theme.palette.background.paper,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.background.default,
      cursor: "pointer",
    },
    textTransform: "uppercase",
    fontWeight: "bold",
    marginRight: "1.7%",
  },
  toolBarLinksSelected: {
    color: theme.palette.background.paper,
    textDecoration: "underline",
    "&:hover": {
      color: theme.palette.background.default,
      cursor: "pointer",
    },
    textTransform: "uppercase",
    fontWeight: "bold",
    marginRight: "1.7%",
  },
  search: {
    width: "20%",
  },
  grid: {
    maxWidth: "100%",
    margin: "auto",
  },
}));

type Labels = {
  text: string;
  onSelect: () => void;
};

export default function BlogMain() {
  const classes = useStyles();
  const labelList: Labels[] = [
    {
      text: "Latest",
      onSelect: () => {
        setLabelSelection("Latest");
        setSearchInput("");
      },
    },
    {
      text: "Sustainability",
      onSelect: () => {
        setLabelSelection("Sustainability");
        setSearchInput("");
      },
    },
    {
      text: "What Affects Coffee Flavour",
      onSelect: () => {
        setLabelSelection("What Affects Coffee Flavour");
        setSearchInput("");
      },
    },
    {
      text: "Impress Your Friends",
      onSelect: () => {
        setLabelSelection("Impress Your Friends");
        setSearchInput("");
      },
    },
  ];
  const [labelSelection, setLabelSelection] = React.useState<string>("Latest");
  const { loading, data, fetchMore } = useQuery(GET_BLOG_ARTICLES, {
    variables: { first: RESULTS_PER_PAGE, query: null, after: null },
  });
  const { loading: loading2, data: data2, fetchMore: fetchMore2 } = useQuery(
    GET_BLOG_ARTICLES_COUNT,
    {
      variables: { first: 250, query: null, after: null },
    }
  );
  const [searchInput, setSearchInput] = React.useState("");
  const [pageNum, setPageNum] = React.useState(1);
  const [blogList, setBlogList] = React.useState<Array<BlogArticle>>();
  const { param } = useParams<Param>();

  useEffect(() => {
    if (param === "what-affects-coffee-flavour")
      setLabelSelection("What Affects Coffee Flavour");
  }, []);

  // Fetch again for search bar
  useEffect(() => {
    const updateQuery = (previousResult: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult.articles.edges) return;
      return { ...fetchMoreResult };
    };

    if (data && fetchMore) {
      const first = RESULTS_PER_PAGE * pageNum;
      let query = searchInput;

      fetchMore({ updateQuery, variables: { first, query } });
    }
  }, [data, searchInput, labelSelection, pageNum]);

  // To get total number of items. Wont work if there are more than 250 items
  // TODO: We would want to keep fetching and merging data until hasNextPage: false.
  // However, that wont work with searchFilter because we want to overwrite the previous data
  useEffect(() => {
    // To merge new data
    const updateQuery = (previousResult: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult.articles.edges) return;
      return { ...fetchMoreResult };
    };

    if (data2 && fetchMore2) {
      const first = 250;
      let query = searchInput;
      fetchMore2({ updateQuery, variables: { first, query } });
    }
  }, [data2, searchInput]);

  // This enables filtering when clicking the blog tabs
  // TODO: Ask Kim to add tags to the blogs so we can Filter by "Tag" in the querie
  // TODO: This only is sorting blog we have loaded, so wont work if pagination is set to a lower number
  useEffect(() => {
    if (data) {
      let dataCopy = [...data.articles.edges];
      var blogs: String[] = [];

      switch (labelSelection) {
        case "Latest":
          break;
        case "Sustainability":
          blogs = [
            "Snark Supports!",
            "Coffee Certifications",
            "It's All About the Bag",
          ];
          dataCopy = dataCopy.filter((article) =>
            blogs.includes(article.node.title)
          );
          break;
        case "What Affects Coffee Flavour":
          blogs = ["How It's Roasted", "Where It Grows", "Roast Levels"];
          dataCopy = dataCopy.filter((article) =>
            blogs.includes(article.node.title)
          );
          break;
        case "Impress Your Friends":
          blogs = [
            "How to Make the Perfect French Press",
            "Which Has More Caffeine",
            "Robusta vs. Arabica",
          ];
          dataCopy = dataCopy.filter((article) =>
            blogs.includes(article.node.title)
          );
          break;
        default:
      }

      setBlogList(
        dataCopy.map((blog: any) => {
          return {
            id: blog.node.id,
            title: blog.node.title,
            url: blog.node.url,
            handle: blog.node.handle,
            publishedAt: blog.node.publishedAt,
            image: blog.node.image,
            contentHtml: blog.node.contentHtml,
          };
        })
      );
    }
  }, [data, labelSelection, searchInput]);

  const onSearchInputChange = (value: string) => {
    setLabelSelection("Latest");
    setSearchInput(value);
    setPageNum(1);
  };

  const onPaginationClick = (event: Object, page: number) => {
    setPageNum(page); // changing to trigger the useEffect
  };

  return (
    <>
      {console.log(blogList)}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.toolBarContainer}>
            <>
              {labelList.map((label, index) => {
                const { text, onSelect } = label;
                return (
                  <div
                    className={
                      label.text === labelSelection
                        ? classes.toolBarLinksSelected
                        : classes.toolBarLinks
                    }
                    onClick={onSelect}
                    key={index}
                  >
                    <Typography variant="subtitle2"> {text} </Typography>
                  </div>
                );
              })}
            </>
          </div>
          <div className={classes.search}>
            <BlogSearch
              searchInput={searchInput}
              onSearchInputChange={onSearchInputChange}
            />
          </div>
        </Toolbar>
      </AppBar>
      {loading || loading2 ? <ProgressBar color="primary" /> : null}
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={6}
        className={classes.grid}
      >
        {blogList &&
          blogList.map((blog: any, index: any) => {
            return (
              <Grid key={index} item>
                <BlogCard blogArticle={blog} />
              </Grid>
            );
          })}
      </Grid>

      {blogList && blogList.length === 0 ? (
        <Typography variant={"h5"} align={"center"}>
          Search returned no results
        </Typography>
      ) : null}

      <Pagination
        onPaginationClick={onPaginationClick}
        resultsPerPage={RESULTS_PER_PAGE}
        totalItems={data2 ? data2.articles.edges.length : 0}
        page={pageNum}
      />
    </>
  );
}
