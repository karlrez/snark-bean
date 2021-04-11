import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home/Home";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ResetPassword from "./components/auth/resetPassword/ResetPassword";
import NewPassword from "./components/auth/resetPassword/NewPassword";
import ContactMain from "./components/contact/ContactMain";
import Shop from "./components/shop/Shop";
import BlogMain from "./components/blog/BlogMain";
import BlogView from "./components/blog/BlogView";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import MyAccount from "./components/auth/myAccount/MyAccount";
import { isTokenValid } from "./components/auth/AuthCommon";
import PrivacyPolicy from "./components/footer/pages/PrivacyPolicy";
import RefundPolicy from "./components/footer/pages/RefundPolicy";
import ShippingPolicy from "./components/footer/pages/ShippingPolicy";
import Terms from "./components/footer/pages/Terms";

export default function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/shop/:param?" component={Shop} />
      <Route path="/blog" exact component={BlogMain} />
      <Route path="/blog/view/:title" exact component={BlogView} />
      <Route
        path="/signIn"
        render={() => {
          if (isTokenValid()) return <Redirect to="/myAccount" />;
          else return <SignIn />;
        }}
      />
      <Route path="/signUp" component={SignUp} />
      <Route path="/resetPassword" component={ResetPassword} />
      <Route path="/newPassword" component={NewPassword} />
      <Route
        path="/myAccount"
        render={() => {
          if (!isTokenValid()) return <Redirect to="/signIn" />;
          else return <MyAccount />;
        }}
      />
      <Route path="/contact" component={ContactMain} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/privacy-policy" exact component={PrivacyPolicy} />
      <Route path="/refund-policy" exact component={RefundPolicy} />
      <Route path="/shipping-policy" exact component={ShippingPolicy} />
      <Route path="/terms" exact component={Terms} />
    </Switch>
  );
}
