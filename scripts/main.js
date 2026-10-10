import { setupSearch } from "./search.js";
import { setupSuggestions } from "./suggestions.js";
import { displayHistory, displaySaved, clearHistory } from "./storage.js";
import { displayMessage } from "./message.js";

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const currentYear = document.querySelector("#current-year");
const clearHistoryButton = document.querySelector("#clear-history");

function initializeApp() {
  setupSearch(searchForm, searchInput);
  setupSuggestions(searchInput);

  displayHistory();
  displaySaved();
  displayMessage();

  clearHistoryButton.addEventListener("click", () => {
    clearHistory();
  });

  currentYear.textContent = new Date().getFullYear();
}

initializeApp();