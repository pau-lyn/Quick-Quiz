import { useState } from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryList from "./Category";
import GeneralKnowledge from "./QuizApp/GeneralKnowledgde/Index";
import Logo from "./assets/logo.png";
import "./App.css";

function App() {
  const [showCategories, setShowCategories] = useState(false);
  const [_, setSelectedCategory] = useState<number | null>(null);

  const handleStartClick = () => {
    setShowCategories(true);
  };

  const handleExitClick = () => {
    setShowCategories(false);
    setSelectedCategory(null);
  };

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    console.log(categoryId);
  };

  return (
    <Router basename="/Quick-Quiz/">
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              !showCategories ? (
                <div className="welcome">
                  <header className="App-header">
                    <img src={Logo} className="App-logo" alt="QuickQuiz logo" />
                  </header>
                  <h1>
                    Hi, Welcome to <span className="app-name">QuickQuiz</span>
                  </h1>
                  <p className="mb-5">Your ultimate trivia challenge awaits!</p>
                  <Button variant="primary" onClick={handleStartClick}>
                    Get Started
                  </Button>
                </div>
              ) : (
                <CategoryList
                  onExit={handleExitClick}
                  onSelectCategory={handleCategorySelect}
                />
              )
            }
          />
          <Route path="/general-knowledge" element={<GeneralKnowledge />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
