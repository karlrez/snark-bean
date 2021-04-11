import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import AccountForm from "./AccountForm";

//THIS PIECE OF CODE IS EXPERIMENTAL*********
// interface Address {
//   id: string;
//   firstName: string;
//   lastName: string;
//   address1: string;
//   city: string;
//   company: string;
//   provinceCode: string;
// }
// interface Node {
//   node: Address;
// }

// interface CustomerAddresses {
//   customer: {
//     addresses: {
//       edges: Node[];
//     };
//   };
// }

// const GET_CUSTOMER_ADDRESSES = gql`
//   query customer($after: Int!, $customerAccessToken: String!) {
//     customer(customerAccessToken: $customerAccessToken) {
//       addresses {
//         edges {
//           node {
//             id
//             firstName
//             lastName
//             address1
//             city
//             company
//             provinceCode
//           }
//         }
//       }
//     }
//   }
// `;

export default function AccountDetails() {
  //****** THIS PIECE OF CODE IS EXPERIMENTAL */
  // const { loading, error, data } = useQuery<
  //   CustomerAddresses,
  //   { first: number; customerAccessToken: string }
  // >(GET_CUSTOMER_ADDRESSES, {
  //   variables: {
  //     first: 10,
  //     customerAccessToken: JSON.parse(localStorage.getItem("token") as any)
  //       .accessToken,
  //   },
  // });

  // if (data && data.customer) {
  //   console.log("HERE ", data.customer);
  // }
  // if (error) console.log("ERROR!!1", error);
  return (
    <>
      <AccountForm />
    </>
  );
}
