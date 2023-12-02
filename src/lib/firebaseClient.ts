import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseApp, FirebaseOptions } from "@firebase/app-types";

const firebaseConfig = {
  apiKey: "AIzaSyDtLH8lWvNPL4buHgJtdMBg-DmJRY0L9IE",
  authDomain: "split-my-rent.firebaseapp.com",
  projectId: "split-my-rent",
  storageBucket: "split-my-rent.appspot.com",
  messagingSenderId: "1026297968090",
  appId: "1:1026297968090:web:3d51c7efd7cf6ea9823ce3",
  measurementId: "G-18NC1PP4FD",
};

let app: FirebaseApp;
let analytics: Analytics;

// @ts-ignore
if (typeof window !== "undefined" && !app) {
  // @ts-ignore
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
}

export { app, analytics };
