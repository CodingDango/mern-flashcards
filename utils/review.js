/**
 * Generates a more detailed, contextual paragraph based on the user's score.
 * @param {number} score The number of correct answers.
 * @param {number} total The total number of cards reviewed.
 * @returns {string} A detailed feedback paragraph.
 */
export function getReviewDetailsMessage(score, total) {
  if (total === 0) {
    return "Once you add more cards to this deck, you can start a new review session.";
  }

  const percentage = (score / total) * 100;
  const incorrect = total - score;

  if (percentage === 100) {
    return "You've achieved complete recall for this set. To lock this knowledge into your long-term memory, consider reviewing this deck again in a few days.";
  } else if (percentage >= 80) {
    return `You're on the verge of mastering this topic. Focusing on the ${incorrect} card${
      incorrect > 1 ? "s" : ""
    } you missed will be the most effective use of your study time.`;
  } else if (percentage >= 50) {
    return "You're building a strong connection with this material. Repetition is key to strengthening memory, and another review session will significantly boost your retention.";
  } else if (percentage > 0) {
    return "This is the most crucial stage of learning. By reviewing the cards you found challenging, you are actively building new neural pathways. Keep up the great effort!";
  } else {
    // Score is 0
    return "Think of this session as the first introduction to the material. Your brain has now seen the questions and answers, which makes the next review much more effective.";
  }
}

/**
 * Generates a short, encouraging feedback message based on the score.
 * @param {number} corrects The number of correct answers.
 * @param {number} total The total number of cards.
 * @returns {string} A short feedback message.
 */
export function getShortFeedbackMessage(corrects, total) {
  if (total === 0) return "No cards were reviewed.";

  const percentage = (corrects / total) * 100;

  const pickRandom = (messages) => {
    return messages[Math.floor(Math.random() * messages.length)];
  };

  if (percentage === 100) {
    return pickRandom([
      "Flawless victory! You've mastered this deck.",
      "Perfect score! You know this material inside and out.",
    ]);
  }
  if (percentage >= 80) {
    return pickRandom([
      "Excellent job! You're very close to mastering this.",
      "Fantastic result! You have a strong grasp on the topic.",
    ]);
  }
  if (percentage >= 50) {
    return pickRandom([
      "Solid effort! You're building a great foundation.",
      "Nice work! You're definitely on the right track.",
    ]);
  }
  if (percentage > 0) {
    return pickRandom([
      "A great first step! Every review helps build your memory.",
      "Keep going! You'll get them with practice.",
    ]);
  }
  // This is for a score of 0
  return pickRandom([
    "The first attempt is always the most important one!",
    "Okay, that's the baseline. There's nowhere to go but up!",
  ]);
}
