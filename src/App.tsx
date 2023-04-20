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
  Form, Button,
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
      {
        id: 1,
        title: "Task 1",
        date: "2023-05-01",
        category: "Work",
        completed: false,
      },
      {
        id: 2,
        title: "Task 2",
        date: "2023-05-15",
        category: "Work",
        completed: true,
      },
    ],
  },
  {
    id: 2,
    name: "Personal",
    tasks: [
      // ...tasks related to Personal category
      { id: 3,
        title: "Task 3",
        date: "2023-05-10",
        category: "Personal",
        completed: false,
      },
      {
        id: 4,
        title: "Task 4",
        date: "2023-05-20",
        category: "Personal",
        completed: false,
      },
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
          {/*<Accordion.Collapse eventKey={category.id.toString()}>
            <Card.Body>{renderTasks(category.tasks)}</Card.Body>
          </Accordion.Collapse>*/}
          <Accordion.Item eventKey={category.id.toString()}>
            <Card.Body>{renderTasks(category.tasks)}</Card.Body>
          </Accordion.Item>
        </Card>
      </Accordion>
  ));
};

const renderTasks = (tasks: Task[]) => {
  function filterTasks(tasks: Task[]) {
    return tasks.filter((task) => {
      let searchTerm = "Task 3";
      return task.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }
  const filteredTasks = filterTasks(tasks);


  return tasks.map((task, index) => (
      <Card key={task.id} className="task-row">
        <Form.Check
            type="checkbox"
            id={`task-checkbox-${task.id}`}
            className="task-checkbox"
            checked={task.completed}
            onChange={() => {
              // Handle checkbox change event
            }}
        />
        <Form.Label htmlFor={`task-checkbox-${task.id}`} className="task-title">
          {task.title}
        </Form.Label>
        <span className="task-date">{task.date}</span>
        <span className="task-category">{task.category}</span>
        <Button
            className="task-delete"
            onClick={() => {
              // Handle delete task event
            }}
        >
          Delete
        </Button>
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
