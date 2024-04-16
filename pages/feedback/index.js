import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { useState } from "react";

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState([]);

  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  }
  return (
    <>
      {feedbackData && <p>{feedbackData.text}</p>}
      <ul>
        {props?.feedback?.map((item) => (
          <li key={item.id}>
            {item.text}{" "}
            <button onClick={() => loadFeedbackHandler(item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedback: data,
    },
  };
}

export default FeedbackPage;
