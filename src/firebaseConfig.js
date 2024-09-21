import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const apikey = import.meta.env.VITE_API_KEY;
const authDomain = import.meta.env.VITE_AUTHHD_FB;
const dataBsUrl = import.meta.env.VITE_DATABS_URL;
const prj_Id = import.meta.env.VITE_PRJ_ID;
const Str_Buc = import.meta.env.VITE_STRBUC;
const MsgId = import.meta.env.VITE_MSG_ID;
const AppId = import.meta.env.VITE_APP_ID;
// Firebase-konfiguraatio
const firebaseConfig = {
  apiKey: apikey,
  authDomain: authDomain,
  databaseURL: dataBsUrl,
  projectId: prj_Id,
  storageBucket: Str_Buc,
  messagingSenderId: MsgId,
  appId: AppId,
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
