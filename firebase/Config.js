import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAGjmrRo6k60qESYjoEJRXM-TrC6AIf4oM",
  authDomain: "ostoslista-60845.firebaseapp.com",
  projectId: "ostoslista-60845",
  storageBucket: "ostoslista-60845.appspot.com",
  messagingSenderId: "944164958490",
  appId: "1:944164958490:web:efbdc2eb2bb0f6056bbca3",
  measurementId: "G-ML1B4RHHYZ"
};



const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);


const tuoteluettelo = 'tuoteluettelo';


const fetchProducts = async () => {
  const querySnapshot = await getDocs(collection(firestore, tuoteluettelo));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};


export {
  firestore,
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  deleteDoc,
  doc,
  tuoteluettelo,
  fetchProducts  
};