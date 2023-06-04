import { collection, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";
import { db, getDocs } from "./index";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const defaultImage =
  "https://cdn-icons-png.flaticon.com/512/172/172163.png?w=1060&t=st=1685898434~exp=1685899034~hmac=2393d148d8b958f879febf24604dcf3057b40087afab520ec7bd8635c8d2b2e8";

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
    const docRef = doc(db, "users", user.uid); // Reference to a document with ID of user's uid
    await setDoc(docRef, user); // Set the document with ID of user's uid with the user's data
    console.log("Document written with ID: ", user.uid); // Now it's user's uid
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const uploadProfilePic = async (uid, file) => {
  // Create a storage reference with the file name
  const storage = getStorage();
  const storageRef = ref(storage, `profile-pics/${uid}`);

  // Upload the file to Firebase Storage
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // You can handle progress here if you want to show progress bar while uploading
    },
    (error) => {
      console.log(error);
    },
    async () => {
      // Once the upload is complete, get the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      // Update the user document with the new photoURL
      const userDocRef = doc(db, "users", uid);
      await updateDoc(userDocRef, {
        photoURL: downloadURL,
      });

      // Update the local storage user object with new photoURL
      let user = JSON.parse(localStorage.getItem("user"));
      user.photoURL = downloadURL;
      localStorage.setItem("user", JSON.stringify(user));

      window.location.reload(); // Reload the page to reflect the change in UI
    }
  );
};

export {
  addItemToFirestore,
  getItemFromFirestore,
  addUserToFirestore,
  uploadProfilePic,
  defaultImage,
};
