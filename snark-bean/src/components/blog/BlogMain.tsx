import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import BlogSearch from "./BlogSearch";
import BlogCard from "./BlogCard";
import {
  BlogArticle,
  GET_BLOG_ARTICLES,
  RESULTS_PER_PAGE,
  GET_BLOG_ARTICLES_COUNT,
} from "./BlogCommon";
import { useQuery } from "@apollo/client";

import ProgressBar from "../common/CustomProgressbar";
import Pagination from "../common/Pagination";

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
        setLabelSelection("Affects");
        setSearchInput("");
      },
    },
    {
      text: "Impress Your Friends",
      onSelect: () => {
        setLabelSelection("Impress");
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

  useEffect(() => {
    // To merge new data for pagination
    const updateQuery = (previousResult: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult.articles.edges) return;

      const previousEdges = previousResult.articles.edges;
      const fetchMoreEdges = fetchMoreResult.articles.edges;
      fetchMoreResult.articles.edges = [...previousEdges, ...fetchMoreEdges];
      return { ...fetchMoreResult };
    };

    if (data && fetchMore) {
      const nextPage = data.articles.pageInfo.hasNextPage;
      const first = RESULTS_PER_PAGE;
      const after = data.articles.edges[data.articles.edges.length - 1].cursor;
      let query = searchInput;

      if (nextPage && after !== null) {
        fetchMore({ updateQuery, variables: { first, after, query } });
      }
    }
  }, [pageNum]);

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

  // Fetch again for search bar
  useEffect(() => {
    const updateQuery = (previousResult: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult.articles.edges) return;
      return { ...fetchMoreResult };
    };

    if (data && fetchMore) {
      const first = RESULTS_PER_PAGE;
      let query = searchInput;

      fetchMore({ updateQuery, variables: { first, query } });
    }
  }, [searchInput, labelSelection]);

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
        case "Affects":
          blogs = ["How It's Roasted", "Where It Grows", "Roast Levels"];
          dataCopy = dataCopy.filter((article) =>
            blogs.includes(article.node.title)
          );
          break;
        case "Impress":
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

      if (searchInput) {
        dataCopy = dataCopy.filter((article) =>
          article.node.title.toLowerCase().includes(searchInput.toLowerCase())
        );
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
    if (!data || data.articles.edges.length > page * RESULTS_PER_PAGE) {
      return;
    }
    setPageNum(page); // changing to trigger the useEffect
  };

  return (
    <>
      {console.log(data2)}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.toolBarContainer}>
            <>
              {labelList.map((label, index) => {
                const { text, onSelect } = label;
                return (
                  <Link
                    to="/blog"
                    className={classes.toolBarLinks}
                    onClick={onSelect}
                    key={index}
                  >
                    <Typography variant="subtitle2"> {text} </Typography>
                  </Link>
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
        {blogList
          ? blogList.map((blog: any, index: any) => {
              return (
                <Grid key={index} item>
                  <BlogCard blogArticle={blog} />
                </Grid>
              );
            })
          : null}
      </Grid>
      <Pagination
        onPaginationClick={onPaginationClick}
        resultsPerPage={RESULTS_PER_PAGE}
        totalItems={data2 ? data2.articles.edges.length : 0}
        page={pageNum}
      />
    </>
  );
}
