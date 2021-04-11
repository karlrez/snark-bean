import { gql } from "@apollo/client";

export interface BlogArticleData {
  articles: edges[];
}

export interface edges {
  node: BlogArticle;
}

export interface BlogImage {
  id: string;
  altText?: string;
  originalSrc: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  url: string;
  handle: string;
  publishedAt: string; // Format: "2018-03-13T16:31:00Z"
  image: BlogImage;
  contentHtml: string; // this is raw HTML as a string
}

export const RESULTS_PER_PAGE = 20;

export const GET_BLOG_ARTICLES = gql`
  query blogArticles($first: Int!, $after: String, $query: String) {
    articles(first: $first, after: $after, query: $query) {
      edges {
        cursor
        node {
          id
          title
          url
          handle
          publishedAt
          image {
            id
            altText
            originalSrc
          }
          contentHtml
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_SINGLE_ARTICLE = gql`
  query blogArticle($query: String) {
    articles(first: 1, query: $query) {
      edges {
        node {
          id
          title
          url
          handle
          publishedAt
          image {
            id
            altText
            originalSrc
          }
          authorV2 {
            name
          }
          contentHtml
        }
      }
    }
  }
`;

export const GET_BLOG_ARTICLES_COUNT = gql`
  query blogArticles($first: Int!, $after: String, $query: String) {
    articles(first: $first, after: $after, query: $query) {
      edges {
        cursor
        node {
          id
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
