import { getApp, getApps,initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDkN7ozH4KloYG8jikwbDlaSevi-x1fxZI",
    authDomain: "dropbox-app-722fb.firebaseapp.com",
    projectId: "dropbox-app-722fb",
    storageBucket: "dropbox-app-722fb.appspot.com",
    messagingSenderId: "672578694994",
    appId: "1:672578694994:web:510bb35b9e7be4ea35948b"
  };

  // Initialize Firebase
const app =getApps().length ? getApp() :initializeApp(firebaseConfig);
const db=getFirestore(app);
// const auth=getAuth(app);
// const functions=getFunctions(app);
const storage=getStorage(app)
export {db,storage};
