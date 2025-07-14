import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDcoU78EM4ZgxoxrEK4pki09sGirI2T0rk",
  authDomain: "campusshpere.firebaseapp.com",
  projectId: "campusshpere",
  storageBucket: "campusshpere.firebasestorage.app",
  messagingSenderId: "491395948960",
  appId: "1:491395948960:web:c84c375d2823a82a0f44c5",
  measurementId: "G-Y6Z9BGZ6J2"
};

// Initialize app
const app = initializeApp(firebaseConfig);

// ✅ Export initialized services
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };