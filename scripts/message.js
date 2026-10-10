const messages = [
  "Every programmer starts as a beginner. Keep practicing!",
  "Errors are opportunities to learn something new.",
  "You do not need to understand everything at once. Take it one step at a time.",
  "Every bug you fix makes you a better problem solver.",
  "Keep going! Your effort today is building your skills for tomorrow.",
  "It's okay to feel confused. Try breaking the problem into smaller steps.",
  "Progress matters more than perfection. Keep learning!",
];

export function displayMessage() {
  const messageElement = document.querySelector(
    "#encouragement-message"
  );

  if (!messageElement) return;

  const randomIndex = Math.floor(Math.random() * messages.length);

  messageElement.textContent = messages[randomIndex];
}