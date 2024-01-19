// script.js

// Reference to the entryForm in HTML
const entryForm = document.getElementById("entryForm");

// Function to create a text file with entry details
function createTextFile(entryTitle, todayEntry) {
  return new File(
    [`Entry Title: ${entryTitle}\nToday's Entry: ${todayEntry}`],
    "journal_entry.txt",
    {
      type: "text/plain",
    }
  );
}

// Function to show a success notification
function showSuccessNotification(link) {
  alert(`Journal entry stored successfully!\nLink: ${link}`);
}

// Function to handle file upload
function uploadFile(file) {
  const apiUrl = "https://file.io";

  const formData = new FormData();
  formData.append("file", file);

  // Perform a fetch to store the journal entry using file.io
  fetch(apiUrl, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("File.io API Response:", data); // Log the entire response
      console.log("Journal entry stored:", data.link); // Log the link property
      // Show success notification
      showSuccessNotification(data.link);
    })
    .catch((error) => {
      console.error("Error storing journal entry:", error);
      // Optionally, you can handle errors here
      alert("Error storing journal entry. Please try again later.");
    });
}

// Event listener for form submission
entryForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get values from the form
  const entryTitle = document.getElementById("entry-title").value;
  const todayEntry = document.getElementById("entry").value;

  // Check if both entryTitle and todayEntry are not empty
  if (entryTitle.trim() !== "" && todayEntry.trim() !== "") {
    // Create a text file with entry details
    const textFile = createTextFile(entryTitle, todayEntry);

    // Upload the text file
    uploadFile(textFile);

    // Process the rest of the form submission
    // ...

    // Clear the form fields after submitting
    entryForm.reset();
  } else {
    // Optionally, you can add code here to handle empty fields
    console.error("Entry Title and Today's Entry cannot be empty.");
  }

  return false; // Prevent form submission
});
