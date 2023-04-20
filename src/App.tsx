// App.tsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Form,
} from "react-bootstrap";
import "./App.css";

type Task = {
  id: number;
  title: string;
  date: string;
  category: string;
  completed: boolean;
};

type Category = {
  id: number;
  name: string;
  tasks: Task[];
};

const sampleCategories: Category[] = [
  {
    id: 1,
    name: "Work",
    tasks: [
      // ...tasks related to Work category
    ],
  },
  {
    id: 2,
    name: "Personal",
    tasks: [
      // ...tasks related to Personal category
    ],
  },
  // ...more categories
];

const renderCategories = () => {
  return sampleCategories.map((category) => (
      <Accordion key={category.id} >
        <Card>
          <Accordion as={Card.Header} eventKey={category.id.toString()}>
            {category.name}
          </Accordion>
          <Accordion.Collapse eventKey={category.id.toString()}>
            <Card.Body>{renderTasks(category.tasks)}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
  ));
};

const renderTasks = (tasks: Task[]) => {
  function filterTasks(tasks: Task[]) {
    return tasks.filter((task) => {
      let searchTerm = "test";
      return task.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
  const filteredTasks = filterTasks(tasks);

  return filteredTasks.map((task, index) => (
      <Card key={task.id}>
        {/* Task content */}
      </Card>
  ));
};

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Array<Category>>(sampleCategories);

  // ...other useState hooks, functions and event handlers
  //const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
      <Container fluid className="app-container">
        {<Row className="search-bar">
          <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
            <Form.Control
                type="search"
                placeholder="Search tasks"
                value={searchTerm}
                onChange={handleSearchInputChange}
            />
          </Col>
        </Row>}
        {/* ... */}
        {/* Main Content */}
        <Row className="main-content">
          <Col>
            {
              renderCategories()
            }
          </Col>
        </Row>
        {/* New Task Form */}
        {/* ... */}
      </Container>
  );
};

export default App;
