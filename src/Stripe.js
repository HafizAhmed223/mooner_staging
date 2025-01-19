import React, { useCallback, useEffect } from "react";
import "./stripe.css";

import { Button, Divider, Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { base_url_auto } from "./utils/global";
export const Stripe = () => {
  const navigate = () => {
    let x = confirm("Please close your browser");
    //("huyy", x);
    if (x) {
      window.close();
      // close();
    }
  };
  // useEffect(() => {
  //   window.open("https://staging.dyi5w05ftgp4q.amplifyapp.com/stripe");
  // }, []);

  return (
    <div>
      <div className="mainDiv">
        <div className="colorDiv">
          <div>
            <div className="header">
              <img
                src={`${base_url_auto}dispute/MicrosoftTeams-image%20(3)2022-03-2505:33:10.021748.png`}
                alt=""
                width="30px"
              />
              <Typography variant="body1">Mooner App Pte Ltd</Typography>
            </div>
            <div className="contentContainer">
              <div className="content">
                <Typography variant="h6">
                  Mooner App Pte Ltd partners with Stripe for secure financial
                  services.
                </Typography>
              </div>
            </div>
            <div
              className="button"
              id="btn"
              // onClick={navigate}
            >
              {/* <ArrowBackIcon />
              <p>Return to Mooner App Pte Ltd</p> */}
              <p>Please close browser to return to the Application</p>
            </div>
          </div>

          <div className="footer">
            <Typography variant="body2">
              Contact Mooner App Pte Ltd for support
            </Typography>
            <Typography variant="body1">
              <span>
                {" "}
                <a href="mailto:name@email.com">admin@mooner.com.sg</a>
              </span>
            </Typography>
            <Typography variant="body1">+65 3158 3286</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
