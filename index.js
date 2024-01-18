// Firebase Configuration
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
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const db = firebase.firestore();

// Journal Entry Form
const entryForm = document.querySelector(`#entryForm`);
const entryResultsSection = document.querySelector(`#entryResultsSection`);
const entryResultRow = document.querySelector(`.entryResultRow`);
const fileInput = document.getElementById("fileInput");
const getEntryTitle = document.getElementById("entry-title");
const getEntryText = document.getElementById("entry");

function addEntryToFirestore(title, text, imageUrl) {
  db.collection("entries").add({
    title,
    text,
    imageUrl,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
}

function addEntryToStorage(file) {
  const storageRef = storage.ref();
  const imagesRef = storageRef.child("images/" + file.name);
  return imagesRef.put(file);
}

function displayEntries(entries) {
  entryResultRow.innerHTML = ""; // Clear previous entries
  const heading = document.createElement(`h2`);
  heading.className = `heading-results`;
  heading.textContent = `Journal Entries`;
  entryResultRow.appendChild(heading);

  entries.forEach((entry) => {
    const entryDiv = document.createElement(`div`);
    entryDiv.className = `single-entry-div`;
    entryResultRow.appendChild(entryDiv);

    const entryHeading = document.createElement(`h3`);
    entryHeading.className = `single-entry-heading`;
    entryHeading.textContent = entry.title;
    entryDiv.appendChild(entryHeading);

    const entryDate = document.createElement(`p`);
    entryDate.className = `single-entry-date`;
    entryDate.textContent = `Date Added: ${new Date(
      entry.timestamp?.seconds * 1000
    ).toLocaleDateString()}`;
    entryDiv.appendChild(entryDate);

    const entryParagraph = document.createElement(`p`);
    entryParagraph.className = `single-entry-text`;
    entryParagraph.textContent = entry.text;
    entryDiv.appendChild(entryParagraph);
  });
}

entryForm.addEventListener(`submit`, async (event) => {
  event.preventDefault();

  const title = getEntryTitle.value;
  const text = getEntryText.value;
  const file = fileInput.files[0];

  try {
    if (file) {
      const uploadTaskSnapshot = await addEntryToStorage(file);
      const downloadUrl = await uploadTaskSnapshot.ref.getDownloadURL();
      addEntryToFirestore(title, text, downloadUrl);
    } else {
      addEntryToFirestore(title, text, null);
    }

    // Clear form after submitting
    getEntryTitle.value = "";
    getEntryText.value = "";

    // Retrieve entries and display
    const entriesSnapshot = await db
      .collection("entries")
      .orderBy("timestamp", "desc")
      .get();
    const entries = entriesSnapshot.docs.map((doc) => doc.data());
    displayEntries(entries);
  } catch (error) {
    console.error("Error adding entry: ", error);
  }
});

// Display entries on initial load
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const entriesSnapshot = await db
      .collection("entries")
      .orderBy("timestamp", "desc")
      .get();
    const entries = entriesSnapshot.docs.map((doc) => doc.data());
    displayEntries(entries);
  } catch (error) {
    console.error("Error getting entries: ", error);
  }
});
