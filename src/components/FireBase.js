import Fader from "./Fader";
import React, { useState, useEffect } from "react";
import Notifications from "./Notifications/Notifications";
import ReactNotificationComponent from "./Notifications/ReactNotification";
import { onMessageListener } from "../firebaseInit";
import { getAllNotification } from "./../redux/actions/notifications/notification.actions";
import { connect } from "react-redux";

function FireBase({ getAllNotification }) {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  //(show, notification);
  useEffect(() => {
    //("ssss");
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then(function (registration) {
          //("Registration successful, scope is:", registration.scope);
        })
        .catch(function (err) {
          //("Service worker registration failed, error:", err);
        });
    }
    onMessageListener()
      .then((payload) => {
        setShow(true);
        setNotification({
          title: payload?.data?.topic || "not found topic",
          body: payload?.data?.body || "not found body",
        });
        getAllNotification();
        //(payload);
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  return (
    <span className="notification">
      {show ? (
        <ReactNotificationComponent
          title={notification.title}
          body={notification.body}
        />
      ) : (
        <></>
      )}
      <Notifications />
      <Fader></Fader>
    </span>
  );
}
const mapStateToProps = ({}) => {
  return {};
};

export default connect(mapStateToProps, {
  getAllNotification,
})(FireBase);
