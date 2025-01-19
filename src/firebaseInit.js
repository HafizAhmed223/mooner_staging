import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk7N8FZInlHEynQLAtncPOBKvzRoHqSIo",
  authDomain: "mooner-1565085512209.firebaseapp.com",
  projectId: "mooner-1565085512209",
  storageBucket: "mooner-1565085512209.appspot.com",
  messagingSenderId: "147153759532",
  appId: "1:147153759532:web:545253d1274c5f5c33d089",
  measurementId: "G-WRP3VJ05JS",
};
const firebase = initializeApp(firebaseConfig);

const messaging = getMessaging(firebase);

const publicKey =
  "BKTwV2D3-M79nJVg9ACN2NWLrbqjL8kSNOMc5yQvbLMIOpIC2w1lHnprFOhkKbh9LQzE8d95X5h6vPoRSR75PHQ";

export const getTokenFunc = async (setTokenFound) => {
  let currentToken = "";
  try {
    currentToken = await getToken(messaging, { vapidKey: publicKey });
    if (currentToken) {
      setTokenFound(true);
    } else {
      setTokenFound(false);
    }
  } catch (error) {
    //("An error occurred while retrieving token.", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
