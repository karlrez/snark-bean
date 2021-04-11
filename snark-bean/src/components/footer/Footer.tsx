import "./Footer.css";
import InstagramIcon from "./icons/instagram.png";
import FacebookIcon from "./icons/facebook.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="text-center">
          <h4 className="font-weight-bold">Follow Us</h4>
          <div className="d-flex flex-row justify-content-center">
            <a
              href="https://www.instagram.com/snarkbean/"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img src={InstagramIcon} alt="instagram" />
              </span>
            </a>
            <a
              href="https://www.facebook.com/SnarkBean/"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <img src={FacebookIcon} alt="facebook" />
              </span>
            </a>
          </div>
          <div className="links-div">
            <Link to="privacy-policy" className="link">
              &nbsp;Privacy Policy |
            </Link>
            <Link to="refund-policy" className="link">
              &nbsp;Refund Policy |
            </Link>
            <Link to="shipping-policy" className="link">
              &nbsp;Shipping Policy |
            </Link>
            <Link to="terms" className="link">
              &nbsp;Terms of Service
            </Link>
          </div>
          <p>&copy; Copyright 2021 | Snark Bean</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
