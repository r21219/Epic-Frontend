// App.tsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Container,
  Row,
  Col,
  Accordion,
  Card,
  Form, Button, Modal,
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
        <Row>
          <Col>
        <Form.Check
            type="checkbox"
            id={`task-checkbox-${task.id}`}
            className="task-checkbox"
            checked={task.completed}
            onChange={() => {
              // Handle checkbox change event
            }}
        />
          </Col>
            <Col>
        <Form.Label htmlFor={`task-checkbox-${task.id}`} className="task-title">
          {task.title}
        </Form.Label>
            </Col>
          <Col>
        <span className="task-date">{task.date}</span>
            </Col>
            <Col>
        <span className="task-category">{task.category}</span>
            </Col>
            <Col>
        <Button
            className="task-delete"
            onClick={() => {
              // Handle delete task event
            }}
        >
          Delete
        </Button>
            </Col>
        </Row>
      </Card>
  ));
};

const App: React.FC = () => {
  // Search Bar
  const [searchTerm, setSearchTerm] = useState("");

    // Categories
  const [categories, setCategories] = useState<Array<Category>>(sampleCategories);

  // New Task Form ověřuje vstupní data
  const [taskTitle, setTaskTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [inputValidation, setInputValidation] = useState({
    taskTitle: true,
    deadline: true,
    category: true,
  });

  // ...other useState hooks, functions and event handlers
  //const [searchTerm, setSearchTerm] = useState("");

  //  TASK ADDING
  const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value);
  };

  const handleDeadlineChange = (date: Date | null) => {
    if (date) {
      setDeadline(date.toISOString().split("T")[0]);
    } else {
      setDeadline("");
    }
  };


  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
  };

  // Modal for adding new category visibility
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);


  const isFormValid = () => {
    const taskTitleValid = taskTitle.trim().length > 0;
    const deadlineValid = deadline.length > 0;
    const categoryValid = selectedCategory !== null;

    setInputValidation({
      taskTitle: taskTitleValid,
      deadline: deadlineValid,
      category: categoryValid,
    });

    return taskTitleValid && deadlineValid && categoryValid;
  };

  const addTask = () => {

      if (!isFormValid()) return;

      // Find the index of the selected category in the categories array
      const categoryIndex = categories.findIndex(
          (category) => category.id === selectedCategory?.id
      );

      if (categoryIndex !== -1 && selectedCategory) {
        // Generate a unique task ID
        const newTaskId =
            Math.max(...categories[categoryIndex].tasks.map((task) => task.id)) + 1;

        // Create a new task object
        const newTask: Task = {
          id: newTaskId,
          title: taskTitle,
          date: deadline,
          category: selectedCategory.name,
          completed: false,
        };

        // Add the new task to the tasks array of the selected category
        const updatedCategories = [...categories];
        updatedCategories[categoryIndex].tasks = [
          ...updatedCategories[categoryIndex].tasks,
          newTask,
        ];

        // Update the categories state
        setCategories(updatedCategories);

        // Clear the input fields
        setTaskTitle("");
        setDeadline("");
        setSelectedCategory(null);
      }


  };

  // END OF ADDING TASK


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
        {/* Add Task Input */}
        <Row className="add-task-input fixed-bottom">
          <Col>
            <Form onSubmit={(e) => {
              e.preventDefault();
              addTask();
            }}>
              <Row>
                <Col>
                  <Form.Control
                      type="text"
                      placeholder="Task title"
                      value={taskTitle}
                      onChange={handleTaskTitleChange}
                      isInvalid={!inputValidation.taskTitle}
                  />
                </Col>
                <Col>
                  {/* Date Picker */}
                  <DatePicker
                      selected={deadline ? new Date(deadline) : null}
                      onChange={handleDeadlineChange}
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Deadline"
                      className={`form-control ${!inputValidation.deadline ? "is-invalid" : ""}`}
                  />

                </Col>
                <Col>
                  {/* Category Selector */}
                  {/* Category Selector */}
                  <Button onClick={() => setCategoryModalOpen(true)}>Category</Button>
                  <Modal
                      show={categoryModalOpen}
                      onHide={() => setCategoryModalOpen(false)}
                      centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Select Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        {categories.map((category) => (
                            <Form.Check
                                key={category.id}
                                type="radio"
                                id={`category-radio-${category.id}`}
                                label={category.name}
                                name="category"
                                onClick={() => handleCategorySelect(category)}
                            />
                        ))}
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setCategoryModalOpen(false)}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>

                </Col>
                <Col>
                  <Button onClick={addTask}>Add Task</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

      </Container>
  );
};

export default App;
