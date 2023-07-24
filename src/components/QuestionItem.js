// import React from "react";

// function QuestionItem({ question }) {
//   const { id, prompt, answers, correctIndex } = question;

//   const options = answers.map((answer, index) => (
//     <option key={index} value={index}>
//       {answer}
//     </option>
//   ));

//   return (
//     <li>
//       <h4>Question {id}</h4>
//       <h5>Prompt: {prompt}</h5>
//       <label>
//         Correct Answer:
//         <select defaultValue={correctIndex}>{options}</select>
//       </label>
//       <button>Delete Question</button>
//     </li>
//   );
// }

// export default QuestionItem;


import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectAnswer }) {
  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    }).then(() => {
      onDeleteQuestion(question.id);
    });
  };

  const handleCorrectAnswerChange = (e) => {
    const correctIndex = parseInt(e.target.value);
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: correctIndex,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdateCorrectAnswer(question.id, correctIndex);
      });
  };

  return (
    <div>
      <h3>{question.prompt}</h3>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <button onClick={handleDeleteClick}>Delete</button>
      <select
        value={question.correctIndex}
        onChange={handleCorrectAnswerChange}
      >
        {question.answers.map((_, index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>
    </div>
  );
}

export default QuestionItem;
