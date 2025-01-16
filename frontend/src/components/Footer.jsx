import {
  faFacebookSquare,
  faInstagramSquare,
  faTwitterSquare,
  faYoutubeSquare,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-100 pt-14 pb-6">
      <div className="container">
        <div className="flex flex-col md:flex-row flex-wrap items-start justify-between gap-x-10 gap-y-6 pb-4">
          <div className="flex-1 max-w-md w-full">
            <h1 className="logo">The Kitchn.</h1>
            <p className="body-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              quisquam dolor ad id ducimus a.
            </p>
          </div>

          <div>
            <h5 className="heading5">The Kitchn</h5>
            <ul>
              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  About Us
                </a>
              </li>

              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  Careers
                </a>
              </li>

              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  Contact Us
                </a>
              </li>

              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="heading5">Legal</h5>
            <ul>
              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  Terms & Conditions
                </a>
              </li>

              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  Cookies
                </a>
              </li>

              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  Copyright
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="heading5">Follow</h5>
            <ul>
              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  Facebook
                </a>
              </li>

              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  Twitter
                </a>
              </li>

              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  Instagram
                </a>
              </li>

              <li className="footer-item">
                <a className="footer-item-link" href="#">
                  youtube
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr />

        <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-start md:justify-between gap-y-4 pt-6">
          <p className="copyright-text">
            &copy; Developed & Designed by{" "}
            <a className="bg-custom-gradient font-semibold" href="https://krantikumar09.github.io/portfolio-krantikumar/">
              Krantikumar
            </a>{" "}
            with ❤️
          </p>

          <div className="social-icons">
            <FontAwesomeIcon icon={faFacebookSquare} />
            <FontAwesomeIcon icon={faTwitterSquare} />
            <FontAwesomeIcon icon={faInstagramSquare} />
            <FontAwesomeIcon icon={faYoutubeSquare} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
