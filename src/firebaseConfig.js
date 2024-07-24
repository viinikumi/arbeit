import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase-konfiguraatio
const firebaseConfig = {
  apiKey: "AIzaSyCoPYss0jsMH3q9PDzzMmABAfhy125Yf2Q",
  authDomain: "sikala-d0060.firebaseapp.com",
  databaseURL:
    "https://sikala-d0060-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sikala-d0060",
  storageBucket: "sikala-d0060.appspot.com",
  messagingSenderId: "881281568551",
  appId: "1:881281568551:web:841dbebb613333c9dbe302",
};

// Tarkista, onko sovellus jo alustettu
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
