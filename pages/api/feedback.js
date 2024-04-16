import fs from "fs";
import path from "path";

function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  switch (req.method) {
    case "POST":
      const email = req.body.email;
      const feedbackText = req.body.text;

      const newFeedback = {
        id: new Date().toISOString(),
        email: email,
        text: feedbackText,
      };

      data.push(newFeedback);
      fs.writeFileSync(filePath, JSON.stringify(data));

      res.status(201).json({ message: "Success!", feedback: newFeedback });

      break;
    case "GET":
      res.status(200).json({ feedback: data });

      break;

    default:
      res.status(200).json({ message: "This works!" });
  }
}

export default handler;
