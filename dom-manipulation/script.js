// Array to store quote objects
let quotes = [
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// Function to display a random quote
function showRandomQuote() {
  if (quotes.length === 0) {
    alert("No quotes available.");
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  let quoteDisplay = document.getElementById('quoteDisplay');
  if (!quoteDisplay) {
    quoteDisplay = document.createElement('div');
    quoteDisplay.id = 'quoteDisplay';
    document.body.appendChild(quoteDisplay);
  }
  quoteDisplay.innerHTML = `<blockquote>${quote.text}</blockquote><small>Category: ${quote.category}</small>`;
}

// Function to create the add quote form (if needed)
function createAddQuoteForm() {
  // The form is already provided in your HTML snippet, so nothing to do here.
  // This function can be used to dynamically create the form if needed.
}

// Function to add a new quote from the form
function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');
  const text = textInput.value.trim();
  const category = categoryInput.value.trim();

  if (!text || !category) {
    alert("Please enter both quote text and category.");
    return;
  }

  quotes.push({ text, category });
  textInput.value = '';
  categoryInput.value = '';
  showRandomQuote();
}

// Optionally, show a random quote on page load
window.onload = showRandomQuote;