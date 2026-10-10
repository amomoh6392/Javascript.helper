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



const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.textContent = isOpen ? "✕" : "☰";
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.textContent = "☰";
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
    });
  });
}

