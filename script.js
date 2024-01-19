// Reference to the entryForm in HTML
const entryForm = document.getElementById("entryForm");

// Array to store journal entries
const journalEntries = [];

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
  //   const dbJsonUrl = "http://localhost:3000/entries";

  const formData = new FormData();
  formData.append("file", file);

  // Performing a fetch to store the journal entry using file.io
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
    });

  //CODE BELOW COMMENTED OUT AS API IS NOW USED TO STORE THE DATA INSEAD OF DB.JSON

  //   // Save entry to the journalEntries array
  //   const entry = {
  //     title: document.getElementById("entry-title").value,
  //     content: document.getElementById("entry").value,
  //     fileIoLink: data.link,
  //   };
  //   journalEntries.push(entry);

  //   // Save to db.json (client-side, for demonstration purposes only)
  //   saveToDbJson(entry);
  // })
  // .catch((error) => {
  //   console.error("Error storing journal entry:", error);
  //
  //   alert("Error storing journal entry. Please try again later.");
  // });
}

// Function to save entries to db.json
// function saveToDbJson(entry) {
//   // Fetch current entries from db.json
//   fetch("http://localhost:3000/entries") // Replace with your server URL
//     .then((response) => response.json())
//     .then((data) => {
//       // Append new entry to the existing entries
//       data.entries.push(entry);

//       // Save updated entries back to db.json
//       fetch(dbJsonUrl, {
//         // Replace with your server URL
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       })
//         .then((response) => response.json())
//         .then((updatedData) => {
//           console.log("Entry saved to db.json:", updatedData);
//         })
//         .catch((error) => {
//           console.error("Error saving to db.json:", error);
//
//           alert("Error saving to db.json. Please try again later.");
//         });
//     })
//     .catch((error) => {
//       console.error("Error fetching data from db.json:", error);
//
//       alert("Error fetching data from db.json. Please try again later.");
//     });

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

    // Uploading the text file
    uploadFile(textFile);

    // Clearing the form fields after submitting
    entryForm.reset();
  } else {
    // handling empty fields
    console.error("Entry Title and Today's Entry cannot be empty.");
  }

  return false; // Prevent form submission
});

//Quote generator API
// Global Variable used to store the quotes
// fetched from the API-quote generator
var data;
let front = true;

// Getting the front and the back author boxes
const authorFront = document.querySelector(".block__front .author-main");
const authorBack = document.querySelector(".block__back .author-main");

// Getting the front and the back texts
const texts = document.querySelectorAll(".quote-text");

// Getting the body
const body = document.getElementById("body");

// Getting the buttons to generate quotes
const button = document.querySelectorAll(".new-quote");

const blockFront = document.querySelector(".block__front");
const blockBack = document.querySelector(".block__back");

const textFront = texts[0];
const textBack = texts[1];

const buttonFront = button[0];
const buttonBack = button[1];

const displayQuote = () => {
  // Generates a random number between 0
  // and the length of the dataset
  let index = Math.floor(Math.random() * data.length);

  // Stores the quote present at the randomly generated index
  let quote = data[index].text;

  // Stores the original author of the respective quote
  let originalAuthor = data[index].author;

  // Remove any unwanted text from the author
  let cleanedAuthor = originalAuthor
    ? originalAuthor.replace("type.fit", "").trim()
    : null;

  // Making the author anonymous if no cleaned author is present
  let author = cleanedAuthor || "Anonymous";

  console.log("Index:", index);
  console.log("Original Author:", originalAuthor);
  console.log("Cleaned Author:", cleanedAuthor);
  console.log("Final Author:", author);

  // Replacing the current quote and the author with a new one
  if (front) {
    // Changing the front if the back-side is displayed
    textFront.innerHTML = quote;
    authorFront.innerHTML = author;
  } else {
    // Changing the back if the front-side is displayed
    textBack.innerHTML = quote;
    authorBack.innerHTML = author;
  }

  front = !front;
};

// Function to display a new random quote
function displayRandomQuote() {
  // Fetching the quotes from the type.fit API using promises
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    }) // Getting the raw JSON data
    .then(function (jsonData) {
      // Storing the quotes internally upon
      // successful completion of the request
      data = jsonData;

      // Displaying the quote When the Webpage loads
      displayQuote();
    })
    .catch(function (error) {
      console.error("Error fetching quotes:", error);
    });
}

// Adding an onclick listener for the button
function newQuote() {
  // Rotating the Quote Box
  blockBack.classList.toggle("rotateB");
  blockFront.classList.toggle("rotateF");

  // Displaying a new quote when the webpage loads
  displayRandomQuote();
}
   
// ... (your existing script)

document.addEventListener("DOMContentLoaded", function () {
  let sidebar = document.querySelector(".sidebar");
  let sidebarBtn = document.querySelector(".sidebarBtn");
  let motivSection = document.getElementById("motivSection");
  let timelineLink = document.querySelector(".nav-links li:nth-child(2) a"); // where Timeline is the second link
  let quoteSection = document.querySelector(".quote-section"); //quote section
  let journalSection = document.querySelector(".journal-section"); //  journal section

  sidebarBtn.onclick = function () {
    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
      sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      // Hide the quote, motiv, and journal sections when closing the sidebar
      quoteSection.style.display = "none";
      motivSection.style.display = "none";
      journalSection.style.display = "none";
    }
  };

  //  event listener for the Timeline link
  timelineLink.addEventListener("click", function (event) {
    event.preventDefault();

    // Toggle the visibility of the Motiv Section/quote section
    if (motivSection.style.display === "none") {
      motivSection.style.display = "block";
      journalSection.style.display = "none"; // Ensure the journal section is hidden
    } else {
      motivSection.style.display = "none";
    }

    return false;
  });
});
