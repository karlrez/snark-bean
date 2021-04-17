import React from "react";
import ReactDOM from "react-dom";
import {
  InMemoryCache,
  ApolloClient,
  createHttpLink,
  NormalizedCacheObject,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const httpLink = createHttpLink({
  uri: "https://@snark-roastery.myshopify.com/api/2021-01/graphql.json",
});

const middlewareLink = setContext(() => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/graphql",
    "X-Shopify-Storefront-Access-Token": "/*Insert a access token here*/b",
  },
}));

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
