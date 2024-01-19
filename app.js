// script.js

const entryForm = document.getElementById("entryForm");
const journalEntries = [];
const apiUrl = "https://file.io";
const serverUrl = "http://localhost:3000/entries";

function createTextFile(entryTitle, todayEntry) {
  return new File(
    [`Entry Title: ${entryTitle}\nToday's Entry: ${todayEntry}`],
    "journal_entry.txt",
    {
      type: "text/plain",
    }
  );
}

function showSuccessNotification(link) {
  alert(`Journal entry stored successfully!\nLink: ${link}`);
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(apiUrl, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("File.io API Response:", data);
      console.log("Journal entry stored:", data.link);
      showSuccessNotification(data.link);

      const entry = {
        title: document.getElementById("entry-title").value,
        content: document.getElementById("entry").value,
        fileIoLink: data.link,
      };

      // Save entry to the journalEntries array
      journalEntries.push(entry);

      // Save to server
      saveToServer(entry);

      // Optionally, save to db.json (client-side, for demonstration purposes only)
      // saveToDbJson(entry);

      return entry;
    })
    .catch((error) => {
      console.error("Error storing journal entry:", error);
      alert("Error storing journal entry. Please try again later.");
    });
}

function saveToServer(entry) {
  fetch(serverUrl)
    .then((response) => response.json())
    .then((data) => {
      // Ensure that data.entries is an array
      data.entries = Array.isArray(data.entries) ? data.entries : [];

      // Append new entry to the existing entries
      data.entries.push(entry);

      // Save updated entries back to server
      return fetch(serverUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    })
    .then((response) => response.json())
    .then((updatedData) => {
      console.log("Entry saved to server:", updatedData);
    })
    .catch((error) => {
      console.error("Error saving to server:", error);
      alert("Error saving to server. Please try again later.");
    });
}

entryForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const entryTitle = document.getElementById("entry-title").value;
  const todayEntry = document.getElementById("entry").value;

  if (entryTitle.trim() !== "" && todayEntry.trim() !== "") {
    const textFile = createTextFile(entryTitle, todayEntry);

    uploadFile(textFile)
      .then(() => {
        // Process the rest of the form submission if needed...

        // Clear the form fields after submitting
        entryForm.reset();
      })
      .catch((error) => {
        console.error("Error in form submission:", error);
        alert("Error in form submission. Please try again later.");
      });
  } else {
    console.error("Entry Title and Today's Entry cannot be empty.");
  }
});
