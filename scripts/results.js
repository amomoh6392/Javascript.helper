import { saveTopic } from "./storage.js";

const resultsContainer = document.querySelector("#results-container");
const loadingMessage = document.querySelector("#loading");
const errorMessage = document.querySelector("#error-message");
const noResultsMessage = document.querySelector("#no-results");
const resultsCount = document.querySelector("#results-count");

const answerDialog = document.querySelector("#answer-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogContent = document.querySelector("#dialog-content");
const dialogViewLink = document.querySelector("#dialog-view-link");

const dialogCloseButton = document.querySelector("#dialog-close-button");

dialogCloseButton.addEventListener("click", () => {
  answerDialog.close();
});

export function showLoading() {
  loadingMessage.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  noResultsMessage.classList.add("hidden");

  resultsContainer.innerHTML = "";
  resultsCount.textContent = "";
}

export function showError(message) {
  loadingMessage.classList.add("hidden");
  noResultsMessage.classList.add("hidden");

  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");

  resultsContainer.innerHTML = "";
  resultsCount.textContent = "";
}

export function showNoResults() {
  loadingMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");

  noResultsMessage.classList.remove("hidden");

  resultsContainer.innerHTML = "";
  resultsCount.textContent = "";
}

export function displayResults(results) {
  loadingMessage.classList.add("hidden");
  errorMessage.classList.add("hidden");
  noResultsMessage.classList.add("hidden");

  resultsContainer.innerHTML = "";
  resultsCount.textContent = `${results.length} results`;

  results.forEach((result) => {
    const card = document.createElement("article");

    card.classList.add("result-card");

    const title = document.createElement("h3");
    title.textContent = cleanText(result.title);

    
    
    const body = document.createElement("p");
    body.classList.add("result-description");

    const description = cleanText(
      result.body || result.excerpt || ""
    );

    body.textContent = description || "No description available.";

    
    const meta = document.createElement("div");
    meta.classList.add("result-meta");

    const answerCount = document.createElement("span");
    answerCount.textContent = `Answers: ${result.answer_count ?? 0}`;

    const answered = document.createElement("span");
    answered.textContent = result.is_answered
      ? "Answered"
      : "Not answered";

    meta.append(answerCount, answered);

      const actions = document.createElement("div");
      actions.classList.add("result-actions");

     
      const detailsButton = document.createElement("button");
      detailsButton.type = "button";
      detailsButton.classList.add("secondary-button");
      detailsButton.textContent = "Read Answer / Details";

      
      
      detailsButton.addEventListener("click", () => {
        dialogTitle.textContent = cleanText(result.title);

        dialogContent.textContent =
          cleanText(result.body || result.excerpt || "") ||
          "No additional details available.";

        dialogViewLink.href =
          result.link ||
          `https://stackoverflow.com/questions/${result.question_id}`;

        answerDialog.showModal();
      });

     
      const viewButton = document.createElement("a");
      viewButton.href =
        result.link ||
        `https://stackoverflow.com/questions/${result.question_id}`;
      viewButton.target = "_blank";
      viewButton.rel = "noopener noreferrer";
      viewButton.classList.add("secondary-button");
      viewButton.textContent = "View";

     
      const saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.classList.add("secondary-button");
      saveButton.textContent = "Save For Later";

      saveButton.addEventListener("click", () => {
        saveTopic(result);
        saveButton.textContent = "Saved";
        saveButton.disabled = true;
      });

      
    actions.append(detailsButton, viewButton, saveButton);
    card.append(title, body, meta, actions);
    resultsContainer.appendChild(card);  

  });
}


function cleanText(html) {
  const temporaryElement = document.createElement("div");
  temporaryElement.innerHTML = html || "";

  return (
    temporaryElement.textContent ||
    temporaryElement.innerText ||
    ""
  ).trim();
}