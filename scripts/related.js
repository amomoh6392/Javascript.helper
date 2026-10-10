const relatedContainer = document.querySelector("#related-topics");

export async function displayRelatedTopics(topic) {
  if (!relatedContainer) return;

  relatedContainer.innerHTML = "";

  try {
    const tag = topic
      .toLowerCase()
      .replace(/^javascript\s*/, "")
      .trim()
      .replace(/\s+/g, "-");

    const response = await fetch(
      `https://api.stackexchange.com/2.3/tags/${encodeURIComponent(tag)}/related?site=stackoverflow`
    );

    if (!response.ok) {
      throw new Error("Unable to load related topics.");
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      relatedContainer.textContent = "No related topics found.";
      return;
    }

    data.items.slice(0, 8).forEach((item) => {
      const link = document.createElement("button");

      link.type = "button";
      link.classList.add("related-topic");
      link.textContent = item.name;

      link.addEventListener("click", () => {
        const searchInput = document.querySelector("#search-input");
        searchInput.value = item.name;
        searchInput.focus();
      });

      relatedContainer.appendChild(link);
    });
  } catch (error) {
    console.error("Related topics error:", error);
    relatedContainer.textContent =
      "Related topics are temporarily unavailable.";
  }
}