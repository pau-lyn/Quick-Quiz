import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./GenKnow.css";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const GeneralKnowledge: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [correctAnswers, setCorrectAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [showCorrectAnswers, setShowCorrectAnswers] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=10&category=9`
        );
        const data = await response.json();
        if (Array.isArray(data.results)) {
          setQuestions(data.results);
          const answers: { [key: number]: string } = {};
          data.results.forEach((item: Question, index: number) => {
            answers[index] = item.correct_answer;
          });
          setCorrectAnswers(answers);
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const decodeHtml = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };
  const calculateScore = () => {
    let score = 0;
    questions.forEach((_, index) => {
      if (selectedAnswers[index] === correctAnswers[index]) {
        score++;
      }
    });
    return score;
  };
  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    setShowCorrectAnswers(true);
  };
  const handleQuitQuiz = () => {
    navigate("/");
    setSelectedAnswers({});
    setQuizCompleted(false);
  };

  const areAllQuestionsAnswered = () => {
    return (
      questions.length > 0 &&
      questions.every((_, index) => selectedAnswers.hasOwnProperty(index))
    );
  };

  return (
    <div className="general">
      <h1>General Knowledge Quiz</h1>
      {quizCompleted ? (
        <div>
          <h2>Quiz Results</h2>
          <p>
            Your Score: {calculateScore()} out of {questions.length}
          </p>
          <button onClick={handleQuitQuiz}>Quit Quiz</button>
          {showCorrectAnswers && (
            <div className="correct-answers">
              {questions.map((question: Question, index: number) => (
                <div
                  key={index}
                  className={`question ${
                    selectedAnswers[index] === correctAnswers[index]
                      ? "correct-question"
                      : selectedAnswers[index] !== undefined
                      ? "incorrect-question"
                      : ""
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: decodeHtml(question.question),
                    }}
                  />
                  <div className="answers">
                    <p>
                      <strong>Correct Answer: </strong>
                      <span
                        className="cy-answers"
                        dangerouslySetInnerHTML={{
                          __html: decodeHtml(question.correct_answer),
                        }}
                      />
                    </p>
                    <p>
                      <strong>Your Answer: </strong>
                      <span
                        className="cy-answers"
                        dangerouslySetInnerHTML={{
                          __html: decodeHtml(
                            selectedAnswers[index] || "No answer"
                          ),
                        }}
                      />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="questions">
          {questions.length > 0 ? (
            <form>
              {questions.map((question: Question, index: number) => (
                <div key={index} className="question">
                  <div
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                  <div className="answers">
                    {question.incorrect_answers
                      .concat(question.correct_answer)
                      .map((answer: string, i: number) => (
                        <div key={i} className="answer-option">
                          <input
                            type="radio"
                            id={`q${index}a${i}`}
                            name={`question${index}`}
                            value={answer}
                            checked={selectedAnswers[index] === answer}
                            onChange={() => handleAnswerSelect(index, answer)}
                          />
                          <label htmlFor={`q${index}a${i}`}>
                            <span
                              dangerouslySetInnerHTML={{ __html: answer }}
                            />
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={handleSubmitQuiz}
                disabled={!areAllQuestionsAnswered()}
              >
                Submit Quiz
              </button>
            </form>
          ) : (
            <p>Loading questions...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneralKnowledge;
