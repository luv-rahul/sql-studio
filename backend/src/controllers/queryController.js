const queryService = require("../services/queryService");
const gptService = require("../services/gptService");

const postQuery = async (req, res) => {
  try {
    const result = await queryService.createWorkspace(req.body);
    res.json(result);
  } catch (error) {
    console.error("WORKSPACE ERROR:", error);

    if (error.message === "Assignment not found") {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};

const executeQuery = async (req, res) => {
  try {
    const result = await queryService.runQuery(req.body);
    res.json(result);
  } catch (error) {
    console.error("QUERY ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

const gptHints = async (req, res) => {
  try {
    const result = await gptService.handleGptSearchClick(req.body);
    return res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

module.exports = { postQuery, executeQuery, gptHints };
