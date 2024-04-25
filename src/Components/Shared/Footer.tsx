import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      <div className="footer mt-5 pt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <h5 className="text-uppercase">About Us</h5>
              <p>
                We are a team dedicated to providing the best service. Our goal
                is to meet and exceed your expectations.
              </p>
            </div>
            <div className="col-md-3 col-sm-12">
              <h5 className="text-uppercase">Services</h5>
              <ul className="p-0 footer-list">
                <li>Web Development</li>
                <li>Mobile Applications</li>
                <li>SEO Optimization</li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-12">
              <h5 className="text-uppercase">Contact Us</h5>
              <ul className="p-0 footer-list">
                <li>Email: contact@ourdomain.com</li>
                <li>Phone: +123 456 7890</li>
              </ul>
            </div>
            <div className="col-md-3 col-sm-12">
              <h5 className="text-uppercase ">Follow Us</h5>
              <ul className="p-0 footer-list">
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="row border-top mt-5">
            <div className="col-12 pt-5">
              <p className="text-center">&copy; 2024 Our Company. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
