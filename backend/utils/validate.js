exports.validateFeedback = (data) => {
  if (!data || typeof data !== "object") {
    return "Invalid payload";
  }

  if (!data.message || typeof data.message !== "string") {
    return "Message is required";
  }

  if (data.message.length > 1000) {
    return "Message too long";
  }

  if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
    return "Invalid email format";
  }

  if (
    typeof data.rating !== "number" ||
    data.rating < 1 ||
    data.rating > 5
  ) {
    return "Rating must be between 1 and 5";
  }

  return null;
};