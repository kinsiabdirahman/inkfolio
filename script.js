// script.js

// Reference to the entryForm in HTML
const entryForm = document.getElementById("entryForm");

// Function to handle file upload
function uploadFile(file) {
  const apiUrl = "https://file.io";

  const formData = new FormData();
  formData.append("file", file);

  // Perform a fetch to store the journal entry using file.io
  fetch("https://file.io", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("File.io API Response:", data); // Log the entire response
      console.log("Journal entry stored:", data.link); // Log the link property
      // Optionally, you can handle success here
      alert("Journal entry stored successfully!");
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
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];

  // Check if both entryTitle and todayEntry are not empty
  if (entryTitle.trim() !== "" && todayEntry.trim() !== "") {
    // Upload file if selected
    if (file) {
      uploadFile(file);
    }

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
