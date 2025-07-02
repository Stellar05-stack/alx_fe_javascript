// Step 1: Manage an array of quote objects
let quotes = [
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
// (Removed duplicate declaration of quotes)
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}


function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) {
    quotes = JSON.parse(stored);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  loadQuotes();
  // Other setup functions here (like showRandomQuote)
});



function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // ✅ save to local storage
    alert("Quote added!");
  }
}
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2); // pretty print
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
  alert("Quotes exported to quotes.json");}

  function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      if (Array.isArray(importedQuotes)) {
        importedQuotes.forEach(quote => {
          if (quote.text && quote.category) {
            quotes.push(quote);
          }
        });
        saveQuotes(); // Save updated array to localStorage
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format.");
      }
    } catch (err) {
      alert("Error reading file: " + err.message);
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

function populateCategories() {
  const categories = new Set(quotes.map(q => q.category));
  const filter = document.getElementById('categoryFilter');
  filter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    filter.appendChild(opt);
  });
}

function filterQuotes() {
  const selected = document.getElementById('categoryFilter').value;
  localStorage.setItem('lastCategory', selected);
  if (selected === 'all') {
    displayQuotes();
  } else {
    displayQuotes(quotes.filter(q => q.category === selected));
  }
}

function restoreLastCategory() {
  const saved = localStorage.getItem('lastCategory');
  if (saved) {
    document.getElementById('categoryFilter').value = saved;
    filterQuotes();
  }
}

async function syncWithServer() {
  const serverQuotes = await fetch('https://jsonplaceholder.typicode.com/posts/1') // mock
    .then(res => res.json())
    .then(data => [{ text: data.title, category: "server" }]); // adapt as needed

  const localIds = new Set(quotes.map(q => q.text));
  serverQuotes.forEach(q => {
    if (!localIds.has(q.text)) {
      quotes.push(q);
    }
  });

  saveQuotes();
  displayQuotes();
  populateCategories();
}
