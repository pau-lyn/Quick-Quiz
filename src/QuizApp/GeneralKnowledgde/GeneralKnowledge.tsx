import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./GenKnow.css";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const GeneralKnowledge: React.FC = () => {
  const location = useLocation();
  const { categoryId } = location.state || {};
  const [quizTitle, setQuizTitle] = useState("General Knowledge Quiz");

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
      let categoryUrl = "";

      switch (categoryId) {
        case 9:
          categoryUrl = `https://opentdb.com/api.php?amount=10&category=9`;
          setQuizTitle("General Knowledge Quiz");
          break;
        case 17:
          categoryUrl = `https://opentdb.com/api.php?amount=10&category=17`;
          setQuizTitle("Science & Nature");
          break;
        case 19:
          categoryUrl = `https://opentdb.com/api.php?amount=10&category=19`;
          setQuizTitle("Mathematics");
          break;
        case 21:
          categoryUrl = `https://opentdb.com/api.php?amount=10&category=21`;
          setQuizTitle("Sports");
          break;
        case 22:
          categoryUrl = `https://opentdb.com/api.php?amount=10&category=22`;
          setQuizTitle("Geography");
          break;
        case 23:
          categoryUrl = `https://opentdb.com/api.php?amount=10&category=23`;
          setQuizTitle("History");
          break;
        case 20:
          categoryUrl = `https://opentdb.com/api.php?amount=10&category=20`;
          setQuizTitle("Mythology");
          break;
        case 31:
          categoryUrl = `https://opentdb.com/api.php?amount=10&category=31`;
          setQuizTitle("Anime & Manga");
          break;
        default:
          break;
      }

      try {
        const response = await fetch(categoryUrl);
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
    navigate("/", { replace: true });
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
    <div className="general container py-5">
      <h1 className="text-center">{quizTitle}</h1>

      {quizCompleted ? (
        <div>
          <h2 className="text-center">Quiz Results</h2>
          <p className="text-center">
            Your Score: {calculateScore()} out of {questions.length}
          </p>
          <button className="quit-quiz-btn" onClick={handleQuitQuiz}>
            Quit Quiz
          </button>
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
              <div className="quiz-btn d-flex justify-content-center">
                <button
                  type="button"
                  className="quit-btn"
                  onClick={handleQuitQuiz}
                >
                  Quit
                </button>
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  disabled={!areAllQuestionsAnswered()}
                >
                  Submit Quiz
                </button>
              </div>
            </form>
          ) : (
            <p className="text-center">Loading questions...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneralKnowledge;
