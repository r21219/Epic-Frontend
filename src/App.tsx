// App.tsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import React, {useState} from "react";
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
import {useAppState} from "./controllers/AppState";
import {sampleCategories} from "./testing-data/sampleCategory";
import {renderTasks} from "./controllers/RenderTasks";
import {Category} from "./models/Category";
import { useCategories } from "./controllers/OperationsTask";
import { Categories } from "./controllers/Categories";

import {Task} from "./testing-data/sampleCategory";



const App: React.FC = () => {
    const { categories, setCategories, deleteTask } = useCategories(sampleCategories);
    /*const {
        searchTerm,
        setSearchTerm,
        categories,
        setCategories,
        selectedCategory,
        setSelectedCategory,
        taskTitle,
        setTaskTitle,
        deadline,
        setDeadline,
        inputValidation,
        setInputValidation,
        handleTaskTitleChange,
        handleDeadlineChange,
        handleCategorySelect,
        handleSearchInputChange,
        validateInput,
        clearInput,
        addTaskHandler,
        deleteTask,
    } = useAppState();*/
    // Search Bar
    //const [searchTerm, setSearchTerm] = useState("");

    //const { categories, setCategories, addTask, deleteTask } = useCategories(sampleCategories);
    const { addTask } = useCategories(sampleCategories);

    const [searchTerm, setSearchTerm] = useState("");
    //const [categories, setCategories] = useState<Category[]>(sampleCategories);

    const [taskTitle, setTaskTitle] = useState("");
    const [deadline, setDeadline] = useState("");
    const [inputValidation, setInputValidation] = useState({
        taskTitle: true,
        deadline: true,
        category: true,
    });

    /*const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
    };*/
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    // Modal for adding new category visibility
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

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

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const validateInput = () => {
        const newValidation = {
            taskTitle: taskTitle.length > 0,
            deadline: deadline.length > 0,
            category: !!selectedCategory,
        };
        setInputValidation(newValidation);
        return Object.values(newValidation).every(Boolean);
    };

    const clearInput = () => {
        setTaskTitle("");
        setDeadline("");
        setSelectedCategory(null);
    };

    const addTaskHandler = () => {
        if (!validateInput() || !selectedCategory) {
            return;
        }
        const maxId = Math.max(...categories.flatMap(category => category.tasks.map(task => task.id)));
        const newTask: Task = {
            id: maxId + 1,
            title: taskTitle,
            date: deadline,
            category: selectedCategory.name,
            completed: false
        };
        addTask(selectedCategory.id, newTask);
        clearInput();
    };


    // Categories


    // ...other useState hooks, functions and event handlers
    //const [searchTerm, setSearchTerm] = useState("");

    //  TASK ADDING
    /*const handleTaskTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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






    // END OF ADDING TASK

    //DELETE TASK

    // END OF DELETE TASK


    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };*/





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
                        //renderCategories()
                        //<Categories  />
                        Categories()


                    }
                </Col>
            </Row>
            {/* New Task Form */}
            {/* Add Task Input */}
            <Row className="add-task-input fixed-bottom">
                <Col>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        //addTask();
                        if (selectedCategory) {
                            /*const maxId = Math.max(...categories.flatMap(category => category.tasks.map(task => task.id)));
                            addTask(selectedCategory?.id, {id: maxId+1, title: taskTitle, date: deadline, category: selectedCategory.name, completed: false});*/
                            addTaskHandler();
                        }
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
                                <span className="selected-category">
                                    {selectedCategory ? `Selected Category: ${selectedCategory.name}` : ""}
                                </span>
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
                                <Button onClick={addTaskHandler}>Add Task</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

        </Container>
    );
};





export default App;
