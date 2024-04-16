import fs from "fs";
import path from "path";

async function handler(req, res) {
  switch (req.method) {
    case "POST":
      const email = req.body.email;
      const feedbackText = req.body.text;

      const newFeedback = {
        id: new Date().toISOString(),
        email: email,
        text: feedbackText,
      };

      const filePath = path.join(process.cwd(), "data", "feedback.json");
      const fileData = fs.readFileSync(filePath, "utf8");
      const data = JSON.parse(fileData);
      data.push(newFeedback);
      fs.writeFileSync(filePath, JSON.stringify(data));

      res.status(201).json({ message: "Success!", feedback: newFeedback });

      break;
    case "GET":
      const feedback = [
        {
          id: "1",
          email: "[email protected]",
          text: "This is a test feedback!",
        },
      ];
      res.status(200).json({ feedback });
      break;

    default:
      res.status(200).json({ message: "This works!" });
  }
}

export default handler;
