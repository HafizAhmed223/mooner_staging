import React, { useState, useEffect } from "react";
import { getTokenFunc } from "./../../firebaseInit";
import { adminDeviceRegister } from "./../../redux/actions/notifications/notification.actions";
import { connect } from "react-redux";
const uniqueIdDeviceGenerate = () => {
  var navigator_info = window.navigator;
  var screen_info = window.screen;
  var uid = navigator_info.mimeTypes.length;
  uid += navigator_info.userAgent.replace(/\D+/g, "");
  uid += navigator_info.plugins.length;
  uid += screen_info.height || "";
  uid += screen_info.width || "";
  uid += screen_info.pixelDepth || "";
  return uid;
};
const Notifications = ({ adminDeviceRegister, isAuthenticated, user }) => {
  const [isTokenFound, setTokenFound] = useState(false);
  // To load once
  useEffect(() => {
    let data;

    async function tokenFunc() {
      data = await getTokenFunc(setTokenFound);
      if (data) {
        //("Token is", data);
      }
      if (isAuthenticated && data) {
        const uuid = uniqueIdDeviceGenerate();
        adminDeviceRegister({
          device_id: data,
          serial_no: uuid,
        });
      }
      return data;
    }

    tokenFunc();
  }, [setTokenFound]);

  return <></>;
};

Notifications.propTypes = {};
const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: auth?.isAuthenticated,
    user: auth?.user,
  };
};
export default connect(mapStateToProps, {
  adminDeviceRegister,
})(Notifications);
