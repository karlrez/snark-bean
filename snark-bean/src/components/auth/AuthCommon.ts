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
  accessToken: string;
  expiresAt: string;
}

export interface CreateToken {
  customerAccessTokenCreate: {
    customerUserErrors: CreateCustomerErrors[];
    customerAccessToken: CustomerAccessToken;
  };
}

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

export const isTokenValid = () => { //check if the token is still valid by comparing its expiry date to today's date
  const token: any = JSON.parse(localStorage.getItem("token") as any);
  if (token && token.expiresAt) {
    return new Date(token.expiresAt).getTime() > new Date().getTime();
  }

  return false; //case token is expired
};

export const useTokenValidate = (routeTo: string ) => {
  const history = useHistory();
  useEffect(() => {
    (async () => {
      if (isTokenValid() && routeTo) history.push(routeTo);
      else if(isTokenValid() && !routeTo) console.log("VALID TOKEN EXISTS!!");
      else history.push("signIn");
    })();
  }, [routeTo, history]);
}

