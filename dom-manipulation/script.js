let quotes = JSON.parse(localStorage.getItem('quotes') || '[]');

// Show random quote
function showRandomQuote() {
  if (quotes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<blockquote>${quote.text}</blockquote><p><em>${quote.category}</em></p>`;
  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill out both fields.");
    return;
  }

  const quote = { text, category };
  quotes.push(quote);
  saveQuotes();
  populateCategories();
  displayQuotes();
  postQuoteToServer(quote);

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";
}

// Save to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Display all quotes
function displayQuotes() {
  const container = document.getElementById("allQuotes");
  container.innerHTML = "";
  quotes.forEach((q, i) => {
    const div = document.createElement("div");
    div.innerHTML = `<blockquote>${q.text}</blockquote><p><em>${q.category}</em></p>
      <button onclick="removeQuote(${i})">Remove</button>`;
    container.appendChild(div);
  });
}

// Remove a quote
function removeQuote(index) {
  quotes.splice(index, 1);
  saveQuotes();
  displayQuotes();
  populateCategories();
}

// Populate categories
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  select.innerHTML = categories.map(cat => `<option value="${cat}">${cat}</option>`).join("");
}

// Filter quotes
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  const container = document.getElementById("allQuotes");
  const filtered = selected === "all" ? quotes : quotes.filter(q => q.category === selected);

  container.innerHTML = "";
  filtered.forEach(q => {
    const div = document.createElement("div");
    div.innerHTML = `<blockquote>${q.text}</blockquote><p><em>${q.category}</em></p>`;
    container.appendChild(div);
  });

  localStorage.setItem("lastFilter", selected);
}

// Fetch from server
async function fetchQuotesFromServer() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
    const data = await res.json();
    return data.map(post => ({ text: post.title, category: "server" }));
  } catch (e) {
    console.error("Failed to fetch quotes", e);
    return [];
  }
}

// Post to server
async function postQuoteToServer(quote) {
  try {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(quote)
    });
  } catch (e) {
    console.error("Post failed", e);
  }
}

// Sync function
async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  const existingTexts = quotes.map(q => q.text);
  const newOnes = serverQuotes.filter(q => !existingTexts.includes(q.text));

  if (newOnes.length > 0) {
    quotes.push(...newOnes);
    saveQuotes();
    displayQuotes();
    populateCategories();
    notify(`${newOnes.length} new quotes synced from server`);
  }
}

// Notification UI
function notify(message) {
  const note = document.createElement("div");
  note.textContent = message;
  Object.assign(note.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px"
  });
  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3000);
}

// JSON import
function importFromJsonFile(event) {
  const reader = new FileReader();
  reader.onload = e => {
    const imported = JSON.parse(e.target.result);
    quotes.push(...imported);
    saveQuotes();
    displayQuotes();
    populateCategories();
    alert("Quotes imported successfully!");
  };
  reader.readAsText(event.target.files[0]);
}

// JSON export
function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Load everything
document.addEventListener("DOMContentLoaded", () => {
  const lastFilter = localStorage.getItem("lastFilter");
  if (lastFilter) {
    document.getElementById("categoryFilter").value = lastFilter;
  }

  displayQuotes();
  populateCategories();
  filterQuotes();

  document.getElementById("show-quote-btn")?.addEventListener("click", showRandomQuote);
  document.getElementById("categoryFilter")?.addEventListener("change", filterQuotes);
  setInterval(syncQuotes, 30000); // sync every 30 seconds
});

