// Step 1: Manage an array of quote objects
const quotes = [
  { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Inspiration" },
  { text: "A day without laughter is a day wasted.", category: "Humor" }
];

// Step 2: Function to show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `
    <p>"${quote.text}"</p>
    <small>— Category: ${quote.category}</small>
  `;
}

// Step 3: Function to create the form for adding new quotes
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.id = "quoteForm";

  formContainer.innerHTML = `
    <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
    <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
    <button id="addQuoteBtn">Add Quote</button>
  `;

  document.body.appendChild(formContainer);

  // Attach click event to the Add Quote button
  const addBtn = document.getElementById("addQuoteBtn");
  addBtn.addEventListener("click", addQuote);
}

// Step 4: Function to add a new quote
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (newText === "" || newCategory === "") {
    alert("Please fill in both fields.");
    return;
  }

  // Add new quote to the array
  quotes.push({ text: newText, category: newCategory });

  // Clear the input fields
  textInput.value = "";
  categoryInput.value = "";

  // Show updated random quote
  showRandomQuote();
}

// Step 5: Set up the app on page load
document.addEventListener("DOMContentLoaded", () => {
  // Create display area
  const quoteDisplay = document.createElement("div");
  quoteDisplay.id = "quoteDisplay";
  document.body.appendChild(quoteDisplay);

  // Show an initial quote
  showRandomQuote();

  // Create the add quote form
  createAddQuoteForm();

  // Create button to get new random quotes
  const randomBtn = document.createElement("button");
  randomBtn.textContent = "Show Random Quote";
  randomBtn.onclick = showRandomQuote;
  document.body.appendChild(randomBtn);
});
let quotes = [
  { text: "Stay hungry, stay foolish.", category: "Inspiration" },
  { text: "Simplicity is the ultimate sophistication.", category: "Design" }
];
