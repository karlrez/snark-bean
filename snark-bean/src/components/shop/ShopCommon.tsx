import { gql } from "@apollo/client";

export interface Product {
  title: string;
}

export interface PageInfo {
  hasNextPage: boolean;
}

export interface Nodes {
  cursor: any;
  node: Product;
  id: string;
}

export interface ProductsList {
  products: {
    edges: Nodes[];
    pageInfo: PageInfo;
  };
}

export interface Param {
  param: string;
}

// To set pagination
export const RESULTS_PER_PAGE = 20;

// GraphQL explorer is very handy for creating this queries
// https://shopify.dev/tools/graphiql-admin-api

export const GET_PRODUCTS = gql`
  query products($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      edges {
        node {
          title
          descriptionHtml
          id
          variants(first: 10) {
            edges {
              node {
                id
                image {
                  id
                  altText
                  src
                }
                price
                weight
                weightUnit
              }
            }
          }
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

// Lightweight query to get total count of items
export const GET_PRODUCTS_COUNT = gql`
  query productCount($first: Int!, $after: String, $query: String) {
    products(first: $first, after: $after, query: $query) {
      edges {
        node {
          id
        }
        cursor
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
