const ai = require("../utils/google");
const { generateGPTQuery } = require("../utils/queryGenerator");

const handleGptSearchClick = async ({ question, queryValue }) => {
  const gptQuery = generateGPTQuery(question, queryValue);
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: gptQuery,
  });

  if (!response.text) {
    alert("Error: Fetching Data. Please Retry!");
  }

  const hints = response.text; // Assuming the response contains a 'text' field with the hints
  return hints;
};

module.exports = { handleGptSearchClick };
