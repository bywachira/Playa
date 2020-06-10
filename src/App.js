import React from "react";
import { messaging } from "./init-fcm";
import { compose, lifecycle, withHandlers, withState } from "recompose";

const renderNotification = (notification, i) => <li key={i}>{notification}</li>;

const registerPushListener = (pushNotification) =>
  navigator.serviceWorker.addEventListener("message", ({ data }) => {
    pushNotification(
      data.data
        ? displayNotification(data.data.message)
        : data["firebase-messaging-msg-data"].data.message
    );
  });

const displayNotification = (message) => {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      const options = {
        body: message,
        icon:
          "https://res.cloudinary.com/duoxba7n1/image/upload/v1591818231/playalogo.png",
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
        actions: [
          {
            action: "explore",
            title: "Explore this new world",
            icon: "images/checkmark.png",
          },
          {
            action: "close",
            title: "Close notification",
            icon: "images/xmark.png",
          },
        ],
      };
      return reg.showNotification("Playa", options);
    });
  }
};

const App = ({ token, notifications }) => (
  <>
    <h1>React + Firebase Cloud Messaging (Push Notifications)</h1>
    <div>
      Current token is: <p>{token}</p>
    </div>
    <ul>
      Notifications List:
      {notifications.map(renderNotification)}
    </ul>
  </>
);

export default compose(
  withState("token", "setToken", ""),
  withState("notifications", "setNotifications", []),
  withHandlers({
    pushNotification: ({ setNotifications, notifications }) => (
      newNotification
    ) => setNotifications(notifications.concat(newNotification)),
  }),
  lifecycle({
    async componentDidMount() {
      const { pushNotification, setToken } = this.props;

      messaging
        .requestPermission()
        .then(async function () {
          const token = await messaging.getToken();
          setToken(token);
        })
        .catch(function (err) {
          console.log("Unable to get permission to notify.", err);
        });

      registerPushListener(pushNotification);
    },
  })
)(App);
