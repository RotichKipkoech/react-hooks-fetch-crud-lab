// import React, { useState } from "react";

// function QuestionForm(props) {
//   const [formData, setFormData] = useState({
//     prompt: "",
//     answer1: "",
//     answer2: "",
//     answer3: "",
//     answer4: "",
//     correctIndex: 0,
//   });

//   function handleChange(event) {
//     setFormData({
//       ...formData,
//       [event.target.name]: event.target.value,
//     });
//   }

//   function handleSubmit(event) {
//     event.preventDefault();
//     console.log(formData);
//   }

//   return (
//     <section>
//       <h1>New Question</h1>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Prompt:
//           <input
//             type="text"
//             name="prompt"
//             value={formData.prompt}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Answer 1:
//           <input
//             type="text"
//             name="answer1"
//             value={formData.answer1}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Answer 2:
//           <input
//             type="text"
//             name="answer2"
//             value={formData.answer2}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Answer 3:
//           <input
//             type="text"
//             name="answer3"
//             value={formData.answer3}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Answer 4:
//           <input
//             type="text"
//             name="answer4"
//             value={formData.answer4}
//             onChange={handleChange}
//           />
//         </label>
//         <label>
//           Correct Answer:
//           <select
//             name="correctIndex"
//             value={formData.correctIndex}
//             onChange={handleChange}
//           >
//             <option value="0">{formData.answer1}</option>
//             <option value="1">{formData.answer2}</option>
//             <option value="2">{formData.answer3}</option>
//             <option value="3">{formData.answer4}</option>
//           </select>
//         </label>
//         <button type="submit">Add Question</button>
//       </form>
//     </section>
//   );
// }

// export default QuestionForm;


import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [prompt, setPrompt] = useState("");
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newQuestion = {
      prompt: prompt,
      answers: answers.filter((answer) => answer !== ""),
      correctIndex: correctIndex,
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        onAddQuestion(data);
        setPrompt("");
        setAnswers(["", "", "", ""]);
        setCorrectIndex(0);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Prompt:</label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <div>
        <label>Answers:</label>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              <input
                type="text"
                value={answer}
                onChange={(e) => {
                  const updatedAnswers = [...answers];
                  updatedAnswers[index] = e.target.value;
                  setAnswers(updatedAnswers);
                }}
              />
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => setAnswers([...answers, ""])}>
          Add Answer
        </button>
      </div>
      <div>
        <label>Correct Answer:</label>
        <select
          value={correctIndex}
          onChange={(e) => setCorrectIndex(parseInt(e.target.value))}
        >
          {answers.map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;
