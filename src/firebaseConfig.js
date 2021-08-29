import firebaseApp from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD06XWPbsFpkF4YXr9nQucQDC1tzw7LWq8",
  authDomain: "capstone-love-thy-neighbour.firebaseapp.com",
  projectId: "capstone-love-thy-neighbour",
  storageBucket: "capstone-love-thy-neighbour.appspot.com",
  messagingSenderId: "803303399662",
  appId: "1:803303399662:web:9b0bc3312c6e39feb913ff",
  measurementId: "G-LM4QEFSSP1",
};

// const db = firebaseApp.firestore();

firebaseApp.initializeApp(firebaseConfig);

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export default firebaseApp;
// export { db };
