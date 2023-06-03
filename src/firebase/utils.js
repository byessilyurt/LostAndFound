import { collection, addDoc } from "firebase/firestore";
import { db, getDocs } from "./index";

const addItemToFirestore = async (item) => {
  try {
    const docRef = await addDoc(collection(db, "items"), item);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getItemFromFirestore = async () => {
  const itemCol = collection(db, "items");
  const itemSnapshot = await getDocs(itemCol);
  const itemList = itemSnapshot.docs.map((doc) => doc.data());
  return itemList;
};

const addUserToFirestore = async (user) => {
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export { addItemToFirestore, getItemFromFirestore, addUserToFirestore };
