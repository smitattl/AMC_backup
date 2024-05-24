import React from "react";
import footerLogo from "../images/footerLogo.svg";

const Footer = ({}) => {
  return (
    <>
      <app-footer
        _ngcontent-serverapp-c81=""
        _nghost-serverapp-c80=""
        className="ng-star-inserted"
      >
        <footer _ngcontent-serverapp-c80="" className="footer">
          <div _ngcontent-serverapp-c80="" className="container-fluid">
            <div _ngcontent-serverapp-c80="" className="row">
              <div
                _ngcontent-serverapp-c80=""
                className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 footer-top p-0"
              >
                <div
                  _ngcontent-serverapp-c80=""
                  className="footer-image-wrapper d-md-block d-lg-block d-block"
                ></div>
              </div>
            </div>
          </div>
          <div _ngcontent-serverapp-c80="" className="container">
            <div _ngcontent-serverapp-c80="" className="row">
              <div
                _ngcontent-serverapp-c80=""
                className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 footer-middle"
              >
                <div _ngcontent-serverapp-c80="" className="row">
                  <div
                    _ngcontent-serverapp-c80=""
                    className="col-12 col-sm-4 col-md-4 col-lg-6 col-xl-6 col-xxl-6 logo-section"
                  >
                    <a
                      _ngcontent-serverapp-c80=""
                      href="https://www.tatamotors.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-inline-block"
                    >
                      <img
                        _ngcontent-serverapp-c80=""
                        alt="Tata Motors"
                        className="footer-logo"
                        src={footerLogo}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div
                _ngcontent-serverapp-c80=""
                className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 footer-bottom"
              >
                <div _ngcontent-serverapp-c80="" className="row">
                  <div
                    _ngcontent-serverapp-c80=""
                    className="col-6 col-sm-6 col-md-3 col-lg-4 col-xl-4 col-xxl-4 order-1 order-md-1"
                  ></div>
                  <div
                    _ngcontent-serverapp-c80=""
                    className="col-12 col-sm-12 col-md-5 col-lg-4 col-xl-4 col-xxl-4 text-left text-md-center copy-right order-3 order-md-2"
                  >
                    <span
                      style={{
                        fontFamily: "sans serif",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "700",
                      }}
                    >
                      ©
                    </span>
                    2024 Tata Motors. All Rights Reserved.{" "}
                  </div>
                  <div
                    _ngcontent-serverapp-c80=""
                    className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-4 col-xxl-4 text-center text-md-end order-2 order-md-3"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </app-footer>
    </>
  );
};

export default Footer;
