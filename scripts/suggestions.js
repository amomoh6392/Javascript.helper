
export function setupSuggestions(searchInput) {
  const suggestionsContainer = document.querySelector("#suggestions");
  const searchForm = document.querySelector("#search-form");

  if (!suggestionsContainer || !searchInput || !searchForm) return;

  let suggestions = [];

  fetch("./data/suggestions.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not load suggestions.");
      }

      return response.json();
    })
    .then((data) => {
      suggestions = data;
    })
    .catch((error) => {
      console.error("Suggestions error:", error);
    });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();

    suggestionsContainer.replaceChildren();

    if (!query) return;

    const matches = suggestions
      .filter((topic) => topic.toLowerCase().includes(query))
      .slice(0, 5);

    matches.forEach((topic) => {
      const button = document.createElement("button");

      button.type = "button";
      button.classList.add("suggestion-item");
      button.textContent = topic;

      button.addEventListener("click", () => {
        searchInput.value = topic;
        suggestionsContainer.replaceChildren();
        searchForm.requestSubmit();
      });

      suggestionsContainer.appendChild(button);
    });
  });

  document.addEventListener("click", (event) => {
    if (
      !suggestionsContainer.contains(event.target) &&
      event.target !== searchInput
    ) {
      suggestionsContainer.replaceChildren();
    }
  });
}
