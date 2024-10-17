import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {

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