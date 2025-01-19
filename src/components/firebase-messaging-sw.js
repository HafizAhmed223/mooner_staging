// // Scripts for firebase and firebase messaging
// // eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// // eslint-disable-next-line no-undef
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// // Initialize the Firebase app in the service worker by passing the generated config
// const firebaseConfig = {
// 	apiKey: "AIzaSyDUmpEwBHruRI9y6tc5LTXMsmM40oP6OEs",
// 	authDomain: "python-fcm-675b6.firebaseapp.com",
// 	projectId: "python-fcm-675b6",
// 	storageBucket: "python-fcm-675b6.appspot.com",
// 	messagingSenderId: "807735975748",
// 	appId: "1:807735975748:web:e84953c253950adb404111",
// 	measurementId: "G-9LZ2NTV8LG",
// };

// // eslint-disable-next-line no-undef
// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging
// // eslint-disable-next-line no-undef
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
// 	//("Received background message ", payload);

// 	const notificationTitle = payload.notification.title;
// 	const notificationOptions = {
// 		body: payload.notification.body,
// 		icon: "/logo192.png",
// 	};

// 	// eslint-disable-next-line no-restricted-globals
// 	return self.registration.showNotification(
// 		notificationTitle,
// 		notificationOptions
// 	);
// });
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

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
onBackgroundMessage(messaging, (payload) => {
	//(
		"[firebase-messaging-sw.js] Received background message ",
		payload
	);
	// Customize notification here
	const notificationTitle = "Background Message Title";
	const notificationOptions = {
		body: "Background Message body.",
		icon: "/firebase-logo.png",
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
