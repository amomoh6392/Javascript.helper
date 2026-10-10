import {displayResults, showLoading, showError, showNoResults,} from "./results.js";

import { saveToHistory } from "./storage.js";
import { displayRelatedTopics } from "./related.js";
import { displayMessage } from "./message.js";

const API_URL =
  "https://api.stackexchange.com/2.3/search/excerpts?order=desc&sort=relevance&site=stackoverflow&filter=withbody&intitle=";

export function setupSearch(searchForm, searchInput) {
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const topic = searchInput.value.trim();

    if (!topic) {
      showError("Please enter a JavaScript topic to search.");
      return;
    }

    saveToHistory(topic);

    await searchTopic(topic);
  });
}

async function searchTopic(topic) {
  showLoading();
  displayMessage();

  try {
    const response = await fetch(`${API_URL}${encodeURIComponent(topic)}`);

    if (!response.ok) {
      throw new Error("Unable to connect to Stack Exchange.");
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      showNoResults();
      return;
    }

    displayResults(data.items);
    displayRelatedTopics(topic);
  } catch (error) {
    console.error("Search error:", error);
    showError("Something went wrong while searching. Please try again.");
  }
}