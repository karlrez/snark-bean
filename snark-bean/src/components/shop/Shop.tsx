import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import Carousel from "./photoCarousel/PhotoCarousel";
import ShopAppBar from "./shopAppBar/ShopAppBar";
import ShopItem from "./ShopItem";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Pagination from "../common/Pagination";
import ProgressBar from "../common/CustomProgressbar";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ProductsList,
  RESULTS_PER_PAGE,
  GET_PRODUCTS_COUNT,
  GET_PRODUCTS,
  Param,
} from "./ShopCommon";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: "100%",
      margin: "auto",
    },
    gridItem: {
      width: "100px",
    },
  })
);

export default function Shop() {
  const classes = useStyles();
  const { loading, data, fetchMore } = useQuery<ProductsList>(GET_PRODUCTS, {
    variables: { first: RESULTS_PER_PAGE, after: null },
  });
  const [pageNum, setPageNum] = React.useState(1);
  const {
    loading: loading2,
    data: data2,
    fetchMore: fetchMore2,
  } = useQuery<ProductsList>(GET_PRODUCTS_COUNT, {
    variables: { first: 250, after: null, query: null },
  });

  const [filterVal, setFilterVal] = React.useState("");
  const [searchInput, setSearchInput] = React.useState("");
  const [nestedMenu] = React.useState({
    roast: {
      heading: "Roast Level",
      items: ["Light Roast", "Medium Roast", "Dark Roast"],
    },
    regions: {
      heading: "Regions",
      nestedItems: {
        "Central America": [
          "Honduras",
          "Costa Rica",
          "Guatemala",
          "Nicaragua",
          "Mexico",
        ],
        "South America": ["Peru"],
        Africa: ["Tanzania", "Ethiopia", "Rwanda"],
        Asia: ["Sumatra"],
      },
    },
    blends: {
      heading: "Blends",
      items: ["Ambrosia", "Snark Dark", "Snark Brunette"],
    },
  });
  const { param } = useParams<Param>();

  // set filter or show alert based on url param
  useEffect(() => {
    if (param === "flights") setFilterVal("flight");
    if (param === "gift-cards") setFilterVal("gift card");
    if (param === "light-roast") setFilterVal("light roast");
    if (param === "medium-roast") setFilterVal("medium roast");
    if (param === "dark-roast") setFilterVal("dark roast");
    if (param === "alert") notify();
  }, []);

  // To load more results for pagination
  useEffect(() => {
    // To merge new data for pagination
    const updateQuery = (previousResult: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult.products.edges) return;

      const previousEdges = previousResult.products.edges;
      const fetchMoreEdges = fetchMoreResult.products.edges;
      fetchMoreResult.products.edges = [...previousEdges, ...fetchMoreEdges];
      return { ...fetchMoreResult };
    };

    if (data && fetchMore) {
      const nextPage = data.products.pageInfo.hasNextPage;
      const first = RESULTS_PER_PAGE;
      const after = data.products.edges[data.products.edges.length - 1].cursor;
      let query = filterVal;
      if (searchInput) query = searchInput;

      if (nextPage && after !== null) {
        fetchMore({ updateQuery, variables: { first, after, query } });
      }
    }
  }, [pageNum]);

  // Query again when filter or search input is applied
  useEffect(() => {
    // To merge new data for pagination
    const updateQuery = (previousResult: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult.products.edges) return;
      const fetchMoreEdges = fetchMoreResult.products.edges;
      fetchMoreResult.products.edges = [...fetchMoreEdges];
      return { ...fetchMoreResult };
    };

    if (data && fetchMore) {
      const first = RESULTS_PER_PAGE;
      const after = null;
      let query = filterVal;
      if (searchInput) query = searchInput;

      fetchMore({ updateQuery, variables: { first, after, query } });
    }
  }, [data, filterVal, searchInput]);

  // To get total number of items. Wont work if there are more than 250 items
  useEffect(() => {
    // To merge new data
    const updateQuery = (previousResult: any, { fetchMoreResult }: any) => {
      if (!fetchMoreResult.products.edges) return;
      return { ...fetchMoreResult };
    };

    if (data2 && fetchMore2) {
      const after = null;
      let query = filterVal;
      if (searchInput) query = searchInput;

      fetchMore2({ updateQuery, variables: { after, query } });
    }
  }, [data2, searchInput, filterVal]);

  const onPaginationClick = (event: Object, page: number) => {
    if (!data || data.products.edges.length > page * RESULTS_PER_PAGE) {
      return;
    }
    setPageNum(page); // changing to trigger the useEffect
  };

  // Method to split an array into groups (using to make rows of three)
  const chunkArrayInGroups = (arr: any[], size: number) => {
    var myArray = [];
    for (var i = 0; i < arr.length; i += size) {
      myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  };

  let itemCards: any;
  if (data) {
    var index = 0;
    itemCards = chunkArrayInGroups(data.products.edges, 3).map((row) => {
      return (
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={8}
          className={classes.root}
          key={data.products.edges[index].id} // TODO: warning for key still showing up
        >
          <Grid item>{row[0] ? <ShopItem item={row[0]} /> : null}</Grid>
          <Grid item>{row[1] ? <ShopItem item={row[1]} /> : null}</Grid>
          <Grid item>{row[2] ? <ShopItem item={row[2]} /> : null}</Grid>
        </Grid>
      );
    });
  }

  const notify = () =>
    toast.info("Please complete checkout opened on the new tab", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      {console.log(filterVal)}
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>

      <Carousel />
      <ShopAppBar
        numItems={data ? data.products.edges.length : 0}
        totalItems={data2 ? data2.products.edges.length : 0}
        filterVal={filterVal}
        setFilterVal={setFilterVal}
        nestedMenu={nestedMenu}
        setSearchInput={setSearchInput}
      />
      {loading || loading2 ? <ProgressBar color="primary" /> : null}
      {itemCards}
      <Pagination
        onPaginationClick={onPaginationClick}
        resultsPerPage={RESULTS_PER_PAGE}
        totalItems={data2 ? data2.products.edges.length : 0}
        page={pageNum}
      />
    </>
  );
}
