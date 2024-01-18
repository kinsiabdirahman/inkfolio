// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzgSwpcrMFBqYD7jJBMJu6vqIUqoVlquo",
  authDomain: "inkfolio-2665a.firebaseapp.com",
  projectId: "inkfolio-2665a",
  storageBucket: "inkfolio-2665a.appspot.com",
  messagingSenderId: "472399981176",
  appId: "1:472399981176:web:be33cef65ba3e566429b8d",
  measurementId: "G-683X0VLWGP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to the entryForm in HTML
const entryForm = document.getElementById("entryForm");

// Event listener for form submission
entryForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get values from the form
  const entryTitle = document.getElementById("entry-title").value;
  const todayEntry = document.getElementById("entry").value;

  // Check if both entryTitle and todayEntry are not empty
  if (entryTitle.trim() !== "" && todayEntry.trim() !== "") {
    // Add a new document with a generated id
    addDoc(collection(db, "entries"), {
      entryTitle: entryTitle,
      todayEntry: todayEntry,
      timestamp: serverTimestamp(),
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        // Optionally, you can add code here to handle success
        // For example, display a success message to the user
        alert("Entry submitted successfully!");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
        // Optionally, you can add code here to handle errors
        // For example, display an error message to the user
        alert("Error adding entry. Please try again later.");
      });

    // Clear the form fields after submitting
    entryForm.reset();
  } else {
    // Optionally, you can add code here to handle empty fields
    console.error("Entry Title and Today's Entry cannot be empty.");
  }

  return false; // Prevent form submission
});
