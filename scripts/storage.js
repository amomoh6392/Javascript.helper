const HISTORY_KEY = "js-learning-history";
const SAVED_KEY = "js-learning-saved";

export function displayHistory() {
  const historyContainer = document.querySelector("#history-container");

  if (!historyContainer) return;

  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

  historyContainer.innerHTML = "";

  if (history.length === 0) {
    historyContainer.innerHTML = "<p>No search history yet.</p>";
    return;
  }

  history.forEach((topic) => {
    const item = document.createElement("article");
    item.classList.add("history-item");

    const title = document.createElement("h3");
    title.textContent = topic;

  
    const actions = document.createElement("div");
    actions.classList.add("history-actions");

    // Search Again button
    const searchAgainButton = document.createElement("button");
    searchAgainButton.type = "button";
    searchAgainButton.classList.add("secondary-button");
    searchAgainButton.textContent = "Search Again";

    searchAgainButton.addEventListener("click", () => {
      const searchInput = document.querySelector("#search-input");
      const searchForm = document.querySelector("#search-form");

      searchInput.value = topic;
      searchForm.requestSubmit();
    });

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("secondary-button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      deleteHistoryTopic(topic);
    });

    actions.append(searchAgainButton, deleteButton);
    item.append(title, actions);
    historyContainer.appendChild(item);
  });
}
export function displaySaved() {
  const savedContainer = document.querySelector("#saved-container");

  if (!savedContainer) return;

  const saved = JSON.parse(localStorage.getItem(SAVED_KEY)) || [];

  savedContainer.innerHTML = "";

  if (saved.length === 0) {
    savedContainer.innerHTML = "<p>No saved topics yet.</p>";
    return;
  }

  saved.forEach((topic) => {
    const item = document.createElement("div");
    item.classList.add("saved-item");

    const title = document.createElement("h3");
    title.textContent = topic.title || "Saved JavaScript topic";

    const actions = document.createElement("div");
    actions.classList.add("saved-actions");
      
    const viewLink = document.createElement("a");
    viewLink.href =
    topic.link ||
    `https://stackoverflow.com/questions/${topic.question_id}`;
    viewLink.target = "_blank";
      viewLink.rel = "noopener noreferrer";
      viewLink.classList.add("secondary-button");
    viewLink.textContent = "View";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("secondary-button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
    deleteSavedTopic(topic.question_id);
    });
      
    actions.append(viewLink, deleteButton);
    item.append(title, actions);
    savedContainer.appendChild(item);
  });
}

export function saveToHistory(topic) {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

  const updatedHistory = history.filter(
    (item) => item.toLowerCase() !== topic.toLowerCase()
  );

  
  updatedHistory.unshift(topic);

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

  displayHistory();
}
export function saveTopic(topic) {
  const saved = JSON.parse(localStorage.getItem(SAVED_KEY)) || [];

  const alreadySaved = saved.some(
    (item) => item.question_id === topic.question_id
  );

  if (alreadySaved) {
    return;
  }

  saved.push(topic);

  localStorage.setItem(SAVED_KEY, JSON.stringify(saved));

  displaySaved();
}

export function deleteSavedTopic(questionId) {
  const saved = JSON.parse(localStorage.getItem(SAVED_KEY)) || [];

  const updatedSaved = saved.filter(
    (topic) => topic.question_id !== questionId
  );

  localStorage.setItem(SAVED_KEY, JSON.stringify(updatedSaved));

  displaySaved();
}
export function deleteHistoryTopic(topicToDelete) {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

  const updatedHistory = history.filter(
    (topic) => topic !== topicToDelete
  );

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

  displayHistory();
}
export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
  displayHistory();
}