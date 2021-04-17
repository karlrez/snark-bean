import { gql } from "@apollo/client";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default interface CreateCustomerErrors {
  code: string;
}

export interface CreateTokenInput {
  email: string;
  password: string;
}

export interface CustomerAccessToken {
  //the structure of the details stored in local storage.
  //After successfully creating a token we store it in local storage
  accessToken: string;
  expiresAt: string;
}

export interface CreateToken {
  //the expected response structure of a successful create token request
  customerAccessTokenCreate: {
    customerUserErrors: CreateCustomerErrors[];
    customerAccessToken: CustomerAccessToken;
  };
}
//Define a mutation for creating a new token
export const CREATE_TOKEN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

export const isTokenValid = () => {
  //check if the token is still valid by comparing its expiry date to today's date
  const token: any = JSON.parse(localStorage.getItem("token") as any); //acces token from local storage
  if (token && token.expiresAt) {
    return new Date(token.expiresAt).getTime() > new Date().getTime(); //compare existing token to today's date
  }

  return false; //case token is expired
};

export const useTokenValidate = (routeTo: string) => {
  //a custom hook that redirects users based on credentials (is their token valid)
  const history = useHistory();
  useEffect(() => {
    (async () => {
      if (isTokenValid() && routeTo) history.push(routeTo);
      else if (isTokenValid() && !routeTo) console.log("VALID TOKEN EXISTS!!");
      else history.push("signIn");
    })();
  }, [routeTo, history]);
};
