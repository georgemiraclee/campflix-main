import React from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";

import "./style.scss";

const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div className="footer-content-left">
          <div className="footer-link">
            <a
              href="/"
              className="link"
              onClick={(e) => e.preventDefault()}
            >
              About Campflix
            </a>

            <a
              href="/"
              className="link"
              onClick={(e) => e.preventDefault()}
            >
              Terms of Use
            </a>

            <a
              href="/"
              className="link"
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>

            <a
              href="/"
              className="link"
              onClick={(e) => e.preventDefault()}
            >
              FAQ
            </a>
          </div>

          <div className="footer-copyright">
            <p className="copyright">© 2023 Campflix | George Miracle</p>
          </div>
        </div>

        <div className="footer-content-right">
          <div className="connect-us">
            <p className="connect-text">
              Connect with us
            </p>

            <div className="connect-icons">
              <div className="icon">
                <FaFacebookF size={20} />
              </div>

              <div className="icon">
                <FaTwitter size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
