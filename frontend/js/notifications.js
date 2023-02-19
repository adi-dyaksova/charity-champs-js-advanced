// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgwRpK31I57B0d8Dy434N_SUmW1v0Z0kE",
  authDomain: "charity-champs-ce3db.firebaseapp.com",
  projectId: "charity-champs-ce3db",
  storageBucket: "charity-champs-ce3db.appspot.com",
  messagingSenderId: "14569820132",
  appId: "1:14569820132:web:8164cbb4f7b216c8c601f1",
  measurementId: "G-K4XBMVP6HC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

alert("test")

function notificate(name) {
    if (Notification.permission !== "granted") {
        const notifications = new Notification("Току-що бе публикувана нова кауза!", {
            body: name
        })
    }
    else {
        const notifications = new Notification("Току-що бе публикувана нова кауза!", {
            body: name
        })
    }
}


