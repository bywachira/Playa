import * as firebase from "firebase/app";
import "firebase/messaging";

const initializedFirebaseApp = firebase.initializeApp({
  messagingSenderId: "328220360109"
});

const messaging = initializedFirebaseApp.messaging();

messaging.usePublicVapidKey(
  "BDRBIdzvf3gWY-755FmCGXDwSzgyPOOSINZVo8w2JwMoQy5FrKkpMzOb_jfBih_4rg3DwDZRVRJ6k1cBpGWvNtI"
);

export { messaging, initializedFirebaseApp };
