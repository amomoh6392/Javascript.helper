
const definitionContainer = document.querySelector("#definition-container");

let termsPromise;

async function loadTerms() {
  if (!termsPromise) {
    termsPromise = fetch(
      new URL("../data/programming-terms.json", import.meta.url)
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load programming terms.");
      }

      return response.json();
    });
  }

  return termsPromise;
}

export async function displayDefinition(topic) {
  if (!definitionContainer) return;

  definitionContainer.textContent = "Loading programming definition...";

  try {
    const terms = await loadTerms();
    const searchTerm = topic.trim().toLowerCase();

    const matchedTerm = terms.find((item) => {
      const names = [item.term, ...(item.aliases || [])];

      return names.some(
        (name) => name.trim().toLowerCase() === searchTerm
      );
    });

    if (!matchedTerm) {
      definitionContainer.textContent =
        "This term is not in the programming glossary yet. Try a term such as API, Array, Function, or Variable.";
      return;
    }

    const heading = document.createElement("h3");
    heading.textContent = matchedTerm.term;

    const category = document.createElement("p");
    category.textContent = `Category: ${matchedTerm.category}`;

    const description = document.createElement("p");
    description.textContent =
      matchedTerm.definition ||
      "A beginner-friendly definition has not been added for this term yet.";

    const link = document.createElement("a");
    const articleTitle = matchedTerm.articleTitle;

    link.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(
      articleTitle.replace(/ /g, "_")
    )}`;

    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Learn more on Wikipedia";

    definitionContainer.replaceChildren(
      heading,
      category,
      description,
      link
    );
  } catch (error) {
    console.error("Definition error:", error);

    definitionContainer.textContent =
      "The programming glossary could not be loaded. Please try again.";
  }
}
