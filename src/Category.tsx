import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Category.css";

type CategoriesType = {
  [key: string]: number;
};

const categories: CategoriesType = {
  "General Knowledge": 9,
  "Science & Nature": 17,
  Mathematics: 19,
  Sports: 21,
  Geography: 22,
  History: 23,
  Mythology: 20,
  "Anime & Manga": 31,
};

interface CategoryListProps {
  onExit: () => void;
  onSelectCategory: (categoryId: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  onExit,
  onSelectCategory,
}) => {
  const navigate = useNavigate();
  const handleCategoryClick = (categoryName: string) => {
    const categoryId = categories[categoryName as keyof CategoriesType];
    console.log(`Selected Category: ${categoryName}, ID: ${categoryId}`);
    onSelectCategory(categoryId);

    if (categoryId !== null) {
      navigate("/quiz-zone", { state: { categoryId } });
    }
  };

  return (
    <div className="category-list">
      <h2>Select a Category</h2>
      <Row className="d-flex justify-content-center">
        {Object.keys(categories).map((category, index) => (
          <Col
            className="mb-3 d-flex justify-content-center align-items-center mb-3"
            key={index}
          >
            <div
              className="category-item"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          </Col>
        ))}
      </Row>
      <Button variant="danger" onClick={onExit} className="mt-3">
        Exit
      </Button>
    </div>
  );
};

export default CategoryList;
