import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { clearSnackbar, setSnackbar } from "../../utils/global.actions";

const Permissions = ({ page }) => {
  const location = useLocation;
  const dispatch = useDispatch();
  const history = useHistory();
  const role = localStorage.getItem("role");
  // const [isAllowed, setIsAllowed] = useState(false);
  const all_permissions = JSON.parse(localStorage.getItem("all_permissions"));
  let isAllowed = false;
  useEffect(() => {
    if (role == "Sub_Admin") {
      all_permissions?.map((item) => {
        if (item?.codename == page) {
          //("route matching", item?.codename, page);
          // setIsAllowed(true);
          isAllowed = true;
        }
      });
      //("isAllowed", isAllowed);
      if (!isAllowed) {
        //("other");
        // debugger
        dispatch(clearSnackbar());
        setTimeout(() => {
          dispatch(
            setSnackbar(
              "Sorry, You Are Not Allowed to Access This Page",
              "error"
            )
          );
        }, 200);

        history.goBack();
        // alert("You do not have permissions to visit the page");

        //("Route Not Allowed");
      }
    }
  }, []);

  return <></>;
};

export default Permissions;
