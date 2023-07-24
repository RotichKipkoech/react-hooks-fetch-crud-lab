// import React from "react";

// function QuestionList() {
//   return (
//     <section>
//       <h1>Quiz Questions</h1>
//       <ul>{/* display QuestionItem components here after fetching */}</ul>
//     </section>
//   );
// }

// export default QuestionList;

import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";
import QuestionForm from "./QuestionForm";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setDataFetched(true);
      });
  }, []);

  const handleAddQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const handleUpdateCorrectAnswer = (id, correctIndex) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === id) {
          return { ...question, correctIndex: correctIndex };
        }
        return question;
      })
    );
  };

  if (!dataFetched) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateCorrectAnswer={handleUpdateCorrectAnswer}
        />
      ))}
    </div>
  );
}

export default QuestionList;
