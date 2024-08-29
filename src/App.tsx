import { useState } from "react";
import { Button } from "react-bootstrap";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Row, Col } from "react-bootstrap";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import CategoryList from "./Category";
import GeneralKnowledge from "./QuizApp/GeneralKnowledgde/Index";
import Contacts from "./Contacts";

import Logo from "./assets/logo.png";
import Question from "./assets/question.svg";
import Thinking from "./assets/thinking.svg";
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
    <div className="landing">
      <Navbar expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand href="#home">
            <img src={Logo} className="App-logo" alt="QuickQuiz logo" />
            <span className="app-name nav-part">QuickQuiz</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className="mx-3" onClick={handleExitClick}>
                Home
              </Nav.Link>
              <Nav.Link
                href="#about"
                className="mx-3"
                onClick={handleExitClick}
              >
                About
              </Nav.Link>
              <Nav.Link
                href="#contacts"
                className="mx-3"
                onClick={handleExitClick}
              >
                Contacts
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Router basename="/Quick-Quiz/">
        <div className="">
          <Routes>
            <Route
              path="/"
              element={
                !showCategories ? (
                  <>
                    <div className="welcome" id="home">
                      <div className="container py-5">
                        <Row>
                          <Col xs={12} lg={6}>
                            <h1>
                              Hi, Welcome to{" "}
                              <span className="app-name">QuickQuiz</span>
                            </h1>
                            <p className="tag-line my-3">
                              Your ultimate trivia challenge awaits!
                            </p>
                            <p className="text">
                              Ready to challenge your brain and have some fun?
                              QuickQuiz offers a straightforward and enjoyable
                              quiz experience without any fuss.
                            </p>
                            <Button
                              className="btn"
                              variant="primary"
                              onClick={handleStartClick}
                            >
                              Get Started
                            </Button>
                          </Col>
                          <Col
                            xs={12}
                            lg={6}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <img src={Question} alt="" className="svg-img" />
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className="container features">
                      <Row>
                        <Col xs={12} lg={4}>
                          <div className="outer-border">
                            <p>Simple & Intuitive</p>
                          </div>
                        </Col>
                        <Col xs={12} lg={4}>
                          <div className="outer-border">
                            <p>Diverse Categories</p>
                          </div>
                        </Col>
                        <Col xs={12} lg={4}>
                          <div className="outer-border">
                            <p>Flexible & Fun</p>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col
                          xs={12}
                          lg={6}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <img src={Thinking} alt="" className="svg-img" />
                        </Col>
                        <Col xs={12} lg={6}>
                          <h1 className="my-4">How it works?</h1>
                          <div className="my-4">
                            <div className="how">
                              <h4>Pick a Quiz</h4>
                              <span>
                                Browse and select from our diverse categories.
                              </span>
                            </div>
                            <div className="how">
                              <h4>Answer Questions</h4>
                              <span>
                                Engage with multiple-choice questions at your
                                own pace.
                              </span>
                            </div>
                            <div className="how">
                              <h4>Get Immediate Results</h4>
                              <span>View your total score instantly.</span>
                            </div>
                          </div>
                          <Button
                            className="btn my-3"
                            variant="primary"
                            onClick={handleStartClick}
                          >
                            Start a quiz
                          </Button>
                        </Col>
                      </Row>
                    </div>
                    <section id="about">
                      <div className="container">
                        <h1>About Us</h1>
                        <p>
                          At QuickQuiz, our mission is to make learning fun and
                          accessible through engaging, no-fuss quizzes. We aim
                          to provide a seamless experience where users can test
                          their knowledge on a variety of topics quickly and
                          easily, all without the need for login or complex
                          setups.
                        </p>
                      </div>
                    </section>
                    <Contacts />
                    <footer className="footer container">
                      <p className="text-center mt-5">
                        © 2024 QuickQuiz. All rights reserved.
                      </p>
                    </footer>
                  </>
                ) : (
                  <CategoryList
                    onExit={handleExitClick}
                    onSelectCategory={handleCategorySelect}
                  />
                )
              }
            />
            <Route path="/quiz-zone" element={<GeneralKnowledge />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
