exports.validateFeedback = (data) => {
  if (!data.message || typeof data.message !== "string") {
    return "Message is required";
  }

  if (data.rating < 1 || data.rating > 5) {
    return "Rating must be between 1 and 5";
  }

  return null;
};