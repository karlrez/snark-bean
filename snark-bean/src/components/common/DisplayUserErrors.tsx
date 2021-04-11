export default function DisplayUserErrors(errorCode: string) {
  switch (errorCode) {
    case "TAKEN":
      return "This email already exists in our records. Please Sign In, or enter a different email to create a new account";

    case "BAD_DOMAIN":
      return "This email is incorrect, it contains an invalid domain name";

    case "PASSWORD_STARTS_OR_ENDS_WITH_WHITESPACE":
      return "Invalid password input";

    case "TOO_SHORT":
      return "Password is too short (minimum is 5 characters)";

    case "TOO_LONG":
      return "Password is too long (maximum is 40 characters)";

    case "UNIDENTIFIED_CUSTOMER":
      return "No account found with this email";

    default:
      return "Something went wrong";
  }
}
