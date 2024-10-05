
import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getDatabase } from "firebase/database"


const firebaseConfig = {
  apiKey: "AIzaSyA6TNbUJtaPr5guXHLXp308OkKxSUjV4L4",
  authDomain: "chelseastore-b7d61.firebaseapp.com",
  projectId: "chelseastore-b7d61",
  storageBucket: "chelseastore-b7d61.appspot.com",
  messagingSenderId: "821591375527",
  appId: "1:821591375527:web:388d18ed543ad7c9a6a582",
  databaseUrl: "https://chelseastore-b7d61-default-rtdb.firebaseio.com/"
};


const firebase = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebase,{
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const dbRealTime = getDatabase(firebase);