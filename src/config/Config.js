
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBMwXWzORbbdfYqeEcoS55pnu-c7ebbhjo",
  authDomain: "fittrack-4ccfd.firebaseapp.com",
  projectId: "fittrack-4ccfd",
  storageBucket: "fittrack-4ccfd.appspot.com",
  messagingSenderId: "331615322910",
  appId: "1:331615322910:web:af63e80fb125a2dcaaff0f",
  measurementId: "G-B66011ZRKH"
};


export const app = initializeApp(firebaseConfig);
